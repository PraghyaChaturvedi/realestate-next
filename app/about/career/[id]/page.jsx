// app/about/career/[id]/page.jsx
import ViewDetailCareer from './ViewDetailCareer.jsx'; 

//  : This file displays the detailed view for a specific career/job opening using the ViewDetailCareer component.
export default async function CareerDetailPage({ params }) {
  //  : Extract the job ID from route params.
  const { id } = await params;

  //  : Render the detailed career view for the given ID.
  return <ViewDetailCareer id={id} />;
}
