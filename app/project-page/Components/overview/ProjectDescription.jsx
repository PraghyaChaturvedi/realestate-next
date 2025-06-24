"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const AboutProject = ({ project }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        About This Project
      </h2>

      {/* Description */}
      <pre className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap font-main mb-6">
        {showFull
          ? project.description
          : project.description.split("\n").slice(0, 5).join("\n") + "…"}
      </pre>

      {/* USPs */}
      <h3 className="text-lg font-semibold mb-5 text-gray-900 font-main">
        Unique Selling Points
      </h3>
      <ul style={{ listStyle: "square" }} className="font-main">
        {(showFull ? project.usps : project.usps.slice(0, 3)).map((usp) => (
          <div
            key={usp}
            className="flex items-center gap-4 bg-transparent rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="bg-red-100 p-2 rounded-lg m-1">
              <Check className="h-4 w-4 text-red-600" strokeWidth={3} />
            </div>
            <span className="text-gray-700 text-base">{usp}</span>
          </div>
        ))}
      </ul>

      {/* Toggle Button */}
      {(project.description.split("\n").length > 5 || project.usps.length > 3) && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="mt-6 text-red-600 font-semibold text-sm hover:underline"
        >
          {showFull ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default AboutProject;
