import React from 'react';

interface BadgeProps {
  label: string;
  count: number;
  variant?: 'filled' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ label, count, variant = 'filled' }) => {
  if (variant === 'filled') {
    return (
      <div className="flex items-center gap-2 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
        <span>{label}</span>
        <span className="bg-black text-[#ccff00] w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
          {count}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border border-gray-600 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
      <span>{label}</span>
      <span className="text-gray-400 text-[11px]">{count}</span>
    </div>
  );
};