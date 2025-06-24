"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Dropdown } from "primereact/dropdown";
import '../project-page/style.css';

function HomeFirstSection( { data } ) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [isClient, setIsClient] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [suggestions, setSuggestions] = useState({
    value: "",
    areas: [],
    projects: [],
    cities: [],
  });

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  const firstLine = data?.firstLine;
  const secondLine = data?.secondLine;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location && location.trim()) {
      params.set("q", location.trim());
    }
    if (city && city !== "All Cities") {
      params.set("city", city);
    }
    router.push(`/search?${params.toString()}`);
  };

  const searchLocationRef = useRef(null);

  useEffect(() => {
    if (!firstLine || !secondLine) return;
    const handleTyping = () => {
      if (currentIndex < firstLine.length) {
        setDisplayText((prevText) => prevText + firstLine[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (currentIndex === firstLine.length) {
        setDisplayText((prevText) => prevText + "\n");
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (currentIndex < firstLine.length + secondLine.length + 1) {
        const secondLineIndex = currentIndex - firstLine.length - 1;
        setDisplayText((prevText) => prevText + secondLine[secondLineIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setTypingComplete(true);
        setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
          setTypingComplete(false);
        }, 3000);
      }
    };

    if (!typingComplete) {
      const timer = setTimeout(handleTyping, 75);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, typingComplete, firstLine, secondLine]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchLocationRef.current && !searchLocationRef.current.contains(event.target)) {
        setSuggestions({ value: "", areas: [], projects: [], cities: [] });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="relative lg:static lg:min-h-[100vh]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${data?.img}')`,
            backgroundPosition: "center bottom",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/80"></div>
        </div>

        {/* Main content area: Increased pb-48 for more space */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-48 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left content */}
            <div className="space-y-8 lg:mt-0">
              {" "}
              {/* Adjusted margin for alignment consistency */}
              {/* Typing text container */}
              <div className="min-h-[80px] sm:min-h-[150px] md:min-h-[150px]">
                <h1 className="text-2xl sm:text-5xl md:text-5xl lg:text-5xl font-bold text-gray-700 leading-tight whitespace-pre-line">
                  <span dangerouslySetInnerHTML={{ __html: displayText }} />
                  <span className="typing-cursor inline-block w-[1ch]">|</span>
                </h1>
              </div>
              {/* Paragraphs */}
              <div className="space-y-6 max-w-xl">
                {data?.paragraphOne && (
                  <p className="text-base sm:text-lg text-gray-700 p-3 px-4 backdrop-blur-sm bg-white/50 rounded-full">
                    {data.paragraphOne}
                  </p>
                )}
                {data?.paragraphTwo && (
                  <span className="text-base sm:text-lg text-gray-700 font-medium p-2 px-3 backdrop-blur-sm bg-white/50 rounded-full">
                    {data.paragraphTwo}
                  </span>
                )}
              </div>
            </div>

            {/* Right content - Search card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full lg:sticky lg:top-20">
              {" "}
              {/* Added sticky for large screens if desired */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Search
                </h3>
              </div>
              <form
                onSubmit={handleSearch}
                className="space-y-4 sm:space-y-6"
              >
                {/* City Dropdown - Removed style prop, relying on className */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    City
                  </label>
                  <Dropdown
                    className="w-full border border-gray-300 rounded-lg text-sm sm:text-base p-dropdown-input-text:py-2 sm:p-dropdown-input-text:py-3"
                    value={city}
                    onChange={(e) => setCity(e.value)}
                    options={[
                      "All Cities",
                      "Ahmedabad",
                      "Gandhinagar",
                      "Pune",
                      "Mumbai",
                    ]}
                    placeholder="Select City"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>

                {/* Location Input */}
                <div className="relative" ref={searchLocationRef}>
                  {" "}
                  {/* Attach ref here */}
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <HiLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
                    <input
                      type="text"
                      value={location}
                      onChange={async (e) => {
                        const value = e.target.value;
                        setLocation(value);

                        if (value.length < 3) {
                          setSuggestions({
                            value: value,
                            areas: [],
                            projects: [],
                            cities: [],
                          });
                          return;
                        }

                        try {
                          const res = await fetch(
                            `${baseUrl}/api/search/autocomplete?q=${value}`
                          );
                          const data = await res.json();
                          setSuggestions({ ...data, value: value });
                        } catch (err) {
                          // console.error("Autocomplete error:", err);
                          setSuggestions({
                            value: "",
                            areas: [],
                            projects: [],
                            cities: [],
                          });
                        }
                      }}
                      className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      placeholder="Enter your desired location"
                    />
                  </div>
                  {((suggestions.areas && suggestions.areas.length > 0) ||
                    (suggestions.projects && suggestions.projects.length > 0) ||
                    (suggestions.cities && suggestions.cities.length > 0) ||
                    suggestions.value) && (
                    <div className="absolute top-full mt-1 sm:mt-2 w-full bg-white shadow-lg rounded-md z-50 max-h-60 sm:max-h-64 overflow-y-auto border border-gray-200">
                      {suggestions.value && (
                        <div
                          className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
                          onClick={() => {
                            const params = new URLSearchParams();
                            params.set("q", suggestions.value);
                            if (city && city !== "All Cities") {  
                              params.set("city", city);
                            }
                            router.push(`/search?${params.toString()}`);
                            setSuggestions({
                              value: "",
                              areas: [],
                              projects: [],
                              cities: [],
                            });
                          }}
                        >
                          Search for "{suggestions.value}"
                        </div>
                      )}
                      {suggestions.areas.length > 0 && (
                        <>
                          <div className="px-3 sm:px-4 py-1 sm:py-2 border-t border-gray-100 text-xs font-bold text-gray-500">
                            Areas
                          </div>
                          {suggestions.areas.map((area) => (
                            <div
                              key={area._id}
                              onClick={() => {
                                const params = new URLSearchParams();
                                params.set("area", area.name);
                                if (city && city !== "All Cities") {
                                  params.set("city", city);
                                }
                                router.push(`/search?${params.toString()}`);
                                setSuggestions({
                                  value: "",
                                  areas: [],
                                  projects: [],
                                  cities: [],
                                });
                              }}
                              className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
                            >
                              {area.name}
                            </div>
                          ))}
                        </>
                      )}
                      {suggestions.cities.length > 0 && (
                        <>
                          <div className="px-3 sm:px-4 py-1 sm:py-2 border-t border-gray-100 text-xs font-bold text-gray-500">
                            Cities
                          </div>
                          {suggestions.cities.map((city, index) => (
                            <div
                              key={index}
                              className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
                              onClick={() => {
                                const params = new URLSearchParams();
                                params.set("city", city);
                                router.push(`/search?${params.toString()}`);
                                setSuggestions({
                                  value: "",
                                  areas: [],
                                  projects: [],
                                  cities: [],
                                });
                              }}
                            >
                              {city}
                            </div>
                          ))}
                        </>
                      )}
                      {suggestions.projects.length > 0 && (
                        <>
                          <div className="px-3 sm:px-4 py-1 sm:py-2 border-t border-gray-100 text-xs font-bold text-gray-500">
                            Projects
                          </div>
                          {suggestions.projects.map((project) => (
                            <div
                              key={project._id}
                              onClick={() => {
                                router.push(`/project-page/${project._id}`);
                                setSuggestions({
                                  value: "",
                                  areas: [],
                                  projects: [],
                                  cities: [],
                                });
                              }}
                              className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
                            >
                              {project.projectName}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>

                <motion.button
                  className="w-full bg-gray-900 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200 text-sm sm:text-base"
                  // onClick={handleSearch}
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Search
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 gradient-vertical from-bg-transparent to-bg-black py-6 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data?.counts?.map((item, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {isClient ? (
                        <CountUp
                        start={item.start || 0}
                        end={item.end}
                        duration={item.duration || 2.5}
                        separator=","
                        useEasing={true}
                        />
                    ) : (
                        item.end
                    )}
                    <span className="text-white">+</span>
                  </h3>
                  <p className="text-sm md:text-base text-white/80">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .typing-cursor {
          display: inline-block;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .whitespace-pre-line {
          white-space: pre-line;
        }

        /* Responsive text size for hero heading */
        @media (max-width: 640px) {
          /* sm breakpoint */
          .text-2xl.sm\:text-3xl.md\:text-4xl.lg\:text-5xl {
            /* Be more specific if Tailwind classes are complex */
            font-size: 1.75rem; /* Slightly larger than 1.5rem for better impact */
            line-height: 1.4;
          }
        }
        @media (max-width: 420px) {
          .text-2xl.sm\:text-3xl.md\:text-4xl.lg\:text-5xl {
            font-size: 1.5rem;
            line-height: 1.3;
          }
        }

      
        :global(.p-dropdown) {
           // Target specific elements if className on Dropdown itself isn't enough
        }
        :global(.p-dropdown .p-dropdown-label) {
          padding-top: 0.5rem; // Corresponds to py-2
          padding-bottom: 0.5rem; // Corresponds to py-2
        }
        @media (min-width: 640px) { // sm
          :global(.p-dropdown .p-dropdown-label) {
            padding-top: 0.75rem; // Corresponds to sm:py-3
            padding-bottom: 0.75rem; // Corresponds to sm:py-3
          }
        }
        */
      `}</style>
    </div>
  );
}

export default HomeFirstSection;

