import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag, TrendingUp, Clock, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "The Art of Aging Basmati Rice",
      excerpt: "Discover why we age our premium grains for 24 months to achieve the perfect aroma and length.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000",
      date: "June 05, 2026",
      author: "Sarfraz Khan",
      category: "Heritage",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Organic vs. Conventional Farming",
      excerpt: "A deep dive into our sustainable practices and why chemical-free farming is better for your health.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
      date: "May 28, 2026",
      author: "Imran Ahmed",
      category: "Sustainability",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "5 Exotic Rice Recipes for Your Table",
      excerpt: "From Biryani to Risotto, learn how to use our different varieties to create culinary masterpieces.",
      image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=1000",
      date: "May 15, 2026",
      author: "Chef Maria",
      category: "Culinary",
      readTime: "12 min read"
    }
  ];

  return (
    <div className="bg-secondary min-h-screen pb-24">
      {/* 1. Header Section */}
      <div className="bg-white py-24 border-b border-gray-100 mb-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The Grain Journal</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">Insights, Culture & Culinary Arts</h1>
          <p className="text-gray-500 font-light leading-relaxed">
            Exploring the rich history and future of the world's most important grain. From farm-to-table stories to masterclass recipes.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* 2. Sidebar (NEW) */}
          <aside className="lg:col-span-1 space-y-12">
            {/* Search */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary border-b border-gray-100 pb-2">Search Journal</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Keywords..."
                  className="w-full bg-secondary border-none py-3 px-4 pl-10 focus:ring-1 focus:ring-accent text-sm"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary border-b border-gray-100 pb-2">Categories</h3>
              <ul className="space-y-3">
                {['Heritage', 'Sustainability', 'Culinary', 'Health', 'Farming'].map(cat => (
                  <li key={cat}>
                    <button className="flex items-center justify-between w-full text-sm text-gray-500 hover:text-accent transition-colors group">
                      <span className="group-hover:translate-x-1 transition-transform">{cat}</span>
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trending Posts */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-primary border-b border-gray-100 pb-2 flex items-center">
                <TrendingUp size={14} className="mr-2 text-accent" />
                Trending
              </h3>
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <div key={i} className="group cursor-pointer">
                    <h4 className="text-sm font-bold text-primary mb-1 group-hover:text-accent transition-colors line-clamp-2">The Secret to Perfect Fluffy Rice Every Time</h4>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">May 20, 2026</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* 3. Main Blog Feed */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {posts.map((post, i) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">
                      <span className="flex items-center space-x-1">
                        <Calendar size={12} className="text-accent" />
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center space-x-1 border-l border-gray-200 pl-4">
                        <Clock size={12} className="text-accent" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                    <h2 className="text-2xl font-serif font-bold mb-4 text-primary group-hover:text-accent transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">
                      {post.excerpt}
                    </p>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors border-b border-gray-100 pb-1">
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* 4. Pagination (NEW) */}
            <div className="mt-16 flex justify-center items-center space-x-4">
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent transition-all">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button className="w-10 h-10 bg-primary text-white flex items-center justify-center text-xs font-bold">1</button>
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 hover:border-accent hover:text-accent transition-all">2</button>
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Featured Video Section (NEW) */}
      <section className="mt-24 py-24 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 space-y-8">
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs block">Visual Stories</span>
              <h2 className="text-4xl font-serif font-bold leading-tight">The Harvest: A Cinematic <br /> Journey</h2>
              <p className="text-gray-400 font-light leading-relaxed">
                Step into the fields and witness the meticulous care that goes into every grain of Premium Rice. From the early morning dew to the final quality inspection.
              </p>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-primary px-10">Explore Documentary</button>
            </div>
            <div className="w-full md:w-1/2 relative group cursor-pointer">
              <div className="aspect-video bg-gray-800 rounded-sm overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Video Cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-accent group-hover:border-accent transition-all">
                    <Play size={24} fill="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter Integration */}
      <section className="container mx-auto px-4 mt-24">
        <div className="bg-accent/5 p-12 md:p-20 text-center border border-accent/10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Stay Inspired</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10 font-light">
            Subscribe to receive our latest culinary tips, heritage stories, and exclusive harvest updates directly in your inbox.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input type="email" placeholder="Email Address" className="flex-1 bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
            <button className="btn-primary py-4 px-10">Join</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;
