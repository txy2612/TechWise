import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AnimatedArrowProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  label?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function AnimatedArrow({ 
  direction = 'right', 
  label,
  position = 'top'
}: AnimatedArrowProps) {
  const rotations = {
    up: '-90deg',
    down: '90deg',
    left: '180deg',
    right: '0deg',
  };

  const positionClasses = {
    top: 'absolute left-1/2 -translate-x-1/2 -top-20',
    bottom: 'absolute left-1/2 -translate-x-1/2 -bottom-20',
    left: 'absolute -left-24 top-1/2 -translate-y-1/2',
    right: 'absolute -right-24 top-1/2 -translate-y-1/2',
  };

  return (
    <div className={`${positionClasses[position]} pulse-arrow`}>
      <div className="flex flex-col items-center gap-2">
        <ArrowRight 
          className="w-8 h-8 text-blue-600" 
          style={{ transform: `rotate(${rotations[direction]})` }}
        />
        {label && (
          <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
