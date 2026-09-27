import React from 'react';
import Link from 'next/link';

export const EmptyPlan: React.FC = () => {
  return (
    <div className="border border-dashed border-gray-800 rounded-2xl p-12 text-center my-8 bg-[#11131b]">
      <h3 className="text-2xl font-black text-white tracking-wider uppercase mb-2">
        NOTHING HERE YET
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
      >
        Go to workouts
      </Link>
    </div>
  );
};