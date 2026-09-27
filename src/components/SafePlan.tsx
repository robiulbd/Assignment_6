import React from 'react';
import Link from 'next/link';
import { PlanItem } from '@/type/Workout';

interface SafePlanProps {
  item: PlanItem;
  onDone?: (id: string) => void;
  onRemove: (id: string) => void;
  showDoneButton?: boolean;
}

export const SafePlan: React.FC<SafePlanProps> = ({
  item,
  onDone,
  onRemove,
  showDoneButton = true,
}) => {
  return (
    <div
      className={`bg-[#141721] rounded-xl border ${
        item.isDone ? 'border-green-600/40 opacity-75' : 'border-gray-800'
      } p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all`}
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src={item.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200'}
    alt={item.name}
    className="w-20 h-16 rounded-lg object-cover bg-gray-800 flex-shrink-0"
  />
  <div>
          <h4 className="text-white font-bold text-base uppercase flex items-center gap-2">
            {item.name}
            {item.isDone && (
              <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded font-medium">
                Done
              </span>
            )}
          </h4>
          <p className="text-gray-400 text-xs mb-2">
            {Array.isArray(item.equipment) ? item.equipment.join(', ') : item.equipment}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>🕒 {item.duration} min</span>
            <span>🔥 {item.calories} kcal</span>
            <span>⭐ {item.rating}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-800">
        <Link
          href={`/workout/${item.id}`}
          className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 text-xs font-semibold hover:border-gray-500 transition-colors"
        >
          View Details
        </Link>

        {showDoneButton && onDone && (
          <button
            onClick={() => onDone(item.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-1 transition-colors ${
              item.isDone
                ? 'bg-gray-800 text-gray-400'
                : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
            }`}
          >
            ✓ {item.isDone ? 'Completed' : 'Mark as Done'}
          </button>
        )}

        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-500 hover:text-red-400 transition-colors text-lg font-bold"
          aria-label="Remove"
        >
          ✕
        </button>
      </div>
    </div>
  );
};