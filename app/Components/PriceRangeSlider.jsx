import React, { useState, useEffect, useCallback, useRef } from 'react';

const PriceRangeSlider = ({ minBudget, maxBudget, onRangeChange }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(null);
  
  // Fixed range: 1 lakh to 100 crore (in lakhs)
  const MIN_PRICE = 1; // 1 lakh
  const MAX_PRICE = 2500; // 25 crore (2500 lakhs)
  
  // Convert current budget values from actual numbers to lakhs
  const [minValue, setMinValue] = useState(
    minBudget ? Math.round(minBudget / 100000) : MIN_PRICE
  );
  const [maxValue, setMaxValue] = useState(
    maxBudget ? Math.round(maxBudget / 100000) : MAX_PRICE
  );

  // Format price for display
  const formatPrice = (value) => {
    if (value >= 100) {
      return `₹${(value / 100).toFixed(value % 100 === 0 ? 0 : 1)} Cr`;
    }
    return `₹${value} L`;
  };

  // Calculate percentage position
  const getPercentage = (value) => {
    return ((value - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  };

  // Get value from percentage
  const getValueFromPercentage = (percentage) => {
    return Math.round(MIN_PRICE + (percentage / 100) * (MAX_PRICE - MIN_PRICE));
  };

  // Handle mouse/touch events for dragging
  const handleStart = (type) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(type);
  };

  const handleMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const value = getValueFromPercentage(percentage);

    if (isDragging === 'min') {
      const newMinValue = Math.min(value, maxValue - 1);
      if (newMinValue !== minValue) {
        setMinValue(newMinValue);
        onRangeChange?.(newMinValue * 100000, maxValue * 100000);
      }
    } else if (isDragging === 'max') {
      const newMaxValue = Math.max(value, minValue + 1);
      if (newMaxValue !== maxValue) {
        setMaxValue(newMaxValue);
        onRangeChange?.(minValue * 100000, newMaxValue * 100000);
      }
    }
  }, [isDragging, minValue, maxValue, onRangeChange]);

  const handleEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleMove(e);
      const handleTouchMove = (e) => handleMove(e);
      const handleMouseUp = () => handleEnd();
      const handleTouchEnd = () => handleEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  // Update local state when props change
  useEffect(() => {
    if (minBudget !== undefined) {
      const newMinValue = Math.round(minBudget / 100000);
      if (newMinValue !== minValue) setMinValue(newMinValue);
    }
    if (maxBudget !== undefined) {
      const newMaxValue = Math.round(maxBudget / 100000);
      if (newMaxValue !== maxValue) setMaxValue(newMaxValue);
    }
  }, [minBudget, maxBudget]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);
  const rangeWidth = maxPercentage - minPercentage;

  return (
    <div className="w-full px-2 py-8">
      {/* Current range display - always visible */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium text-gray-700">
          Range: {formatPrice(minValue)} - {formatPrice(maxValue)}
        </div>
      </div>

      {/* Slider container */}
      <div className="relative" ref={sliderRef}>
        {/* Background track */}
        <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
          {/* Active range */}
          <div 
            className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-150 ease-out"
            style={{
              left: `${minPercentage}%`,
              width: `${rangeWidth}%`
            }}
          />
        </div>

        {/* Min thumb */}
        <div 
          className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-grab z-40 transition-all duration-200 ${
            isDragging === 'min' ? 'scale-125 cursor-grabbing shadow-xl' : 'hover:scale-110'
          }`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={handleStart('min')}
          onTouchStart={handleStart('min')}
        />
        
        {/* Max thumb */}
        <div 
          className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-grab z-40 transition-all duration-200 ${
            isDragging === 'max' ? 'scale-125 cursor-grabbing shadow-xl' : 'hover:scale-110'
          }`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={handleStart('max')}
          onTouchStart={handleStart('max')}
        />
      </div>

      {/* Price range labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <span>₹1 L</span>
        <span>₹25 Cr</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;


