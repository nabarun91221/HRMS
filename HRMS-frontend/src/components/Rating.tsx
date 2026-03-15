'use client';

import { cn } from '@/lib/utils';
import { Icon } from '@iconify-icon/react';

import React, { useState } from 'react';

interface RatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  className?: string;
  emptyIcon?: string;
  filledIcon?: string;
  halfIcon?: string;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  step = 0.5,
  size = 'md',
  readonly = false,
  className,
  emptyIcon = 'mdi:star-outline',
  filledIcon = 'mdi:star',
  halfIcon = 'mdi:star-half-full',
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null);
    }
  };

  const getStarIcon = (starIndex: number, currentValue: number) => {
    const diff = currentValue - starIndex;

    if (diff >= 1) {
      return filledIcon;
    } else if (diff >= 0.5) {
      return halfIcon;
    } else {
      return emptyIcon;
    }
  };

  const getStarColor = (starIndex: number, currentValue: number) => {
    const diff = currentValue - starIndex;
    if (diff >= 0.5) {
      return 'text-yellow-400';
    } else {
      return 'text-gray-300';
    }
  };

  const generateRatingSteps = () => {
    const steps = [];
    for (let i = step; i <= max; i += step) {
      steps.push(i);
    }
    return steps;
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={cn('flex gap-1', className)}>
      <div className='flex items-center'>
        {Array.from({ length: max }, (_, index) => {
          const starIndex = index;
          const ratingSteps = generateRatingSteps().filter(
            step => step > starIndex && step <= starIndex + 1
          );

          return (
            <div key={index} className='relative'>
              <Icon
                icon={getStarIcon(starIndex, displayValue)}
                className={cn(
                  sizeClasses[size],
                  getStarColor(starIndex, displayValue),
                  !readonly && 'transition-colors duration-150'
                )}
              />

              {!readonly && (
                <div className='absolute inset-0 flex'>
                  {ratingSteps.map(rating => (
                    <button
                      type='button'
                      key={rating}
                      className={cn('flex-1 cursor-pointer', step === 0.5 ? 'hover:scale-110' : '')}
                      onClick={() => handleClick(rating)}
                      onMouseEnter={() => handleMouseEnter(rating)}
                      onMouseLeave={handleMouseLeave}
                      aria-label={`Rate ${rating} out of ${max}`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {displayValue > 0 && (
        <span className='ml-2 text-sm text-gray-600 font-medium'>{displayValue.toFixed(1)}</span>
      )}
    </div>
  );
};

export default Rating;
