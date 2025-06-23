"use client";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const ProjectHeroSlider = ({
  project,
  prevImage,
  nextImage,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const formatToIndianUnits = (num) => {
    if (!num || num <= 0) return "On Request";
    if (num >= 1e7) {
      return `₹ ${(num / 1e7).toFixed(2)} Cr onwards`;
    } else if (num >= 1e5) {
      return `₹ ${(num / 1e5).toFixed(2)} Lac onwards`;
    } else {
      return num.toLocaleString("en-IN");
    }
  };

  return (
    <div className="relative w-[85vw] rounded-2xl overflow-hidden m-auto mt-10 shadow-2xl shadow-zinc-950">
      <div className="h-[70vh] w-full overflow-hidden relative">
        <img
          src={
            project.coverImages[currentImageIndex]?.url ||
            "https://placehold.co/600x400?text=Coming+Soon"
          }
          alt={
            project.coverImages[currentImageIndex]?.description ||
            "Expanded Image"
          }
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/40 transition-all"
        >
          <ChevronLeft className="h-8 w-8 text-white" strokeWidth={2} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/40 transition-all"
        >
          <ChevronRight className="h-8 w-8 text-white" strokeWidth={2} />
        </button>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {project.coverImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all hidden sm:flex ${
                index === currentImageIndex ? "bg-red-500 w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-6 sm:pb-8 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="max-w-2xl">
            {/* Project Type Tags */}
            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.projectType) &&
                project.projectType.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-full bg-black/10 backdrop-blur-sm text-white text-[12px] sm:text-sm font-medium border border-white/20"
                  >
                    {type}
                  </span>
                ))}
            </div>

            {/* Status Tag */}
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.isArray(project.projectSpecification) &&
                [
                  ...new Set(
                    project.projectSpecification.map((spec) => spec.status)
                  ),
                ].map((status) => (
                  <span
                    key={status}
                    className="px-3 py-1 mb-3 rounded-full bg-black/10 backdrop-blur-sm text-white text-[12px] sm:text-sm font-medium border border-white/20"
                  >
                    {status}
                  </span>
                ))}
            </div>

            {/* Project Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight tracking-tight">
              {project.projectName}
            </h1>

            {/* Price */}
            <div className="text-lg sm:text-xl font-bold text-white mb-1">
              {Array.isArray(project.projectSpecification) &&
              project.projectSpecification.length > 0 ? (
                <>
                  {formatToIndianUnits(project.projectSpecification[0]?.price)}{" "}
                </>
              ) : (
                <p className="text-sm font-medium text-gray-300">On Request</p>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center text-white/90">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" strokeWidth={2} />
              <span className="text-sm sm:text-base">
                {project.area?.name}, {project.city}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeroSlider;
