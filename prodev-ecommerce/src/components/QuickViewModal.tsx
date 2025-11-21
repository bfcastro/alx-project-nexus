import React from 'react';
import { Product } from '../redux/productsSlice';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const QuickViewModal: React.FC<{
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}> = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 p-1">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img src={product.image} alt={product.title} className="w-full h-80 object-contain" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.category}</p>
            <p className="font-bold text-lg mb-4">${product.price}</p>
            <p className="text-sm text-gray-700 mb-6">⭐ {product.rating.toFixed(1)}</p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  dispatch(addToCart({ product, qty: 1 }));
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add to cart
              </button>

              <button onClick={onClose} className="px-4 py-2 border rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;