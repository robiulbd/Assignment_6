'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout, PlanItem } from '@/type/Workout';

const getStorageItem = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'info';
}

interface PlanContextType {
  planItems: PlanItem[];
  savedItems: PlanItem[];
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  toggleDone: (id: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  isHydrated: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const MAX_PLAN_CAP = 5;

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [savedItems, setSavedItems] = useState<PlanItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    // explicit type definition
    const storedPlan = getStorageItem<PlanItem[]>("fitlog_plan", []);
    const storedSaved = getStorageItem<PlanItem[]>("fitlog_saved", []);

    setTimeout(() => {
      setPlanItems(storedPlan);
      setSavedItems(storedSaved);
      setIsHydrated(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('fitlog_plan', JSON.stringify(planItems));
    }
  }, [planItems, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('fitlog_saved', JSON.stringify(savedItems));
    }
  }, [savedItems, isHydrated]);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToPlan = (workout: Workout): boolean => {
    if (planItems.length >= MAX_PLAN_CAP) {
      showToast('Limit reached! Maximum 5 lifts allowed for today.', 'warning');
      return false;
    }
    if (planItems.some((item) => item.id === workout.id)) {
      showToast("Workout is already in today's plan", 'info');
      return false;
    }
    setPlanItems((prev) => [...prev, { ...workout, isDone: false, addedAt: Date.now() }]);
    showToast("Added to today's plan");
    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (savedItems.some((item) => item.id === workout.id)) {
      showToast('Workout is already in saved list', 'info');
      return;
    }
    setSavedItems((prev) => [...prev, { ...workout, addedAt: Date.now() }]);
    showToast('Saved for later');
  };

  const removeFromPlan = (id: string) => {
    setPlanItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from plan', 'info');
  };

  const removeFromSaved = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from saved list', 'info');
  };

  const toggleDone = (id: string) => {
    setPlanItems((prev) =>
      prev?.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
    showToast('Updated status', 'success');
  };

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
        toasts,
        showToast,
        isHydrated,
      }}
    >
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        {toasts?.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-md shadow-xl text-sm font-semibold tracking-wide border flex items-center gap-2 transition-all duration-300 ${
              toast.type === 'warning'
                ? 'bg-amber-900/90 text-amber-200 border-amber-600'
                : toast.type === 'info'
                ? 'bg-blue-900/90 text-blue-200 border-blue-600'
                : 'bg-[#181d12] text-[#ccff00] border-[#ccff00]/40'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};