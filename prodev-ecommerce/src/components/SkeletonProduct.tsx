import React from 'react';

const SkeletonProduct: React.FC<{ view?: 'grid' | 'list' }> = ({ view = 'grid' }) => {
  const base = 'animate-pulse bg-gray-200 rounded';
  if (view === 'list') {
    return (
      <div className="flex gap-4 p-4 border rounded-xl">
        <div className={`${base} w-28 h-28`} />
        <div className="flex-1 space-y-2 py-1">
          <div className={`${base} h-5 w-3/4`} />
          <div className={`${base} h-4 w-1/3`} />
          <div className="flex justify-between">
            <div className={`${base} h-6 w-24`} />
            <div className={`${base} h-6 w-12`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl bg-white border p-4 shadow-sm">
      <div className="w-full h-44 mb-3 overflow-hidden rounded-md">
        <div className={`${base} w-full h-full`} />
      </div>
      <div className="space-y-2">
        <div className={`${base} h-4 w-3/4`} />
        <div className={`${base} h-3 w-1/2`} />
        <div className="flex items-center justify-between">
          <div className={`${base} h-6 w-20`} />
          <div className={`${base} h-6 w-12`} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;