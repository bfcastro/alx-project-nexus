import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { selectCategories, setCategory } from '../redux/productsSlice';

const CategorySidebar: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => selectCategories(state));

  return (
    <aside className="w-full md:w-64 border-r pr-4">
      <h4 className="font-semibold mb-3">Categories</h4>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c}>
            <button
              onClick={() => dispatch(setCategory(c))}
              className="text-left w-full py-1 px-2 rounded hover:bg-gray-100"
            >
              {c}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;