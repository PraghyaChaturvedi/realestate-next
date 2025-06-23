"use client";
const ProjectTabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6">
      <nav className="flex lg:justify-start overflow-x-auto no-scrollbar space-x-2 bg-gray-100 p-1 rounded-xl md:justify-center">
        <button
          onClick={() => setActiveTab("overview")}
          className={`${
            activeTab === "overview"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          } whitespace-nowrap py-2 px-4 md:px-6 rounded-lg font-medium text-sm transition-all`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("amenities")}
          className={`${
            activeTab === "amenities"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          } whitespace-nowrap py-2 px-4 md:px-6 rounded-lg font-medium text-sm transition-all`}
        >
          Amenities
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`${
            activeTab === "gallery"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          } whitespace-nowrap py-2 px-4 md:px-6 rounded-lg font-medium text-sm transition-all`}
        >
          Gallery
        </button>
        <button
          onClick={() => setActiveTab("location")}
          className={`${
            activeTab === "location"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          } whitespace-nowrap py-2 px-4 md:px-6 rounded-lg font-medium text-sm transition-all`}
        >
          Location
        </button>
        <button
          onClick={() => setActiveTab("specifications")}
          className={`${
            activeTab === "specifications"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          } whitespace-nowrap py-2 px-4 md:px-6 rounded-lg font-medium text-sm transition-all`}
        >
          Specifications
        </button>
      </nav>
    </div>
  );
};

export default ProjectTabSwitcher;
