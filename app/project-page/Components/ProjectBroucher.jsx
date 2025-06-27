"use client";

import { View } from "lucide-react";

//  : This component displays a section for viewing and requesting the project brochure, including a button to open a modal or form.
const ProjectBrochure = ({ project, setShowFullForm }) => {
  return (
    //  : Main container for the brochure section with styling.
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      {/*  : Section heading for the brochure. */}
      <h3 className="font-semibold text-lg text-gray-900 mb-6">
        Project Brochure
      </h3>

      {/*  : Brochure information block with icon and project details. */}
      <div className="bg-gray-50 rounded-xl p-6 flex items-center gap-6 border border-gray-200">
        {/*  : Icon for brochure viewing. */}
        <div className="bg-red-100 p-4 rounded-xl">
          <View className="h-7 w-7 text-red-600" strokeWidth={1.5} />
        </div>

        {/*  : Project name and city display. */}
        <div className="min-w-0">
          <div className="font-medium text-gray-900 text-sm truncate">
            {project?.projectName || "Brochure"}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {project?.city?.name}
          </div>
        </div>
      </div>

      {/*  : Button to open the brochure modal or form. */}
      <button
        onClick={
          () => {
            setShowFullForm(true)
          }
        }
        className="cursor-pointer mt-6 w-full border-2 border-red-600 text-red-600 hover:bg-red-50 py-3 px-6 rounded-lg transition-colors font-medium flex items-center justify-center gap-3 text-base"
      >
        <View className="h-5 w-5 hover:cursor-pointer" />
        <span>View Brochure</span>
      </button>
    </div>
  );
};

export default ProjectBrochure;
