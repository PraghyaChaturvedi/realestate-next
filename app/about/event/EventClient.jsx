'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import EventCard from './EventCard';

export default function EventClient({ events }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-4xl">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 rounded-full p-3">
            <Lock className="text-white" size={32} />
          </div>
        </div>
        <p className="text-2xl font-bold text-white">Event Gallery</p>
      </div>

      {/* Event Cards */}
      <div className="p-10 m-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {events?.length === 0 ? (
            <p className="text-gray-600 text-lg">No events found.</p>
          ) : (
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}
        </div>
      </div>
    </div>
  );
}
