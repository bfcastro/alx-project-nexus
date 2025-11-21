import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const findIndex = (items: CartItem[], productId: number) =>
  items.findIndex((i) => i.id === productId);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; qty?: number }>) => {
      const { product, qty = 1 } = action.payload;
      const idx = findIndex(state.items, product.id);
      if (idx >= 0) {
        state.items[idx].quantity += qty;
      } else {
        state.items.push({ ...product, quantity: qty });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQty: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const idx = findIndex(state.items, action.payload.id);
      if (idx >= 0) {
        state.items[idx].quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;