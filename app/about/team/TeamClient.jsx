'use client';

import { Globe } from 'lucide-react';
import TeamCards from './TeamCards';
import { motion } from 'framer-motion';

const TeamClient = ({ teamMembers }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-100 flex flex-col items-center"
      >
        {/* Header Section */}
        <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-4xl">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 rounded-full p-3">
              <Globe className="text-white" size={32} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">Our team</p>
        </div>

        {/* TeamCards Section */}
        <div className="flex items-center justify-center mt-8 mb-50">
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
      </motion.div>
    </>
  );
};

export default TeamClient;
