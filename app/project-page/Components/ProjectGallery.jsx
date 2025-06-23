"use client";
import { Expand } from "lucide-react";

const ProjectGallery = ({ galleryImages = [], openImageExpanded }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-8 text-gray-900">
        Project Gallery
      </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {galleryImages.map((image, index) => (
                <div
                key={index}
                className="relative group rounded-xl overflow-hidden h-64 cursor-pointer"
                onClick={() => openImageExpanded(image)}
                >
                    <img
                        src={
                        image?.url || "https://placehold.co/600x400?text=Coming+Soon"
                        }
                        alt={image.description || "Expanded Image"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-end p-5 bg-gradient-to-t from-black/50 to-transparent">
                        <p className="text-white text-sm font-medium">
                        {image.description || "Expanded Image"}
                        </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all">
                        <Expand className="h-5 w-5 text-white" />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ProjectGallery;

