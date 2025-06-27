import React, { Suspense } from 'react';
import SearchPageClient from './SearchPage.jsx';
// import Loading from './loading'; // Import the loading component

//  : This file fetches and displays search results using the SearchPageClient component.
export default async function SearchPage({ searchParams }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  //  : This function fetches the initial data on the server.
  const fetchInitialProjects = async () => {
    try {
      //  : Build query string from search parameters and fetch projects.
      const query = new URLSearchParams(await searchParams);
      const response = await fetch(`${baseUrl}/api/search?${query.toString()}`);

      if (!response.ok) {
        //  : Log error if fetch fails.
        console.error("Failed to fetch initial projects, status:", response.status);
        return [];
      }
      return await response.json();
    } catch (error) {
      //  : Log error if exception occurs during fetch.
      console.error("Error fetching initial projects on server:", error);
      return [];
    }
  };

  //  : Fetch initial projects for the search page.
  const initialProjects = await fetchInitialProjects();

  return (
    //  : Render the client-side search page with initial projects.
    // Suspense uses your loading.js as a fallback UI.
    // It allows the static parts of the page to render instantly while
    // the dynamic client component loads.
    // <Suspense>
      <SearchPageClient initialProjects={initialProjects} />
    // </Suspense>
  );
}


