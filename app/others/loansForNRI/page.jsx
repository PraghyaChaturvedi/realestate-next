// app/about/loan/page.jsx
import LoansForNrisClient from "./LoansForNrisClient";

export default async function LoansForNrisPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/others/loansForNRI`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch loan data");
  }

  const data = await res.json();

  return <LoansForNrisClient data={data.loanForNRI} />;
}
    