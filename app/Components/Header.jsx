"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // New dropdown states
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Dropdown references
  const aboutUsRef = useRef(null);
  const locationRef = useRef(null);
  const typeRef = useRef(null);
  const othersRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close other dropdowns when clicking outside
      if (
        aboutUsRef.current &&
        !aboutUsRef.current.contains(event.target) &&
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        typeRef.current &&
        !typeRef.current.contains(event.target) &&
        othersRef.current &&
        !othersRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle navigation dropdowns
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Check if current path matches
  const isActive = (path) => {
    return pathname === path;
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex flex-col xl:flex-row justify-between items-center px-4 md:px-8 py-3">
        {/* Logo and Mobile Menu Button */}
        <div className="w-full xl:w-auto flex justify-between items-center">
          <Link href="/">
            <div className="pl-2 md:pl-4">
              <img
                src="https://res.cloudinary.com/djkji0qya/image/upload/v1748693962/neqhc6vexjni5qsvhtzl.png"
                alt="Shelter4U"
                className="h-12 md:h-14"
              />
            </div>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-2xl p-2 cursor-pointer text-red-600"
          >
            ☰
          </button>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden xl:flex space-x-1 lg:space-x-2">
          <Link
            href="/"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Home
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>

          {/* About Us Dropdown */}
          <div
            className="relative"
            ref={aboutUsRef}
            onMouseEnter={() => setActiveDropdown("aboutUs")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              About Us
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "aboutUs" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {activeDropdown === "aboutUs" && (
              <div className="absolute left-0 w-56 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/about/companyProfile"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Company Profile
                </Link>
                <Link
                  href="/about/vissionMission"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Our Visions & Mission
                </Link>
                <Link
                  href="/about/privacyPolicy"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/about/career"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Career
                </Link>
                <Link
                  href="/about/team"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Team
                </Link>
                <Link
                  href="/about/event"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Event Photo Gallery
                </Link>
              </div>
            )}
          </div>

          {/* Property By Location Dropdown */}
          <div
            className="relative"
            ref={locationRef}
            onMouseEnter={() => setActiveDropdown("location")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Property By Location
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "location" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {activeDropdown === "location" && (
              <div className="absolute left-0 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/search?city=ahmedabad"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Ahmedabad
                </Link>
                <Link
                  href="/search?city=gandhinagar"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Gandhinagar
                </Link>
                <Link
                  href="/search?city=pune"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Pune
                </Link>
                <Link
                  href="/search?city=mumbai"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Mumbai
                </Link>
              </div>
            )}
          </div>

          {/* Property By Type Dropdown */}
          <div
            className="relative"
            ref={typeRef}
            onMouseEnter={() => setActiveDropdown("type")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Property By Type
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "type" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {activeDropdown === "type" && (
              <div className="absolute left-0 w-44 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/search?projectType=Residential"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Residential
                </Link>
                <Link
                  href="/search?projectType=Commercial"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Commercial
                </Link>
                <Link
                  href="/search?projectType=Land"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Land
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/Inquiry"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Inquiry
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>

          {/* Others Dropdown */}
          <div
            className="relative"
            ref={othersRef}
            onMouseEnter={() => setActiveDropdown("others")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Others
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "others" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {activeDropdown === "others" && (
              <div className="absolute right--1 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/others/loansForNRI"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Loans for NRIs
                </Link>
                <Link
                  href="/others/legalInfo"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Legal Information
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contactus"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Contact Us
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full xl:hidden mt-3 border-t border-gray-100 pt-3`}
        >
          <div className="flex flex-col items-start space-y-1 px-2">
            {/* Mobile Navigation Links */}

            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/") ? "text-red-600 bg-red-50" : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Home
            </Link>

            {/* About Us Mobile Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("aboutUs")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                About Us
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "aboutUs" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className={`transition-all duration-300 ${activeDropdown === "aboutUs" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/about/companyProfile"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Company Profile
                  </Link>
                  <Link
                    href="/about/vissionMission"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Our Visions & Mission
                  </Link>
                  <Link
                    href="/about/privacyPolicy"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/about/career"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Career
                  </Link>
                  <Link
                    href="/about/team"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Team
                  </Link>
                  <Link
                    href="/about/event"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Event Photo Gallery
                  </Link>
                </div>
              </div>
            </div>

            {/* Property By Location Mobile Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("location")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Property By Location
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "location" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className={`transition-all duration-300 ${activeDropdown === "location" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/search?city=ahmedabad"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Ahmedabad
                  </Link>
                  <Link
                    href="/search?city=pune"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Pune
                  </Link>
                  <Link
                    href="/search?city=mumbai"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Mumbai
                  </Link>
                  <Link
                    href="/search?city=gandhinagar"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Gandhinagar
                  </Link>
                </div>
              </div>
            </div>

            {/* Property By Type Mobile Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("type")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Property By Type
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "type" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className={`transition-all duration-300 ${activeDropdown === "type" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/search?projectType=Residential"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Residential
                  </Link>
                  <Link
                    href="/search?projectType=Commercial"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Commercial
                  </Link>
                  <Link
                    href="/search?projectType=Plot"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Plot
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/Inquiry"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/inquiry")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Inquiry
            </Link>

            {/* Others Mobile Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("others")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Others
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "others" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className={`transition-all duration-300 ${activeDropdown === "others" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/others/loansForNRI"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Loans for NRI
                  </Link>
                  <Link
                    href="/others/legalInfo"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Legal Information
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contactus"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/contact")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Header;