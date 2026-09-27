'use client';

import React, { useState } from 'react';
import { usePlan } from '@/components/SafeMerge';
import { PlanMatrix } from '@/components/PlanMatrix';
import { EmptyPlan } from '@/components/EmptyPlan';
import { SafePlan } from '@/components/SafePlan';

type SortOption = 'Duration' | 'Calories' | 'Rating';

export default function MyPlanPage() {
  const { planItems, savedItems, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState<SortOption>('Duration');
  const [searchQuery, setSearchQuery] = useState('');

  const currentList = activeTab === 'plan' ? planItems : savedItems;

  const totalExercises = planItems.length;
  const totalMinutes = planItems.reduce((acc, item) => acc + item.duration, 0);
  const totalCalories = planItems.reduce((acc, item) => acc + item.calories, 0);

  const filteredList = (currentList || []).filter((item) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(q);
    const tagMatch = item.category?.some((c) => c.toLowerCase().includes(q));
    return nameMatch || tagMatch;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === 'Duration') return b.duration - a.duration;
    if (sortBy === 'Calories') return b.calories - a.calories;
    if (sortBy === 'Rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <PlanMatrix
        exercises={totalExercises}
        minutes={totalMinutes}
        calories={totalCalories}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-[#141721] p-1 rounded-xl border border-gray-800 w-fit">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
              activeTab === 'plan'
                ? 'bg-[#4e2333] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan ({planItems.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
              activeTab === 'saved'
                ? 'bg-[#4e2333] text-white shadow'
                : 'text-gray-800 hover:text-white'
            }`}
          >
            Saved ({savedItems.length})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#141721] border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00]"
          />

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#141721] border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#ccff00]"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <EmptyPlan />
      ) : (
        <div className="space-y-4">
          {sortedList?.map((item) => (
            <SafePlan
              key={item.id}
              item={item}
              showDoneButton={activeTab === 'plan'}
              onDone={toggleDone}
              onRemove={activeTab === 'plan' ? removeFromPlan : removeFromSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}