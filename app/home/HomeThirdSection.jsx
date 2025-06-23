'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdOutlineArrowDropDown, MdChecklistRtl } from 'react-icons/md';

const CustomAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!items?.section || items?.section.length === 0) {
    return <p>No sections available</p>;
  }

  return (
    <div className="mt-8 space-y-5">
      {items?.section.map((item, i) => (
        <div
          key={i}
          className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
            i === openIndex ? 'shadow-lg' : ''
          }`}
        >
          <button
            className="w-full flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(i)}
          >
            <div className="p-2 bg-red-50 rounded-lg">
              <MdChecklistRtl className="text-red-600" size={20} />
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-900 flex-grow text-center">
              {item?.title}
            </span>
            <div className="p-2 bg-red-50 rounded-lg">
              <MdOutlineArrowDropDown
                size={20}
                className={`text-red-600 transition-transform duration-300 ${
                  i === openIndex ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>
          {i === openIndex && (
            <div className="p-4 text-sm sm:text-base text-gray-600">
              {item?.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function HomeThirdSection({ data }) {
  return (
    <section className="w-full mt-10 mb-10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Right side image */}
        <div className="w-full lg:w-1/2 custom-center">
          <motion.div
            initial={{ x: '7rem', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: 'ease' }}
            className="w-full max-w-[35rem] h-[37rem] overflow-hidden rounded-t-[20rem] relative z-20 mx-auto flex justify-center items-center"
          >
            <div className="w-full h-full flex items-center justify-center relative">
              <Image
                src={data?.img || '/company.png'}
                alt="company"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 20%' }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Left side content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            <span className="text-red-600">{data?.redTxt}</span>{' '}
            {data?.blackTxt}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">{data?.para}</p>

          <CustomAccordion items={data} />
        </div>
      </div>
    </section>
  );
}
