import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/productsSlice';
import { RootState, AppDispatch } from './redux/store';
import ProductCard from './components/ProductCard';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { filtered, status } = useSelector((state: RootState) => state.products);

  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(8);

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
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        setVisibleCount((v) => v + 8);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset visibleCount on search/filter change
  useEffect(() => {
    setVisibleCount(8);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [search, filtered, view]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* MAIN CONTENT */}
      <main className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">E-Commerce Catalog</h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <SearchBar value={search} onChange={setSearch} />
          <div className="flex items-center gap-3">
            <ViewToggle view={view} setView={setView} />
          </div>
        </div>

        <FilterBar />

        {status === 'loading' && <p>Loading products...</p>}
        {status === 'failed' && (
          <p className="text-red-500">Failed to load products.</p>
        )}

        {/* PRODUCTS */}
        {view === 'grid' ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: {} }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {searched.slice(0, visibleCount).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <ProductCard product={p} view="grid" />
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
                transition={{ duration: 0.3 }}
                className="mb-3"
              >
                <ProductCard product={p} view="list" />
              </motion.div>
            ))}
          </div>
        )}

        {visibleCount < searched.length && (
          <p className="text-center mt-6 text-gray-500">
            Scroll down to load more...
          </p>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;