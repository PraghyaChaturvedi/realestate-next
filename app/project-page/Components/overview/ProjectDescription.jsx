"use client";
import { Check } from "lucide-react";

const AboutProject = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        About This Project
      </h2>
      <pre className="text-gray-700 mb-8 text-base leading-relaxed whitespace-pre-wrap font-main">
        {project.description}
      </pre>

      <h3 className="text-lg font-semibold mb-5 text-gray-900">
        Unique Selling Points
      </h3>
      <div>
        <ul style={{ listStyle: "square" }}>
          {project.usps.map((usp) => (
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
      </div>
    </div>
  );
};

export default AboutProject;




