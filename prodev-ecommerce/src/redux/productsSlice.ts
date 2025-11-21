import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

/* ---------------------------------------------
   Interfaces
--------------------------------------------- */
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

interface FilterState {
  category: string;
  sortBy: "price-asc" | "price-desc" | "rating-asc" | "rating-desc" | "none";
  priceRange: [number, number];
  ratingRange: [number, number];
}

interface ProductsState {
  items: Product[];
  filtered: Product[];
  paginated: Product[];

  status: "idle" | "loading" | "failed";

  // pagination
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;

  // infinite scroll
  infiniteBatchSize: number;

  // filtering
  filters: FilterState;
}

/* ---------------------------------------------
   Initial State
--------------------------------------------- */
const initialState: ProductsState = {
  items: [],
  filtered: [],
  paginated: [],

  status: "idle",

  currentPage: 1,
  itemsPerPage: 8,
  totalPages: 1,

  infiniteBatchSize: 8,

  filters: {
    category: "All",
    sortBy: "none",
    priceRange: [0, 2000],
    ratingRange: [0, 5],
  },
};

/* ---------------------------------------------
   API Fetch
--------------------------------------------- */
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get<any[]>("https://fakestoreapi.com/products");

  const mapped: Product[] = res.data.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    image: p.image,
    rating: p.rating?.rate ?? 0,
  }));

  return mapped;
});

/* ---------------------------------------------
   Helper: Apply ALL Filters + Sorting
--------------------------------------------- */
const applyAllFilters = (state: ProductsState) => {
  const { category, sortBy, priceRange, ratingRange } = state.filters;

  let results = [...state.items];

  // CATEGORY FILTER
  if (category !== "All") {
    results = results.filter((p) => p.category === category);
  }

  // PRICE RANGE FILTER
  results = results.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // RATING RANGE FILTER
  results = results.filter(
    (p) => p.rating >= ratingRange[0] && p.rating <= ratingRange[1]
  );

  // SORTING
  if (sortBy === "price-asc") results.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") results.sort((a, b) => b.price - a.price);
  if (sortBy === "rating-asc") results.sort((a, b) => a.rating - b.rating);
  if (sortBy === "rating-desc") results.sort((a, b) => b.rating - a.rating);

  state.filtered = results;

  // update pagination
  state.totalPages = Math.ceil(state.filtered.length / state.itemsPerPage);
  updatePagination(state);
};

/* ---------------------------------------------
   Helper: Update Pagination Slice
--------------------------------------------- */
const updatePagination = (state: ProductsState) => {
  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  state.paginated = state.filtered.slice(start, end);
};

/* ---------------------------------------------
   Slice
--------------------------------------------- */
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /* --- Pagination Controls --- */
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      updatePagination(state);
    },

    /* --- Infinite Scroll: load more local items --- */
    loadMore: (state) => {
      const currentLength = state.paginated.length;
      const extra = state.filtered.slice(
        currentLength,
        currentLength + state.infiniteBatchSize
      );
      state.paginated = [...state.paginated, ...extra];
    },

    /* --- Category Filter --- */
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
      applyAllFilters(state);
    },

    /* --- Price Range Filter --- */
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
      applyAllFilters(state);
    },

    /* --- Rating Range Filter --- */
    setRatingRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.ratingRange = action.payload;
      applyAllFilters(state);
    },

    /* --- Sorting --- */
    setSortBy: (
      state,
      action: PayloadAction<
        "price-asc" | "price-desc" | "rating-asc" | "rating-desc" | "none"
      >
    ) => {
      state.filters.sortBy = action.payload;
      applyAllFilters(state);
    },

    /* --- Reset All Filters --- */
    resetFilters: (state) => {
      state.filters = {
        category: "All",
        sortBy: "none",
        priceRange: [0, 2000],
        ratingRange: [0, 5],
      };
      applyAllFilters(state);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        applyAllFilters(state);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

/* ---------------------------------------------
   Selectors
--------------------------------------------- */
export const selectCategories = (state: { products: ProductsState }) => {
  const cats = state.products.items.map((p) => p.category);
  return ["All", ...Array.from(new Set(cats))];
};

export const selectPaginated = (state: { products: ProductsState }) =>
  state.products.paginated;

export const selectTotalPages = (state: { products: ProductsState }) =>
  state.products.totalPages;

export const {
  setPage,
  loadMore,
  setCategory,
  setPriceRange,
  setRatingRange,
  setSortBy,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;