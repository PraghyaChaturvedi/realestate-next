"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cards from "../Components/Cards.jsx";
import {
  FiSearch,
  FiMapPin,
  FiHome,
  FiChevronDown,
  FiGrid,
  FiTag,
  FiClock,
} from "react-icons/fi";

// This component receives its initial data as a prop from the server component.
const SearchPageClient = ({ initialProjects = [] }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from search params, which are available immediately
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [projects, setProjects] = useState(initialProjects);
  const [filters, setFilters] = useState({
    projectType: searchParams.get("projectType") || "",
    status: searchParams.get("status") || "",
    minBudget: searchParams.get("minBudget") || "",
    maxBudget: searchParams.get("maxBudget") || "",
    unitType: searchParams.get("unitType") || "",
    city: searchParams.get("city") || "",
  });
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  
  // This is a common pattern to avoid hydration errors with certain components
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const [suggestions, setSuggestions] = useState({
    value: "",
    cities: [],
    areas: [],
    projects: [],
  });

  const projectType = ["Residential", "Commercial", "Land"];
  const projectStatus = ["Under Construction", "Ready to Move"];
  const unitType = ["1BHK", "2BHK", "3BHK", "4BHK", "Shops", "Offices", "Villas", "Plots"];

  // Re-sync projects from server props if they change (e.g., on navigation)
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);
  
  const buildQueryString = (newValues) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    return params.toString();
  };

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = { ...filters, [filterName]: value };
    setFilters(updatedFilters);
    // Don't navigate immediately on every keystroke for budget inputs
    if (filterName !== "minBudget" && filterName !== "maxBudget") {
      const newQuery = buildQueryString({ [filterName]: value, q: "" });
      router.push(`/search?${newQuery}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newQuery = buildQueryString({ 
      q: searchQuery,
      minBudget: filters.minBudget,
      maxBudget: filters.maxBudget,
      status: filters.status, // Include status in search
    });
    router.push(`/search?${newQuery}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (callback) => {
    setShowSuggestions(false);
    callback();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAutocompleteChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length < 2) {
      setSuggestions({ value, areas: [], projects: [], cities: [] });
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/search/autocomplete?q=${value}`);
      const data = await res.json();
      setSuggestions({ ...data, value });
      setShowSuggestions(true);
    } catch (err) {
      console.error("Autocomplete error:", err);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-4">
            Find Your <span className="text-red-600">Dream</span> Property
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Discover the perfect property that matches your lifestyle and budget
          </p>
        </div>

        {/* Use a form for better semantics and accessibility */}
        <form onSubmit={handleSearchSubmit} className="mb-6 md:mb-10 w-full">
          <div className="flex flex-col p-4 bg-white rounded-2xl shadow-lg border border-gray-100 mb-4" ref={searchRef}>
            <div className="flex items-center w-full">
              <div className="p-2 bg-red-50 rounded-lg mr-3">
                <FiMapPin className="text-red-600 text-xl" />
              </div>
              <div className="flex flex-col w-full relative">
                <label className="text-xs font-medium text-gray-500 mb-1">Search Location, Project, or Area</label>
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="e.g. 'Luxury Villas in South Delhi'"
                  className="text-sm font-medium text-gray-800 focus:outline-none border-b border-gray-200 pb-1 w-full focus:border-red-500 transition-colors"
                  onFocus={() => setShowSuggestions(true)}
                  onChange={handleAutocompleteChange}
                />
                {showSuggestions && (suggestions.areas.length > 0 || suggestions.projects.length > 0 || suggestions.cities.length > 0) && (
                  <div className="z-50 absolute top-full mt-2 w-full bg-white shadow-lg rounded-md max-h-64 overflow-y-auto border border-gray-200">
                    {suggestions.areas.map((area) => (<div key={area._id} onClick={() => handleSuggestionClick(() => router.push(`/search?area=${area.name}`))} className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">{area.name}</div>))}
                    {suggestions.cities.map((city) => (<div key={city._id} onClick={() => handleSuggestionClick(() => router.push(`/search?city=${city.name}`))} className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">{city.name}</div>))}
                    {suggestions.projects.map((project) => (<div key={project._id} onClick={() => handleSuggestionClick(() => router.push(`/project-page/${project._id}`))} className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">{project.projectName}</div>))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center flex-1 mb-2 xl:mb-0 xl:mr-4">
              <div className="p-2 bg-red-50 rounded-lg mr-3"><FiHome className="text-red-600 text-xl" /></div>
              <div className="flex flex-col w-full relative">
                <label className="text-xs font-medium text-gray-500 mb-1">Project Type</label>
                <select value={filters.projectType} onChange={(e) => handleFilterChange("projectType", e.target.value)} className="text-sm font-medium text-gray-800 focus:outline-none rounded-md py-1 pl-3 pr-8 w-full appearance-none bg-white transition-colors">
                  <option value="">All Types</option>
                  {projectType.map((type) => (<option key={type} value={type}>{type}</option>))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            <div className="flex items-center flex-1 mb-2 xl:mb-0 xl:mx-4">
              <div className="p-2 bg-red-50 rounded-lg mr-3"><FiClock className="text-red-600 text-xl" /></div>
              <div className="flex flex-col w-full relative">
                <label className="text-xs font-medium text-gray-500 mb-1">Project Status</label>
                <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)} className="text-sm font-medium text-gray-800 focus:outline-none rounded-md py-1 pl-3 pr-8 w-full appearance-none bg-white transition-colors">
                  <option value="">All Status</option>
                  {projectStatus.map((status) => (<option key={status} value={status}>{status}</option>))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            <div className="flex items-center flex-1 mb-2 xl:mb-0 xl:mx-4">
              <div className="p-2 bg-red-50 rounded-lg mr-3"><FiGrid className="text-red-600 text-xl" /></div>
              <div className="flex flex-col w-full relative">
                <label className="text-xs font-medium text-gray-500 mb-1">Unit Type</label>
                <select value={filters.unitType} onChange={(e) => handleFilterChange("unitType", e.target.value)} className="text-sm font-medium text-gray-800 focus:outline-none rounded-md py-1 pl-3 pr-8 w-full appearance-none bg-white transition-colors">
                  <option value="">Any</option>
                  {unitType.map((option) => (<option key={option} value={option}>{option}</option>))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            <div className="flex items-center flex-1 mb-2 xl:mb-0 xl:ml-4">
              <div className="p-2 bg-red-50 rounded-lg mr-3"><FiTag className="text-red-600 text-xl" /></div>
              <div className="flex flex-col w-full">
                <label className="text-xs font-medium text-gray-500 mb-1">Price Range (₹)</label>
                <div className="flex items-center w-full space-x-2">
                  <input type="number" value={filters.minBudget} onChange={(e) => handleFilterChange("minBudget", e.target.value)} placeholder="Min" className="text-sm font-medium text-gray-800 focus:outline-none border-b border-gray-200 pb-1 w-1/2 focus:border-red-500 transition-colors"/>
                  <span className="text-gray-400">-</span>
                  <input type="number" value={filters.maxBudget} onChange={(e) => handleFilterChange("maxBudget", e.target.value)} placeholder="Max" className="text-sm font-medium text-gray-800 focus:outline-none border-b border-gray-200 pb-1 w-1/2 focus:border-red-500 transition-colors"/>
                </div>
              </div>
            </div>

            <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-xl cursor-pointer w-full xl:w-auto mt-4 xl:mt-0 xl:ml-6 hover:bg-red-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center font-medium">
              <FiSearch className="mr-2" />
              Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="bg-white rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                {isClient && <Cards project={project} />}
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-16">
              <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
              <p>Try adjusting your search filters or searching for a different location.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default SearchPageClient;