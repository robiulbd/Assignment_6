'use client';

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { Workout } from '@/type/Workout';
import { usePlan } from '@/components/SafeMerge';

const DEFAULT_INSTRUCTIONS = [
  'Lie on the bench with eyes under the bar and feet planted.',
  'Unrack with locked elbows and lower the bar to mid-chest.',
  'Press up in a slight arc until elbows lock without bouncing.',
  'Keep shoulder blades pinched and a natural arch in the back.',
];

export default function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setWorkout(data);
      } catch {
        setWorkout({
          id,
          name: 'BARBELL BENCH PRESS',
          category: ['Chest', 'Arms'],
          equipment: ['Barbell', 'Bench'],
          duration: 25,
          calories: 180,
          rating: 4.8,
          difficulty: 'Intermediate',
          sets: 4,
          reps: '6-8',
          description:
            'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.',
          image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800',
          instructions: DEFAULT_INSTRUCTIONS,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-400 font-semibold uppercase">
        Loading Details…
      </div>
    );
  }

  if (!workout) return notFound();

  const instructionsList = workout.instructions || DEFAULT_INSTRUCTIONS;

  return (
    <div className="py-8 my-4 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Visual Column */}
        <div className="lg:col-span-6 bg-[#141721] rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout?.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800'}
            alt={workout?.name || 'Workout Image'}
            className="w-full h-[450px] object-cover"
          />
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-6 flex flex-col">
          <h1 className="text-3xl font-black text-white uppercase tracking-wide mb-2">
            {workout.name}
          </h1>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed font-medium">
            {workout.description ||
              'A compound exercise designed to target primary muscle groups with high efficiency.'}
          </p>

          <div className="flex gap-2 mb-6">
            {workout?.category?.map((cat, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Details Table */}
          <div className="bg-[#141721] rounded-xl border border-gray-800 divide-y divide-gray-800/60 mb-6 text-xs shadow-md">
            <div className="flex justify-between p-3.5">
              <span className="text-gray-400 font-semibold uppercase">EQUIPMENT</span>
              <span className="text-white font-bold">
                {Array.isArray(workout.equipment) ? workout.equipment.join(', ') : workout.equipment}
              </span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-gray-400 font-semibold uppercase">DIFFICULTY</span>
              <span className="text-white font-bold">{workout.difficulty || 'Intermediate'}</span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-gray-400 font-semibold uppercase">SETS</span>
              <span className="text-white font-bold">{workout.sets || 4}</span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-gray-400 font-semibold uppercase">REPS</span>
              <span className="text-white font-bold">{workout.reps || '6-8'}</span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-gray-400 font-semibold uppercase">DURATION</span>
              <span className="text-white font-bold">{workout.duration} min</span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-gray-400 font-semibold uppercase">CALORIES</span>
              <span className="text-white font-bold">{workout.calories} kcal</span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-gray-400 font-semibold uppercase">RATING</span>
              <span className="text-white font-bold">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-xs">
              {instructionsList.map((step, idx) => (
                <li key={idx} className="flex gap-2 leading-relaxed">
                  <span className="text-[#ccff00] font-bold">{idx + 1}.</span>
                  <span className="text-gray-300 font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Modern Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-auto">
            <button
              onClick={() => addToPlan(workout)}
              className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-6 py-3.5 rounded-xl hover:bg-[#b8e600] active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#ccff00]/10 cursor-pointer"
            >
              📅 Add to today&apos;s plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="bg-[#1a1d28] text-white border border-gray-700 hover:border-[#ccff00] hover:bg-[#222736] active:scale-95 font-extrabold text-xs uppercase px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              🔖 Save for later
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}