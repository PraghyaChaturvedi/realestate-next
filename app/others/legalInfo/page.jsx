// app/about/legal/page.jsx
export const dynamic = "force-dynamic";

import LegalInformationClient from "./LegalInformationClient.jsx";

export default async function LegalPage() {
  //  : Fetch legal information from the API endpoint.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/others/LegalInfo`);

  if (!res.ok) {
    //  : Throw an error if the fetch fails.
    throw new Error("Failed to fetch legal information");
  }

  //  : Parse the response as JSON and pass the data to the client component.
  const data = await res.json();
  return <LegalInformationClient data={data.legalInformation} />;
}
