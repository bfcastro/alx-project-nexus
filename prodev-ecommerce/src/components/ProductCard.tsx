import React from 'react';
import { Product } from '../redux/productsSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

interface Props {
  product: Product;
  view?: 'grid' | 'list';
  onQuickView?: (p: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, view = 'grid', onQuickView }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ product, qty: 1 }));
  };

  if (view === 'list') {
    return (
      <div className="flex gap-4 p-4 border rounded-xl hover:shadow-lg transition">
        <img src={product.image} alt={product.title} className="w-28 h-28 object-cover rounded-md" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-bold">${product.price}</p>
            <p className="text-sm text-yellow-600">⭐ {product.rating.toFixed(1)}</p>
          </div>

          <div className="mt-3 flex gap-2">
            <button onClick={handleAdd} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
            <button onClick={() => onQuickView?.(product)} className="px-3 py-1 border rounded">Quick view</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl bg-white border p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-full h-44 mb-3 overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-md font-semibold line-clamp-2">{product.title}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="font-bold">${product.price}</p>
        <p className="text-sm text-yellow-600">⭐ {product.rating.toFixed(1)}</p>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={handleAdd} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded">Add to cart</button>
        <button onClick={() => onQuickView?.(product)} className="px-3 py-2 border rounded">View</button>
      </div>
    </div>
  );
};

export default ProductCard;