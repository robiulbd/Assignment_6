'use client';

import React, { useState, useEffect } from 'react';
import { Workout } from '@/type/Workout';
import { WorkoutCard } from '@/components/WorkoutCard';

const FALLBACK_WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'BARBELL BENCH PRESS',
    category: ['CHEST', 'ARMS'],
    equipment: ['Barbell', 'Bench'],
    duration: 25,
    calories: 180,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600',
    description: 'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.',
  },
  {
    id: '2',
    name: 'PULL-UP',
    category: ['BACK', 'ARMS'],
    equipment: ['Pull-up Bar'],
    duration: 15,
    calories: 120,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=600',
    description: 'Upper body bodyweight staple focusing on lats, upper back, and biceps strength.',
  },
  {
    id: '3',
    name: 'BACK SQUAT',
    category: ['LEGS', 'CORE'],
    equipment: ['Barbell', 'Rack'],
    duration: 30,
    calories: 240,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600',
    description: 'King of leg exercises strengthening quads, glutes, hamstrings, and core stability.',
  },
  {
    id: '4',
    name: 'OVERHEAD PRESS',
    category: ['SHOULDERS', 'ARMS'],
    equipment: ['Barbell'],
    duration: 20,
    calories: 150,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600',
  },
  {
    id: '5',
    name: 'DUMBBELL BICEP CURL',
    category: ['ARMS'],
    equipment: ['Dumbbells'],
    duration: 12,
    calories: 80,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600',
  },
  {
    id: '6',
    name: 'RUSSIAN TWIST',
    category: ['CORE'],
    equipment: ['Medicine Ball'],
    duration: 8,
    calories: 70,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600',
  },
];

export const Library: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('https://api.api-store.workers.dev/api/fitlog');
        if (!res.ok) throw new Error('API request failed');
        const data = await res.json();
        setWorkouts(data.length ? data : FALLBACK_WORKOUTS);
      } catch {
        setWorkouts(FALLBACK_WORKOUTS);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="my-12">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[#141721] rounded-xl h-72 animate-pulse border border-gray-800"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts?.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};