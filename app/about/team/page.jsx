export const dynamic = "force-dynamic";

import TeamClient from './TeamClient';

//  : This file fetches and displays the team members using the TeamClient component.

//SEO Tags
export async function generateMetadata() {
  //  : Returns static SEO metadata for the team page.
  return {
    title: "Meet Our Team | Shelter4U",
    description:
      "Get to know the passionate and experienced team behind Shelter4U. Our real estate experts are here to help you find your dream home.",
    keywords: [
      "Shelter4U team",
      "real estate experts",
      "property consultants India",
      "meet our team Shelter4U",
      "real estate professionals",
      "Shelter4U staff",
    ],
    openGraph: {
      title: "Meet Our Team | Shelter4U",
      description:
        "Discover the professionals making real estate easy at Shelter4U. We're a team driven by integrity and transparency.",
      url: "https://shelter4u.in/about/team",
      type: "profile",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Shelter4U Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Shelter4U Team | Real Estate Experts",
      description:
        "The Shelter4U team is here to guide you in your property journey. Get to know the faces behind the service.",
      images: ["/logo.png"],
    },
    alternates: {
      canonical: "https://shelter4u.in/about/team",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default async function TeamPage() {
  //  : Fetch team members from the API endpoint.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about/team`);

  if (!res.ok) {
    //  : Throw an error if the fetch fails.
    throw new Error('Failed to fetch team members');
  }

  //  : Parse the response as JSON and pass the data to the client component.
  const data = await res.json();

  return <TeamClient teamMembers={data.team || []} />;
}
