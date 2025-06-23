'use client';

import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const HomeFifthSection = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <p className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2 text-center">
            Our Authorized Data
          </p>
        </div>

        <Marquee speed={130} gradient={false}>
          {safeData.map((partner, index) => (
            <div
              key={partner._id || index}
              className="inline-flex items-center justify-center mx-2"
            >
              <div className="relative h-32 w-56">
                <Image
                  src={partner.img}
                  alt={partner.title || `partner-${index}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 150px, 224px"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default HomeFifthSection;
