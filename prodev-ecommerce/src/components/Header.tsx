import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ShoppingCart } from 'lucide-react';

const Header: React.FC<{ onOpenCart?: () => void }> = ({ onOpenCart }) => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((s, it) => s + it.quantity, 0)
  );

  return (
    <header className="w-full fixed top-0 left-0 bg-white/95 backdrop-blur z-40 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold">Ecommerce Catalog</div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onOpenCart?.()}
            className="relative p-2 rounded-md hover:bg-gray-100"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;