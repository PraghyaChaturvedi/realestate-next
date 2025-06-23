// app/about/legal/page.jsx
import LegalInformationClient from "./LegalInformationClient.jsx";

export default async function LegalPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/others/LegalInfo`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch legal information");
  }

  const data = await res.json();
  return <LegalInformationClient data={data.legalInformation} />;
}
