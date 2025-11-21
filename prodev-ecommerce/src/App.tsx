import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectPaginated } from "./redux/productsSlice";
import { RootState, AppDispatch } from "./redux/store";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import ViewToggle from "./components/ViewToggle";
import ProductCard from "./components/ProductCard";
import QuickViewModal from "./components/QuickViewModal";
import SkeletonProduct from "./components/SkeletonProduct";
import Footer from "./components/Footer";

import { motion } from "framer-motion";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { filtered, status } = useSelector((state: RootState) => state.products);

  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(8);

  // Quick view modal
  const [quickProduct, setQuickProduct] = useState<null | any>(null);
  const [quickOpen, setQuickOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  // Apply search filter
  const searched = useMemo(() => {
    return filtered.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [filtered, search]);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        setVisibleCount((v) => v + 8);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset visibleCount on search/filter/view change
  useEffect(() => {
    setVisibleCount(8);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, filtered, view]);

  const openQuick = (p: any) => {
    setQuickProduct(p);
    setQuickOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Heading + View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h1 className="text-2xl font-bold">Products</h1>
            <ViewToggle view={view} setView={setView} />
          </div>

          {/* Filters: Search + Category + Sort */}
          <FilterBar search={search} setSearch={setSearch} />

          {/* Loading Skeleton */}
          {status === "loading" && (
            <div
              className={`grid gap-6 ${
                view === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col"
              }`}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonProduct key={i} view={view} />
              ))}
            </div>
          )}

          {/* Product List */}
          {status !== "loading" && (
            <>
              {searched.length === 0 ? (
                <div className="text-center py-14">No products found.</div>
              ) : view === "grid" ? (
                <motion.div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                  {searched.slice(0, visibleCount).map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <ProductCard product={p} view={view} onQuickView={openQuick} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col">
                  {searched.slice(0, visibleCount).map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mb-3"
                    >
                      <ProductCard product={p} view={view} onQuickView={openQuick} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
        product={quickProduct}
      />
    </div>
  );
}

export default App;