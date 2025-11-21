import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSortBy, selectCategories } from "../redux/productsSlice";
import { RootState } from "../redux/store";
import SearchBar from "./SearchBar";

interface Props {
  search: string;
  setSearch: (val: string) => void;
}

const FilterBar: React.FC<Props> = ({ search, setSearch }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => selectCategories(state));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      {/* SEARCH */}
      <div className="flex-1">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* CATEGORY */}
      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-700">Category:</label>
        <select
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* SORT */}
      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-700">Sort:</label>
        <select
          onChange={(e) => dispatch(setSortBy(e.target.value as any))}
          className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500"
        >
          <option value="none">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating-asc">Rating: Low → High</option>
          <option value="rating-desc">Rating: High → Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar