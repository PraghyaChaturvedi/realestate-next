"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

//  : This component renders a custom dropdown for selecting price options, supporting disabled states.
const CustomPriceDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false); //  : Tracks dropdown open/close state.
  const dropdownRef = useRef(null); //  : Ref for detecting outside clicks.

  const handleSelect = (optionValue) => {
    onChange(optionValue); //  : Call parent handler with selected value.
    setIsOpen(false); //  : Close dropdown after selection.
  };

  //  : Close dropdown if clicked outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  : Find the label for the selected value, or use placeholder.
  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium focus:outline-none border-b border-gray-200 pb-1 w-full focus:border-red-500 transition-colors bg-transparent pr-5 text-left flex justify-between items-center"
      >
        <span className={value ? 'text-gray-800' : 'text-gray-400'}>
          {selectedLabel}
        </span>
        <FiChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md z-20 border border-gray-200">
          <ul className="max-h-[11rem] overflow-y-auto">
             <li
                onClick={() => handleSelect("")}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 cursor-pointer"
             >
                {placeholder}
             </li>
            {options.map((option) => (
              <li
                key={option.value}
                //  : Only trigger onClick if the option is NOT disabled.
                onClick={() => !option.disabled && handleSelect(option.value)}
                //  : Apply different styles for disabled options.
                className={`px-4 py-2 text-sm ${
                  option.disabled
                    ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomPriceDropdown;