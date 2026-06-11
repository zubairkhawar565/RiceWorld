import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../features/products/productSlice';
import { Search, Filter, SlidersHorizontal, ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import axios from 'axios';

const Shop = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getProducts());
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.categoryId);
    
    // Price filter with inputs
    let matchesPrice = true;
    if (minPrice !== '') {
      matchesPrice = matchesPrice && Number(p.price) >= Number(minPrice);
    }
    if (maxPrice !== '') {
      matchesPrice = matchesPrice && Number(p.price) <= Number(maxPrice);
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
    if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-secondary min-h-screen pb-20">
      <div className="bg-white py-20 border-b border-gray-100 mb-12">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The Collection</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">Our Finest Grains</h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Discover a curated selection of premium rice varieties, each aged to perfection and sourced from the world's most fertile estates.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className={`lg:w-72 space-y-10 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary border-b border-gray-100 pb-2">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Find your grain..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-gray-200 py-4 px-4 pl-12 focus:outline-none focus:border-accent text-sm transition-colors text-primary"
                />
                <Search className="absolute left-4 top-4 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary border-b border-gray-100 pb-2">Categories</h3>
              <div className="space-y-4">
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="w-4 h-4 border-gray-300 text-accent focus:ring-accent rounded-none" 
                      />
                      <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{cat.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary border-b border-gray-100 pb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-2">Min Price</label>
                    <input 
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full border border-gray-200 py-2 px-3 focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-2">Max Price</label>
                    <input 
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full border border-gray-200 py-2 px-3 focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={resetFilters}
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-accent transition-colors"
            >
              Reset All Filters
            </button>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Showing <span className="text-primary">{filteredProducts.length}</span> exquisite grains
              </p>
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="lg:hidden flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </button>
                <div className="relative group">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border-none text-[10px] font-bold uppercase tracking-widest text-primary focus:ring-0 cursor-pointer pr-8"
                  >
                    <option value="featured">Sort By: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-0 text-gray-400 pointer-events-none" size={14} />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[3/4] mb-6" />
                    <div className="h-4 bg-gray-200 w-3/4 mb-3" />
                    <div className="h-4 bg-gray-200 w-1/4" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-32 text-center border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-serif italic text-xl">No grains found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  <AnimatePresence mode="wait">
                    {currentItems.map((product) => (
                      <motion.div 
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                          <img 
                            src={product.images?.[0]?.url?.startsWith('http') 
                              ? product.images[0].url 
                              : product.images?.[0]?.url 
                                ? `${window.location.origin}${product.images[0].url}`
                                : 'https://via.placeholder.com/400x500?text=Premium+Rice'} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Premium+Rice' }}
                          />
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="absolute bottom-6 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex space-x-2">
                            <button 
                              onClick={() => dispatch(addToCart(product))}
                              className="flex-1 bg-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center justify-center space-x-3 hover:bg-primary hover:text-white transition-all shadow-2xl"
                            >
                              <ShoppingCart size={14} />
                              <span>Add to Cart</span>
                            </button>
                            <button 
                              onClick={() => dispatch(toggleWishlist(product))}
                              className={`p-4 shadow-2xl transition-all ${
                                wishlistItems.find(item => item.id === product.id)
                                  ? 'bg-accent text-white'
                                  : 'bg-white text-primary hover:bg-accent hover:text-white'
                              }`}
                            >
                              <Heart size={14} fill={wishlistItems.find(item => item.id === product.id) ? "currentColor" : "none"} />
                            </button>
                          </div>
                        </div>
                        <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-2">{product.category?.name}</p>
                        <h3 className="font-serif text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <p className="font-bold text-primary text-lg">${product.price}</p>
                          {product.salePrice && (
                            <p className="text-gray-400 line-through text-sm font-light">${product.salePrice}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {totalPages > 1 && (
                  <div className="mt-20 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all"
                    >
                      <ChevronDown className="rotate-90" size={16} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 text-xs font-bold transition-all ${
                          currentPage === i + 1 
                            ? 'bg-primary text-white' 
                            : 'border border-gray-200 text-gray-500 hover:border-accent hover:text-accent'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all"
                    >
                      <ChevronDown className="-rotate-90" size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;