'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from './Badge';
import { usePlan } from './SafeMerge';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { planItems, savedItems } = usePlan();

  return (
    <header className="bg-[#0e1017] border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 text-[#ccff00]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-wider text-white uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Middle Navigation Links */}
        <nav className="flex items-center gap-2 bg-[#161922] p-1 rounded-full border border-gray-800">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase transition-all ${
              pathname === '/'
                ? 'bg-[#ccff00] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase transition-all ${
              pathname === '/my-plan'
                ? 'bg-[#ccff00] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Badges */}
        <Link href="/my-plan" className="flex items-center gap-3">
          <Badge label="Plan" count={planItems.length} variant="filled" />
          <Badge label="Saved" count={savedItems.length} variant="outline" />
        </Link>
      </div>
    </header>
  );
};