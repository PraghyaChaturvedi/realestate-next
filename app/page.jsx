// Enabling dynamic rendering for the route (SSR with dynamic data on each request)
export const dynamic = "force-dynamic"; 

// Importing home section components
import HomeFirstSection from "./home/HomeFirstSection.jsx";
import HomeSecondSection from "./home/HomeSecondSection.jsx";
import HomeThirdSection from "./home/HomeThirdSection.jsx";
import HomeFourthSection from "./home/HomeFourthSection.jsx";
import HomeFifthSection from "./home/HomeFifthSection.jsx";
import Recommended from "./home/Recommended.jsx";

// React Suspense for lazy loading
import { Suspense } from "react";

// Fetches the recommended projects from the backend API
async function fetchRecommendedProjects() {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/api/home/Recommended`);

    if (!res.ok) throw new Error("Failed to fetch recommended projects");

    const json = await res.json();
    return json.data || []; // Return the data or empty array
  } catch (error) {
    console.error("Recommended fetch error:", error);
    return []; // Return empty array on error
  }
}

// Main HomePage component (async server component)
export default async function HomePage() {
  // Declaring variables to hold different sections' data
  let homeFirstSectionData = null;
  let homeSecondSectionData = null;
  let homeThirdSectionData = null;
  let homeFourthSectionData = null; 
  let homeFifthSectionData = [];
  let recommendedProjects = [];

  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    // Fetching complete home page data from the backend
    const res = await fetch(`${baseUrl}/api/home`);
    const json = await res.json();

    // Extracting individual section data from response
    homeFirstSectionData = json.finalData?.HomeFirstSectionData?.[0] || null;
    homeSecondSectionData = json.finalData?.HomeSecondSectionData?.[0] || null;
    homeThirdSectionData = json.finalData?.HomeThirdSectionData?.[0] || null;
    homeFourthSectionData = json.finalData?.HomeFourthSectionData?.[0] || null; 
    homeFifthSectionData = json.finalData?.HomeFifthSectionData ?? [];

    // Fetching recommended projects separately
    recommendedProjects = await fetchRecommendedProjects();
  } catch (e) {
    // Log any error during data fetching
    console.error("Error loading Home data:", e);
  }

  // Rendering the complete home page using different sections
  return (
    <>
      {/* Hero or banner section */}
      <HomeFirstSection data={homeFirstSectionData} />

      {/* Recommended projects inside Suspense to allow fallback during lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Recommended projects={recommendedProjects} />
      </Suspense>

      {/* Informational or highlights sections */}
      <HomeSecondSection data={homeSecondSectionData} />
      <HomeThirdSection data={homeThirdSectionData} />
      <HomeFourthSection data={homeFourthSectionData} />

      {/* Testimonials or featured property cards */}
      <HomeFifthSection data={homeFifthSectionData} />
    </>
  );
}
