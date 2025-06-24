import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const { Area, Builder, Project } = models;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = {};

    // Extracting query parameters
    const getParam = (key) => searchParams.get(key);
    const getParamArray = (key) => {
      const val = getParam(key);
      return val ? val.split(",").map((v) => v.trim()) : [];
    };

    // Project Type
    if (getParam("projectType")) {
      filters.projectType = { $in: [getParam("projectType")] };
    }

    // Project Sub Type
    if (getParam("projectSubType")) {
      filters.projectSubType = { $in: [getParam("projectSubType")] };
    }

    // Status Filter
    if (getParam("status")) {
      filters.projectSpecification = {
        $elemMatch: { status: getParam("status") }
      };
    }

    // Unit Type inside projectSpecification
    if (getParam("unitType")) {
      filters.projectSpecification = {
        $elemMatch: { unitType: getParam("unitType") }
      };
    }

    // Fixed Price Filter
    const minBudget = parseFloat(getParam("minBudget"));
    const maxBudget = parseFloat(getParam("maxBudget"));
    
    if (!isNaN(minBudget) || !isNaN(maxBudget)) {
      const priceConditions = [];
      
      if (!isNaN(minBudget) && !isNaN(maxBudget)) {
        // Both min and max specified - project price range should overlap with user budget range
        priceConditions.push({
          $and: [
            { 
              $or: [
                { 
                  $expr: {
                    $lte: [{ $toDouble: "$minPrice" }, maxBudget]
                  }
                },
                { minPrice: { $exists: false } },
                { minPrice: "" },
                { minPrice: null }
              ]
            },
            { 
              $or: [
                { 
                  $expr: {
                    $gte: [{ $toDouble: "$maxPrice" }, minBudget]
                  }
                },
                { maxPrice: { $exists: false } },
                { maxPrice: "" },
                { maxPrice: null }
              ]
            }
          ]
        });
      } else if (!isNaN(minBudget)) {
        // Only minimum budget specified
        priceConditions.push({
          $or: [
            { 
              $expr: {
                $gte: [{ $toDouble: "$maxPrice" }, minBudget]
              }
            },
            { maxPrice: { $exists: false } },
            { maxPrice: "" },
            { maxPrice: null }
          ]
        });
      } else if (!isNaN(maxBudget)) {
        // Only maximum budget specified
        priceConditions.push({
          $or: [
            { 
              $expr: {
                $lte: [{ $toDouble: "$minPrice" }, maxBudget]
              }
            },
            { minPrice: { $exists: false } },
            { minPrice: "" },
            { minPrice: null }
          ]
        });
      }
      
      if (priceConditions.length > 0) {
        filters.$and = filters.$and || [];
        filters.$and.push(...priceConditions);
      }
    }
    // City
    if (getParam("city")) {
      filters.city = { $regex: getParam("city"), $options: "i" };
    }

    // Area
    if (getParam("area")) {
      const areaDoc = await Area.findOne({
        name: { $regex: getParam("area"), $options: "i" }
      });
      if (areaDoc) {
        filters.area = areaDoc._id;
      } else {
        return NextResponse.json([], { status: 200 });
      }
    }

    // Amenities
    const amenities = getParamArray("amenities");
    if (amenities.length > 0) {
      filters.amenities = { $all: amenities };
    }

    // Global Keyword Search
    if (getParam("q")) {
      const regex = new RegExp(getParam("q"), "i");

      const [matchingBuilders, matchingAreas] = await Promise.all([
        Builder.find({ name: regex }).select("_id"),
        Area.find({ name: regex }).select("_id")
      ]);

      const builderIds = matchingBuilders.map((b) => b._id);
      const areaIds = matchingAreas.map((a) => a._id);

      filters.$or = [
        { projectName: regex },
        { address: regex },
        { city: regex },
        { reraNumber: regex },
        { usps: { $elemMatch: { $regex: regex } } },
        ...(builderIds.length > 0 ? [{ builder: { $in: builderIds } }] : []),
        ...(areaIds.length > 0 ? [{ area: { $in: areaIds } }] : [])
      ];
    }


    console.log("Applied filters:", JSON.stringify(filters, null, 2));

    const projects = await Project.find(filters)
      .populate("builder area")
      .sort({ createdAt: -1 });

    console.log(`Found ${projects.length} projects`);

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}





