import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
import { v2 as cloudinary } from "cloudinary";


const { Career, ApplyJob } = models;
// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// -------- GET: Fetch career by ID --------
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Career ID is required" }, { status: 400 });
    }

    const career = await Career.findById(id);
    if (!career) {
      return NextResponse.json({ message: "Career not found" }, { status: 404 });
    }

    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.error("Error fetching career:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const about = formData.get("about");
    const job = formData.get("job");
    const resume = formData.get("resume");

    // const resumeBytes = await resume.arrayBuffer();
    // const resumeBuffer = Buffer.from(resumeBytes);

    // const uploadResponse = await new Promise((resolve, reject) => {
    //   cloudinary.uploader.upload_stream(
    //     {
    //       resource_type: "raw",
    //       folder: "resumes",
    //       public_id: resume.name.replace(/\.[^/.]+$/, ""),
    //     },
    //     (error, result) => {
    //       if (error) reject(error);
    //       else resolve(result);
    //     }
    //   ).end(resumeBuffer);
    // });

    // const resumeUrl = uploadResponse.secure_url;
    // --- RESUME HANDLING END ---

    const newApplication = new ApplyJob({
      name,
      email,
      mobile,
      about,
      job,
      resume: "", 
    });
    await newApplication.save();


    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application: newApplication,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("POST /api/about/career/[id] error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
