'use client';

import { useEffect, useState } from 'react';
import Cards from './Cards.jsx'; 
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function SimilarProject({ id }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/project-page/${id}/similar`);
        const data = await response.json();
        if (!response.ok) {
          setProjects([]);
        } else {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching similar projects:', error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, [id]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {Array.isArray(projects) && projects.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Similar Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="hover:shadow-md bg-white rounded-xl shadow-lg">
                  <Cards project={project} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-lg font-medium text-gray-600 italic tracking-wide mt-10">
              No similar projects
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
