export const dynamic = "force-dynamic";

import HomeFirstSection from "./home/HomeFirstSection.jsx";
import HomeSecondSection from "./home/HomeSecondSection.jsx";
import HomeThirdSection from "./home/HomeThirdSection.jsx";
import HomeFourthSection from "./home/HomeFourthSection.jsx";
import HomeFifthSection from "./home/HomeFifthSection.jsx";
import Recommended from "./home/Recommended.jsx";
import { Suspense } from "react";

//  : This file defines the main Home page for the Shelter4U app, including SEO metadata and data fetching for homepage sections and recommended projects.

// Fetch recommended projects from backend
//  : Fetches recommended projects from the backend API for display on the homepage.
async function fetchRecommendedProjects() {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    //  : Fetch recommended projects from the API endpoint using the base URL from environment variables.
    const res = await fetch(`${baseUrl}/api/home/Recommended`);
    if (!res.ok) throw new Error("Failed to fetch recommended projects");
    //  : Parse the JSON response and return the data array, or an empty array if not present.
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    //  : Log any errors encountered during fetch and return an empty array.
    console.error("Recommended fetch error:", error);
    return [];
  }
}

// SEO metadata function
//  : Generates SEO metadata for the homepage, including dynamic keywords based on recommended projects.
export async function generateMetadata() {
  const projects = await fetchRecommendedProjects();

  //  : Build a list of keywords from the top 4 recommended projects for SEO purposes.
  const keyword = projects.slice(0, 4).flatMap((p) => [
    `${p.builderName} ${p.projectName}`,
    `${p.projectName} ${p.unit} ${p.type}`,
    `${p.projectName} ${p.city.name}`,
    `${p.projectName} price ${p.price} size ${p.size}`,
    `${p.projectName}`,
    `${p.builderName}`,
    `${p.city.name}`,
  ]);

  //  : Return the metadata object for SEO, Open Graph, Twitter, and robots settings.
  return {
    title: "Shelter4U",
    description:
      "Discover the best zero brokerage flats, affordable properties, and premium projects by top builders in Ahmedabad, Gandhinagar, Pune, and Mumbai.",
    keywords: [
      //  : Static and dynamic keywords for SEO.
      "zero brokerage properties",
      "affordable flats in Ahmedabad",
      "premium projects in Pune",
      "Gandhinagar real estate",
      "verified properties Mumbai",
      "zero brokerage property",
      "property in budget",
      "properties in Gandhinagar",
      "properties in Pune",
      "properties in Mumbai",
      "properties in Ahmedabad",
      "affordable housing projects in Ahmedabad",
      "verified real estate listings",
      "buy house in Ahmedabad",
      "low budget property in Mumbai",
      "flats without brokerage",
      "Shelter4U real estate",
      "perfect project hub",
      "property search India",
      ...keyword,
    ],
    openGraph: {
      //  : Open Graph metadata for social sharing.
      title: "Top Recommended Projects | Shelter4U",
      description:
        "Explore affordable, verified real estate listings from top builders. Flats available in Ahmedabad, Gandhinagar, Pune, and Mumbai with zero brokerage.",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Shelter4U Recommended Properties",
        },
      ],
    },
    twitter: {
      //  : Twitter card metadata for sharing.
      card: "summary_large_image",
      title: "Top Builder Projects in India | Shelter4U",
      description:
        "Recommended real estate from Shelter4U. Builder projects with zero brokerage across India.",
      images: ["/logo.png"],
    },
    alternates: {
      canonical: "https://shelter4u.in",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  };
}

// Main Home Page component
//  : The main HomePage component fetches all homepage section data and recommended projects, then renders the homepage layout.
export default async function HomePage() {
  //  : Initialize state variables for each homepage section and recommended projects.
  let homeFirstSectionData = null;
  let homeSecondSectionData = null;
  let homeThirdSectionData = null;
  let homeFourthSectionData = null;
  let homeFifthSectionData = [];
  let recommendedProjects = [];

  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try { 
    //  : Fetch homepage data from the backend API and extract each section's data.
    const res = await fetch(`${baseUrl}/api/home`);
    const json = await res.json();

    homeFirstSectionData = json.finalData?.HomeFirstSectionData?.[0] || null;
    homeSecondSectionData = json.finalData?.HomeSecondSectionData?.[0] || null;
    homeThirdSectionData = json.finalData?.HomeThirdSectionData?.[0] || null;
    homeFourthSectionData = json.finalData?.HomeFourthSectionData?.[0] || null;
    homeFifthSectionData = json.finalData?.HomeFifthSectionData ?? [];

    recommendedProjects = await fetchRecommendedProjects();
  } catch (e) {
    //  : Log any errors encountered during homepage data fetch.
    console.error("Error loading Home data:", e);
  }

  //  : Render all homepage sections and the recommended projects component.
  return (
    <>
      {/* Home First Section */}
      <HomeFirstSection data={homeFirstSectionData} />
      {/* Suspense wrapper for Recommended projects */}
      <Suspense fallback={<div>Loading...</div>}>
        <Recommended projects={recommendedProjects} />
      </Suspense>
      {/* Other homepage sections */}
      <HomeSecondSection data={homeSecondSectionData} />
      <HomeThirdSection data={homeThirdSectionData} />
      <HomeFourthSection data={homeFourthSectionData} />
      <HomeFifthSection data={homeFifthSectionData} />
    </>
  );
}
