'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomeSecondSection({ data }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="mx-auto px-6 sm:px-20 py-12 sm:py-16 flex flex-col md:flex-row items-center justify-around sm:gap-10 max-w-8xl">
        
        {/* Left Section - Text */}
        <div className="w-full md:w-2/5 text-center md:text-left px-2 sm:px-4 pb-10">
          <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-snug">
            {data.title} <span className="text-red-600">{data.redTitle}</span>
          </h1>

          <p className="text-gray-500 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            {data.para}
          </p>

          <button
            onClick={() => router.push('/projects')}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded text-sm font-medium"
          >
            See more
          </button>
        </div>

        {/* Right Section - Images */}
        <div className="w-full md:w-1/2 relative flex justify-center md:justify-end px-2 sm:px-0">
          {/* Main Image */}
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] h-[350px] sm:h-[400px] md:h-[550px] mr-0 sm:mr-4 md:mr-[90px]">
            <Image
              src={data.bigImg}
              alt="Modern white apartment building"
              fill
              className="object-cover"
              style={{ objectPosition: 'right top' }}
              priority
            />
          </div>

          {/* Overlay Image */}
          <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-5 w-[150px] h-[150px] sm:w-[200px] sm:h-[300px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[450px]">
            <Image
              src={data.smallImg}
              alt="Modern apartment building with red accents"
              className="object-cover border-[8px] sm:border-[12px] border-white shadow-2xl"
              fill
              style={{ objectPosition: 'right bottom' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
