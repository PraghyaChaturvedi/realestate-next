'use client';

import CareerCard from './CareerCard';
import { Lock } from 'lucide-react';

export default function CareerClient({ careers }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-4xl">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 rounded-full p-3">
            <Lock className="text-white" size={32} />
          </div>
        </div>
        <p className="text-2xl font-bold text-white">Open Positions</p>
      </div>

      {/* Cards */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 flex justify-center">
        <div className="w-full max-w-[1280px] grid gap-6 grid-cols-1 lg:grid-cols-3">
          {careers.length === 0 ? (
            <p className="col-span-full text-gray-500 text-center">No careers found.</p>
          ) : (
            careers.map((career) => (
              <CareerCard
                key={career._id}
                position={career.position}
                employeesNeeded={career.employeesNeeded}
                location={career.location}
                qualification={career.qualification}
                experience={career.experience}
                active={career.active}
                id={career._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
