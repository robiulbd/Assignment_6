import React from 'react';

interface PlanMatrixProps {
  exercises?: number;
  minutes?: number;
  calories?: number;
}

export const PlanMatrix: React.FC<PlanMatrixProps> = ({
  exercises = 0,
  minutes = 0,
  calories = 0,
}) => {
  return (
    <div className="bg-[#141721] rounded-2xl border border-gray-800 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="border-b md:border-b-0 md:border-r border-gray-800 pb-4 md:pb-0 pr-4">
        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
          Exercises
        </span>
        <span className="text-4xl font-extrabold text-[#ccff00]">{exercises}</span>
      </div>

      <div className="border-b md:border-b-0 md:border-r border-gray-800 pb-4 md:pb-0 pr-4">
        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
          Minutes
        </span>
        <span className="text-4xl font-extrabold text-white">{minutes}</span>
      </div>

      <div>
        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
          Calories
        </span>
        <span className="text-4xl font-extrabold text-white">{calories}</span>
      </div>
    </div>
  );
};