import { models } from "@/lib/connections.js";
// import { connectToDBs, Project, Area, Leads } from '@/lib/connections.js';
const { Project } = models;

export async function GET(req) {
  try {
    // await connectToDBs();

    const projects = await Project.find({})
      .populate("area", ["_id", "name"])
      .populate("builder", ["_id", "name"])
      .sort({ createdAt: -1 });
      
      // console.log(projects);
    return new Response(JSON.stringify({ success: true, data: projects }), {
      status: 200,
    });
  } catch (error) {
    console.error("Project fetch error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
