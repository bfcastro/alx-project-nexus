import React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-full md:w-1/2 p-3 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;