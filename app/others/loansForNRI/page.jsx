// app/about/loan/page.jsx
export const dynamic = "force-dynamic";

import LoansForNrisClient from "./LoansForNrisClient";

export default async function LoansForNrisPage() {
  //  : Fetch loan data for NRIs from the API endpoint.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/others/loansForNRI`);

  if (!res.ok) {
    //  : Throw an error if the fetch fails.
    throw new Error("Failed to fetch loan data");
  }

  //  : Parse the response as JSON and pass the data to the client component.
  const data = await res.json();

  return <LoansForNrisClient data={data.loanForNRI} />;
}
    