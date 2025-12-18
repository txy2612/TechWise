// File: src/components/common/SelectableItemCard.tsx

import React from 'react';
import { Check, User } from 'lucide-react';

interface SelectableItemCardProps {
  title: string;
  subtitle: React.ReactNode; // Using ReactNode allows string or JSX (for colored feedback)
  icon?: React.ReactNode;    // Optional custom icon for the left avatar circle
  isSelected: boolean;       // Controls green vs gray styling
  onClick: () => void;       // Handler for the click event
}

export const SelectableItemCard: React.FC<SelectableItemCardProps> = ({
  title,
  subtitle,
  icon,
  isSelected,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      // Main container styling: Flex row with padding, rounded corners, and conditional borders/backgrounds based on selection state.
      className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all gap-4 ${
        isSelected
          ? 'bg-green-50 border-green-500' // Style when selected (like Image 4 green state)
          : 'bg-white border-gray-200 hover:bg-gray-50' // Style when default
      }`}
    >
      {/* 1. Left Side: Avatar Circle */}
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
         {/* Use provided icon or fallback to a default User icon */}
         {icon || <User className="w-7 h-7" />}
      </div>

      {/* 2. Middle Section: Text content */}
      <div className="flex-1 flex flex-col justify-center">
         <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{title}</h3>
         <div className="text-gray-500 text-sm leading-tight">{subtitle}</div>
      </div>
      
    </div>
  );
};