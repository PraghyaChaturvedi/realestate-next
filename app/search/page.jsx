// // app/search/page.jsx
// import SearchPage from "./SearchPage";

// export default async function SearchPageServer({ searchParams }) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
//   let initialProjects = [];
  
//   try {
//     // Await searchParams before using it (required in Next.js 15)
//     const resolvedSearchParams = await searchParams;
    
//     // Build query string from searchParams
//     const query = new URLSearchParams();
    
//     // Add all search parameters to the query
//     Object.entries(resolvedSearchParams || {}).forEach(([key, value]) => {
//       if (value) {
//         query.set(key, value);
//       }
//     });
    
//     const queryString = query.toString();

//     // console.log(queryString);
    
//     // Fetch initial data on server
//     const response = await fetch(`${baseUrl}/api/search?${queryString}`, {
//       cache: 'no-store' // Ensure fresh data
//     });
    
//     if (response.ok) {
//       initialProjects = await response.json();
//       console.log("response", initialProjects);
//     }
    
//   } catch (error) {
//     console.error("Error fetching initial projects:", error);
//     // Continue with empty array on error
//   }
  
//   return <SearchPage initialProjects={initialProjects} />;
// }



// File: app/search/page.js

import React, { Suspense } from 'react';
import SearchPageClient from './SearchPage.jsx';
// import Loading from './loading'; // Import the loading component

// This is a SERVER COMPONENT
// It automatically receives `searchParams` as a prop.
export default async function SearchPage({ searchParams }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // This function fetches the initial data on the server.
  const fetchInitialProjects = async () => {
    try {
      const query = new URLSearchParams(await searchParams);
      // Add a cache-busting parameter for Vercel's aggressive caching
      const response = await fetch(`${baseUrl}/api/search?${query.toString()}`, {
        cache: 'no-store', // Ensures fresh data for every search
      });

      if (!response.ok) {
        console.error("Failed to fetch initial projects, status:", response.status);
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching initial projects on server:", error);
      return [];
    }
  };

  const initialProjects = await fetchInitialProjects();

  return (
    // Suspense uses your loading.js as a fallback UI.
    // It allows the static parts of the page to render instantly while
    // the dynamic client component loads.
    <Suspense>
      <SearchPageClient initialProjects={initialProjects} />
    </Suspense>
  );
}