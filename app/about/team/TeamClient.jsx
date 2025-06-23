'use client';

import { Globe } from 'lucide-react';
import TeamCards from './TeamCards';

const TeamClient = ({ teamMembers }) => {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col items-center py-12">
        <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black text-center flex flex-col justify-center rounded-4xl">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 rounded-full p-3">
              <Globe className="text-white" size={32} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">Our team</p>
        </div>
      </div>

      {/* TeamCards Section */}
      <div className="flex justify-center mt-8 mb-50">
        <div className="w-[80%] grid grid-cols-1 [@media(min-width:1040px)]:grid-cols-2 gap-10">
          {teamMembers.length === 0 ? (
            <p className="text-center col-span-full text-white">No team members found.</p>
          ) : (
            teamMembers.map((member, idx) => (
              <TeamCards
                key={member._id || idx}
                name={member.title}
                position={member.position}
                img={member.img}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TeamClient;
