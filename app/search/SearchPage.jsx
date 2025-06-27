"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cards from "../Components/Cards.jsx";
import PriceRangeSlider from "../Components/PriceRangeSlider.jsx";
import {
  FiSearch,
  FiMapPin,
  FiHome,
  FiChevronDown,
  FiGrid,
  FiTag,
  FiClock,
  FiFilter,
  FiX,
  FiRefreshCw,
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
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

  // Count active filters
  useEffect(() => {
    const count = Object.values(filters).filter(value => value && value !== "").length;
    setActiveFiltersCount(count);
  }, [filters]);

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
      status: filters.status,
    });
    router.push(`/search?${newQuery}`);
    setShowSuggestions(false);
    setShowMobileFilters(false);
  };

  const handleClearAllFilters = () => {
    const clearedFilters = {
      projectType: "",
      status: "",
      minBudget: "",
      maxBudget: "",
      unitType: "",
      city: "",
    };
    setFilters(clearedFilters);
    setSearchQuery("");
    router.push('/search');
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

  const FilterSelect = ({ icon: Icon, label, value, onChange, options, placeholder }) => (
    <div className="relative group h-20">
      <div className="flex items-center h-full p-4 bg-white rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-200 group-hover:shadow-md">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 rounded-lg mr-3 group-hover:from-red-100 group-hover:to-red-200 transition-all duration-200 flex-shrink-0">
          <Icon className="text-red-600 text-lg" />
        </div>
        <div className="flex-1 min-w-0 relative">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {label}
          </label>
          <div className="relative">
            <select 
              value={value} 
              onChange={onChange}
              className="w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none appearance-none pr-8 cursor-pointer"
              style={{ lineHeight: '1.25rem' }}
            >
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option} value={option} className="py-2 text-gray-800">
                  {option}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </div>
  );

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

        {/* Enhanced Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-100">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative" ref={searchRef}>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-red-500 focus-within:bg-white transition-all duration-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mr-4 shadow-lg">
                    <FiMapPin className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Search Location, Project, or Area
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      placeholder="e.g. 'Luxury Villas in South Delhi'"
                      className="w-full text-lg font-medium text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
                      onFocus={() => setShowSuggestions(true)}
                      onChange={handleAutocompleteChange}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="ml-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center font-medium"
                  >
                    <FiSearch className="mr-2" />
                    Search
                  </button>
                </div>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && (suggestions.areas.length > 0 || suggestions.projects.length > 0 || suggestions.cities.length > 0) && (
                  <div className="absolute top-full mt-2 w-full bg-white shadow-2xl rounded-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {suggestions.areas.length > 0 && (
                        <div className="mb-2">
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Areas</div>
                          {suggestions.areas.map((area) => (
                            <div 
                              key={area._id} 
                              onClick={() => handleSuggestionClick(() => router.push(`/search?area=${area.name}`))} 
                              className="px-3 py-2 hover:bg-red-50 text-sm cursor-pointer rounded-lg mx-1 transition-colors duration-150"
                            >
                              {area.name}
                            </div>
                          ))}
                        </div>
                      )}
                      {suggestions.cities.length > 0 && (
                        <div className="mb-2">
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cities</div>
                          {suggestions.cities.map((city) => (
                            <div 
                              key={city._id} 
                              onClick={() => handleSuggestionClick(() => router.push(`/search?city=${city.name}`))} 
                              className="px-3 py-2 hover:bg-red-50 text-sm cursor-pointer rounded-lg mx-1 transition-colors duration-150"
                            >
                              {city.name}
                            </div>
                          ))}
                        </div>
                      )}
                      {suggestions.projects.length > 0 && (
                        <div>
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Projects</div>
                          {suggestions.projects.map((project) => (
                            <div 
                              key={project._id} 
                              onClick={() => handleSuggestionClick(() => router.push(`/project-page/${project._id}`))} 
                              className="px-3 py-2 hover:bg-red-50 text-sm cursor-pointer rounded-lg mx-1 transition-colors duration-150"
                            >
                              {project.projectName}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Filter Controls Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiFilter className="text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearAllFilters}
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <FiRefreshCw className="mr-1 text-xs" />
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <FiFilter className="mr-2" />
                  {showMobileFilters ? 'Hide' : 'Show'} Filters
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:block p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              <FilterSelect
                icon={FiHome}
                label="Property Type"
                value={filters.projectType}
                onChange={(e) => handleFilterChange("projectType", e.target.value)}
                options={projectType}
                placeholder="All Types"
              />
              
              <FilterSelect
                icon={FiClock}
                label="Project Status"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                options={projectStatus}
                placeholder="All Status"
              />
              
              <FilterSelect
                icon={FiGrid}
                label="Unit Type"
                value={filters.unitType}
                onChange={(e) => handleFilterChange("unitType", e.target.value)}
                options={unitType}
                placeholder="Any Type"
              />

              <div className="relative group h-20">
                <div className="flex items-center h-full p-4 bg-white rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-200 group-hover:shadow-md">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 rounded-lg mr-3 group-hover:from-red-100 group-hover:to-red-200 transition-all duration-200 flex-shrink-0">
                    <FiTag className="text-red-600 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Price Range
                    </label>
                    <div className="mt-1">
                      <PriceRangeSlider
                        minBudget={filters.minBudget}
                        maxBudget={filters.maxBudget}
                        onRangeChange={(min, max) => {
                          setFilters(prev => ({
                            ...prev,
                            minBudget: min.toString(),
                            maxBudget: max.toString()
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4 border-t border-gray-100">
              <button
                onClick={handleSearchSubmit}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center font-semibold text-lg min-w-[200px] justify-center"
              >
                <FiSearch className="mr-2 text-xl" />
                Apply Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className={`lg:hidden transition-all duration-300 ${showMobileFilters ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="p-6 space-y-4">
              <FilterSelect
                icon={FiHome}
                label="Property Type"
                value={filters.projectType}
                onChange={(e) => handleFilterChange("projectType", e.target.value)}
                options={projectType}
                placeholder="All Types"
              />
              
              <FilterSelect
                icon={FiClock}
                label="Project Status"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                options={projectStatus}
                placeholder="All Status"
              />
              
              <FilterSelect
                icon={FiGrid}
                label="Unit Type"
                value={filters.unitType}
                onChange={(e) => handleFilterChange("unitType", e.target.value)}
                options={unitType}
                placeholder="Any Type"
              />

              <div className="relative group h-20">
                <div className="flex items-center h-full p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 rounded-lg mr-3 flex-shrink-0">
                    <FiTag className="text-red-600 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Price Range
                    </label>
                    <div className="mt-1">
                      <PriceRangeSlider
                        minBudget={filters.minBudget}
                        maxBudget={filters.maxBudget}
                        onRangeChange={(min, max) => {
                          setFilters(prev => ({
                            ...prev,
                            minBudget: min.toString(),
                            maxBudget: max.toString()
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleSearchSubmit}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg flex items-center justify-center font-semibold text-lg"
                >
                  <FiSearch className="mr-2 text-xl" />
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid - Unchanged */}
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
