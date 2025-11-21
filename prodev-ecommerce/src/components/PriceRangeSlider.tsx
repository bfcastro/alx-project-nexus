import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPriceRange } from '../redux/productsSlice';

const PriceRangeSlider: React.FC<{ min?: number; max?: number }> = ({ min = 0, max = 2000 }) => {
  const dispatch = useDispatch();
  const [low, setLow] = useState(min);
  const [high, setHigh] = useState(max);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setPriceRange([low, high]));
    }, 300);
    return () => clearTimeout(timeout);
  }, [low, high, dispatch]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={low}
          onChange={(e) => setLow(Math.min(Number(e.target.value), high))}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={high}
          onChange={(e) => setHigh(Math.max(Number(e.target.value), low))}
          className="w-full"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Min: ${low}</span>
        <span>Max: ${high}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;