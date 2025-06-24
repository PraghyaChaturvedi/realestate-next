export const dynamic = "force-dynamic"; 

import HomeFirstSection from "./home/HomeFirstSection.jsx";
import HomeSecondSection from "./home/HomeSecondSection.jsx";
import HomeThirdSection from "./home/HomeThirdSection.jsx";
import HomeFourthSection from "./home/HomeFourthSection.jsx";
import HomeFifthSection from "./home/HomeFifthSection.jsx";
import Recommended from "./home/Recommended.jsx";
import { Suspense } from "react";


async function fetchRecommendedProjects() {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/api/home/Recommended`);

    if (!res.ok) throw new Error("Failed to fetch recommended projects");

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Recommended fetch error:", error);
    return [];
  }
}

export default async function HomePage() {
  let homeFirstSectionData = null;
  let homeSecondSectionData = null;
  let homeThirdSectionData = null;
  let homeFourthSectionData = null;
  let homeFifthSectionData = [];
  let recommendedProjects = [];
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/home`);

    const json = await res.json();

    homeFirstSectionData = json.finalData?.HomeFirstSectionData?.[0] || null;
    homeSecondSectionData = json.finalData?.HomeSecondSectionData?.[0] || null;
    homeThirdSectionData = json.finalData?.HomeThirdSectionData?.[0] || null;
    homeFourthSectionData = json.finalData?.HomeFourthSectionData?.[0] || null; 
    homeFifthSectionData = json.finalData?.HomeFifthSectionData ?? [];
    recommendedProjects = await fetchRecommendedProjects();

  } catch (e) {
    console.error("Error loading Home data:", e);
  }


  

  return (
    <>
      <HomeFirstSection data={homeFirstSectionData} />
      <Suspense fallback={<div>Loading...</div>}><Recommended projects={recommendedProjects} /></Suspense>
      <HomeSecondSection data={homeSecondSectionData} />
      <HomeThirdSection data={homeThirdSectionData} />
      <HomeFourthSection data={homeFourthSectionData} />
      <HomeFifthSection data={homeFifthSectionData} />
      
    </>
  );
}
