"use client";

import React, { useEffect, useState } from 'react';
import ApplyForJob from './ApplyForJob';
import axios from 'axios';

export default function ViewDetailCareer({ id }) {
  const [career, setCareer] = useState(null);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about/career/${id}`);
        setCareer(res.data);
      } catch (err) {
        console.error("Failed to fetch career details", err);
      }
    };

    if (id) fetchCareer();
  }, [id]);

  if (!career) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl items-center text-black-500 mb-6">Career Details</h1>

      <div className="bg-white rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl !text-red-600">{career.position}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
          <div>
            <span className="font-semibold text-gray-500">Employees Needed:</span>
            <p>{career.employeesNeeded}</p>
          </div>

          <div>
            <span className="font-semibold text-gray-500">Location:</span>
            <p>{career.location}</p>
          </div>

          <div>
            <span className="font-semibold text-gray-500">Qualification:</span>
            <p>{career.qualification}</p>
          </div>

          <div>
            <span className="font-semibold text-gray-500">Experience:</span>
            <p>{career.experience} year(s)</p>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Job Description</h3>
            <p className="text-gray-800 whitespace-pre-line">{career.jobDescription}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Skill Requirements</h3>
            <p className="text-gray-800 whitespace-pre-line">{career.skillRequirement}</p>
          </div>
        </div>
      </div>

      <ApplyForJob id={id} />
    </div>
  );
}
