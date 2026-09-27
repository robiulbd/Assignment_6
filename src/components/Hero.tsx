'use client';

import React from 'react';

export const Hero: React.FC = () => {
  const heroBannerImage = "/assets/banner.png";

  const scrollToLibrary = () => {
    const element = document.getElementById('library');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#141721] rounded-2xl border border-gray-800/80 p-8 md:p-12 my-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <span className="text-[#ccff00] font-bold text-xs tracking-widest uppercase block mb-3">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase font-sans mb-4">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the w...
          </p>
          <button
            onClick={scrollToLibrary}
            className="bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-[#b8e600] transition-colors flex items-center gap-2"
          >
            BROWSE WORKOUTS
            <span>↓</span>
          </button>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm h-64 md:h-80 rounded-xl overflow-hidden border border-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroBannerImage}
              alt="FitLog Gym Hero Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};