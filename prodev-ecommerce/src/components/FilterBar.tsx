import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByCategory,
  sortByPrice,
  sortByRating,
  selectCategories,
} from '../redux/productsSlice';
import { RootState } from '../redux/store';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => selectCategories(state));

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        <label className="font-medium text-gray-700">Category:</label>
        <select
          onChange={(e) => dispatch(filterByCategory(e.target.value))}
          className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <label className="font-medium text-gray-700">Sort:</label>
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'price-asc') dispatch(sortByPrice('asc'));
            if (val === 'price-desc') dispatch(sortByPrice('desc'));
            if (val === 'rating-asc') dispatch(sortByRating('asc'));
            if (val === 'rating-desc') dispatch(sortByRating('desc'));
          }}
          className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500"
        >
          <option value="none">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating-desc">Rating: High → Low</option>
          <option value="rating-asc">Rating: Low → High</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;