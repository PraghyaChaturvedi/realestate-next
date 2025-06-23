"use client";

import React from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function VisionMissionClient({ data }) {
  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 font-bold">No data found.</p>
      </div>
    );
  }

  const { hero, sections } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex flex-col items-center"
    >
      <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-3xl">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 rounded-full p-3">
            <Lock className="text-white" size={32} />
          </div>
        </div>
        <p className="text-2xl font-bold text-white">
          {hero?.heading || "Our Vision & Mission"}
        </p>
      </div>

      <div className="w-[80%] px-6 py-8 space-y-10">
        {sections?.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <p className="text-3xl font-bold text-navy-blue">{section.title}</p>

            {section.visionMissionText?.map((text, tIdx) => (
              <p key={tIdx} className="text-xl font-semibold text-navy-blue">{text}</p>
            ))}

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
        ))}
      </div>
    </motion.div>
  );
}
