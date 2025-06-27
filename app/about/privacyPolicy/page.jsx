export const dynamic = "force-dynamic";

import PrivacyPolicyClient from './PrivacyPolicyClient';

//  : This file fetches and displays the privacy policy using the PrivacyPolicyClient component.

//SEO Tags
export async function generateMetadata() {
  //  : Returns static SEO metadata for the privacy policy page.
  return {
    title: "Privacy Policy | Shelter4U",
    description:
      "Read Shelter4U's privacy policy to understand how we collect, use, and protect your data while offering real estate services across India.",
    keywords: [
      "Shelter4U privacy policy",
      "real estate data protection",
      "user privacy Shelter4U",
      "Shelter4U data policy",
      "property platform privacy",
      "Shelter4U India privacy",
    ],
    openGraph: {
      title: "Privacy Policy | Shelter4U",
      description:
        "Learn about Shelter4U's commitment to protecting your personal information in the real estate ecosystem.",
      url: "https://shelter4u.in/about/privacyPolicy",
      type: "article",
      images: [
        {
          url: "/logo.png", 
          width: 1200,
          height: 630,
          alt: "Shelter4U Privacy Policy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy | Shelter4U",
      description:
        "Understand how Shelter4U collects, uses, and protects your personal data. Transparency and trust are our priorities.",
      images: ["/logo.png"],
    },
    alternates: {
      canonical: "https://shelter4u.in/about/privacyPolicy",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPolicyPage() {
  //  : Fetch privacy policy data from the API endpoint.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about/privacyPolicy`);

  if (!res.ok) {
    //  : Throw an error if the fetch fails.
    throw new Error('Failed to fetch privacy policy');
  }

  //  : Parse the response as JSON and pass the data to the client component.
  const data = await res.json();
  return <PrivacyPolicyClient data={data.privacyPolicy} />;
}
