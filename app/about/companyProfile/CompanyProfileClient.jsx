'use client';

import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const CompanyProfileClient = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex flex-col items-center"
    >
      <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-4xl">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 rounded-full p-3">
            <Lock className="text-white" size={32} />
          </div>
        </div>
        <p className="text-2xl font-bold text-white">{data.hero.heading}</p>
      </div>

      <div className="w-[80%] px-6 py-8">
        {data.sections.map((section, idx) => (
          <div key={idx} className="mb-10">
            <p className="text-3xl font-bold text-navy-blue mb-6">{section.title}</p>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {section.paragraphs?.some((para) => para.trim() !== "") && (
                <>
                  {section.paragraphs
                    .filter((para) => para.trim() !== "")
                    .map((para, i) => (
                      <p
                        key={i}
                        className="text-navy-blue"
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ))}
                </>
              )}
              {section.bullets?.some((item) => item.trim() !== "") && (
                <ul className="list-disc pl-6 space-y-2">
                  {section.bullets
                    .filter((item) => item.trim() !== "")
                    .map((item, j) => (
                      <li
                        key={j}
                        className="text-navy-blue"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CompanyProfileClient;
