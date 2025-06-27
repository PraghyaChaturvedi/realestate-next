export const dynamic = "force-dynamic";

import EventClient from './EventClient.jsx';

//  : This file fetches and displays events using the EventClient component.

//SEO Tags
export async function generateMetadata() {
  //  : Returns static SEO metadata for the events page.
  return {
    title: "Events | Shelter4U",
    description:
      "Explore Shelter4U's latest events and initiatives in the real estate sector. Stay updated with our community engagement, launches, and celebrations.",
    keywords: [
      "Shelter4U events",
      "real estate events",
      "property launch events",
      "Shelter4U gatherings",
      "real estate exhibitions",
      "Shelter4U community activities",
    ],
    openGraph: {
      title: "Events | Shelter4U",
      description:
        "Check out Shelter4U's recent and upcoming events. Discover how we engage with clients and the real estate community.",
      url: "https://shelter4u.in/about/event",
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Shelter4U Event Banner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Shelter4U Events",
      description:
        "Discover exciting events and property launches hosted by Shelter4U.",
      images: ["/logo.png"],
    },
    alternates: {
      canonical: "https://shelter4u.in/about/event",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default async function EventPage() {
  //  : Fetch events from the API endpoint.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about/event`);

  if (!res.ok) {
    //  : Throw an error if the fetch fails.
    throw new Error('Failed to fetch events');
  }

  //  : Parse the response as JSON and pass the data to the client component.
  const data = await res.json();
  

  return <EventClient events={data.event} />;
}
