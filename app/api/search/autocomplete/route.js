import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js"; // adjust if your import path differs
const { Project, Area } = models;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ message: "Query parameter 'q' is required" }, { status: 400 });
    }

    const regex = { $regex: q, $options: "i" };

    // Search Projects
    const projects = await Project.find({ projectName: regex })
      .limit(5)
      .select({ _id: 1, projectName: 1 });

    // Search Areas
    const areas = await Area.find({ name: regex })
      .limit(5)
      .select({ _id: 1, name: 1 });

    // Search Cities and return unique list
    let citiesRaw = await Project.find({ city: regex })
      .limit(5)
      .select({ _id: 1, city: 1 });

    const uniqueCities = [...new Set(citiesRaw.map(p => p.city))];

    return NextResponse.json({ projects, areas, cities: uniqueCities });
  } catch (error) {
    console.error("Autocomplete Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
