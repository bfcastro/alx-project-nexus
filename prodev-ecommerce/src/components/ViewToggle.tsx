import React from 'react';

interface Props {
  view: 'grid' | 'list';
  setView: (v: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<Props> = ({ view, setView }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setView('grid')}
        className={`px-3 py-1 rounded ${view === 'grid' ? 'bg-gray-900 text-white' : 'bg-white border'}`}
      >
        Grid
      </button>
      <button
        onClick={() => setView('list')}
        className={`px-3 py-1 rounded ${view === 'list' ? 'bg-gray-900 text-white' : 'bg-white border'}`}
      >
        List
      </button>
    </div>
  );
};

export default ViewToggle;