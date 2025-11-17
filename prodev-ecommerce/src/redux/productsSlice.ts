import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: number; // added rating scalar (rate)
}

interface ProductsState {
  items: Product[];
  filtered: Product[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  filtered: [],
  status: 'idle',
};

// Async thunk to fetch products and normalize rating
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<any[]>('https://fakestoreapi.com/products');
    // map API shape to our Product interface
    const mapped: Product[] = response.data.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      price: p.price,
      image: p.image,
      rating: p.rating?.rate ?? 0,
    }));
    return mapped;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsLocal: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filtered = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.filtered =
        action.payload === 'All'
          ? state.items
          : state.items.filter((p) => p.category === action.payload);
    },
    sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filtered.sort((a, b) =>
        action.payload === 'asc' ? a.price - b.price : b.price - a.price
      );
    },
    sortByRating: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filtered.sort((a, b) =>
        action.payload === 'asc' ? a.rating - b.rating : b.rating - a.rating
      );
    },
    appendProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = [...state.items, ...action.payload];
      state.filtered = [...state.filtered, ...action.payload];
    },
    resetFilter: (state) => {
      state.filtered = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filtered = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Selector to get unique categories
export const selectCategories = (state: { products: ProductsState }) => {
  const categories = state.products.items.map((p) => p.category);
  return ['All', ...Array.from(new Set(categories))];
};

export const {
  setProductsLocal,
  filterByCategory,
  sortByPrice,
  sortByRating,
  appendProducts,
  resetFilter,
} = productsSlice.actions;

export default productsSlice.reducer;