'use client';

import Link from 'next/link';

const CareerCard = ({
  position,
  employeesNeeded,
  location,
  qualification,
  experience,
  active,
  id,
}) => {
  if (!active) return null;

  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow space-y-6 min-h-[320px] w-full max-w-[500px] mx-auto">
      <h2 className="text-2xl font-extrabold text-red-600">{position}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
        <div>
          <span className="font-semibold text-gray-500">Employees Needed:</span>
          <p>{employeesNeeded}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-500">Location:</span>
          <p>{location}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-500">Qualification:</span>
          <p>{qualification}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-500">Experience:</span>
          <p>{experience} year(s)</p>
        </div>
      </div>

      <Link
        href={`/view-detail-career/${id}`}
        className="inline-block mt-4 px-5 py-2 text-base font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default CareerCard;
