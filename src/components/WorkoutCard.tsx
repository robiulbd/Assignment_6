import React from 'react';
import Link from 'next/link';
import { Workout } from '@/type/Workout';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="bg-[#141721] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all group flex flex-col"
    >
      <div className="h-44 overflow-hidden relative bg-[#1a1e2b]">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src={workout.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600'}
    alt={workout.name}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />
</div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {workout.category?.map((cat, idx) => (
            <span
              key={idx}
              className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-white font-black tracking-wide text-base uppercase mb-1 line-clamp-1">
          {workout.name}
        </h3>

        <p className="text-gray-400 text-xs mb-4">
          {Array.isArray(workout.equipment) ? workout.equipment.join(', ') : workout.equipment}
        </p>

        <div className="mt-auto pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">🕒 {workout.duration} min</span>
          <span className="flex items-center gap-1">🔥 {workout.calories} kcal</span>
          <span className="flex items-center gap-1 text-gray-300">⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
};