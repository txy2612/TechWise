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

  const animationClass = ['up', 'down'].includes(direction) ? 'bounce-vertical' : 'pulse-arrow';

  return (
    <div className={`${positionClasses[position]} ${animationClass}`}>
      <div className="flex flex-col items-center gap-2">
        <ArrowRight
          className="w-12 h-12 text-blue-600 pulse-blue-filter"
          style={{ transform: `rotate(${rotations[direction]})` }}
        />
        {label && (
          <div className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap shadow-lg pulse-blue-glow">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
