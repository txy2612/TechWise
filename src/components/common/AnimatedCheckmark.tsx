import React from 'react';
import './animations.css';

interface AnimatedCheckmarkProps {
  size?: 'small' | 'large'; // Add size prop
}

export const AnimatedCheckmark: React.FC<AnimatedCheckmarkProps> = ({ size = 'large' }) => {
  // Determine size: 'large' uses the CSS default (80px), 'small' overrides it to 24px
  const dimension = size === 'small' ? '40px' : '80px';
  const containerClass = size === 'large' ? 'flex justify-center mb-6' : 'flex items-center justify-center';

  return (
    <div className={containerClass}>
      <svg 
        className="checkmark-svg" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 52 52"
        // We use inline style to override the fixed 80px width in animations.css when 'small' is selected
        style={{ width: dimension, height: dimension }}
      >
        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
      </svg>
    </div>
  );
};