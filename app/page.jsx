export const dynamic = "force-dynamic"; 

import HomeSecondSection from "./home/HomeSecondSection.jsx";
import HomeThirdSection from "./home/HomeThirdSection.jsx";
import HomeFourthSection from "./home/HomeFourthSection.jsx";
import HomeFifthSection from "./home/HomeFifthSection.jsx";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Recommended from "./home/Recommended.jsx";


async function fetchRecommendedProjects() {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/api/home/Recommended`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch recommended projects");

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Recommended fetch error:", error);
    return [];
  }
}

export default async function HomePage() {
  let homeSecondSectionData = null;
  let homeThirdSectionData = null;
  let homeFourthSectionData = null;
  let homeFifthSectionData = [];
  let recommendedProjects = [];
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/home`, {
      cache: "no-store",
    });

    const json = await res.json();

    
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
      <Header/>
      <Recommended projects={recommendedProjects} />
      <HomeSecondSection data={homeSecondSectionData} />
      <HomeThirdSection data={homeThirdSectionData} />
      <HomeFourthSection data={homeFourthSectionData} />
      <HomeFifthSection data={homeFifthSectionData} />
      <Footer/>
    </>
  );
}
