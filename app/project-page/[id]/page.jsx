export const dynamic = "force-dynamic";


import ProjectClientPage from "./ProjectClientPage";

async function getProjectDetails(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/project-page/${id}`);

  if (!res.ok) {
    console.error("Failed to fetch project details");
    return null;
  }

  return res.json();
}

//  Dynamic SEO Tags
export async function generateMetadata({ params }) {
  const { id } = await params; 
  const project = await getProjectDetails(id);

  if (!project) {
    return {
      title: "Project Not Found | Shelter4U",
      description: "The requested property project does not exist or has been removed.",
    };
  }

  return {
    title: `${project.projectName} | Shelter4U`,
    description: `Explore ${project.projectName}, a premium real estate project listed on Shelter4U.`,
    keywords: [
      project.projectName,
      "real estate project",
      "Shelter4U project",
      "property listing",
      `project in ${project.city.name || ""}`,
      "real estate India",
    ],
    openGraph: {
      title: `${project.projectName} | Shelter4U`,
      description: project.description || `Explore features, location, and gallery of ${project.projectName}.`,
      url: `https://shelter4u.in/project-page/${id}`,
      type: "article",
      images: [
        {
          url: project.coverImages?.[0]?.url || "/logo.png",
          width: 1200,
          height: 630,
          alt: project.projectName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.projectName} | Shelter4U`,
      description: project.metaDescription || `Get full details on ${project.projectName}, listed on Shelter4U.`,
      images: [project.coverImages?.[0]?.url || "/logo.png"],
    },
    alternates: {
      canonical: `https://shelter4u.in/project-page/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default async function ProjectDetailPage({ params }) {
  const { id } = await params; 
  const project = await getProjectDetails(id);

  return <ProjectClientPage project={project} />;
}