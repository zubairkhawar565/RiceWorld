import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Leaf, Star, ChevronRight, Play, Award, Droplets, Sun, Wind, ShoppingCart, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import axios from 'axios';
import Swal from 'sweetalert2';

// 1. Categories ki working images ka object
const categoryImages = {
  Basmati: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
  Jasmine: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  Brown: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=800&q=80",
  Organic: "https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=800&q=80",
};

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/newsletter/subscribe', { email });
      Swal.fire({
        icon: 'success',
        title: 'Subscribed!',
        text: 'Welcome to the inner circle.',
        confirmButtonColor: '#1a1a1a'
      });
      setEmail('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#1a1a1a'
      });
    } finally {
      setLoading(false);
    }
  };

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

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section - Centered and Modern */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-[#fdfbf7] py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7]/80 via-transparent to-[#fdfbf7]/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Rice Fields" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] sm:text-xs mb-6 block">
              Established 1924
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-8 leading-tight">
              Experience the Purity of <br />
              <span className="text-accent">Authentic Harvest</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-light">
              Sourced from the heart of fertile lands, our premium grains are aged to perfection, bringing the essence of nature to your dining table.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/shop" className="btn-primary px-8 py-4 flex items-center group shadow-lg text-sm uppercase tracking-widest">
                Explore Collection 
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={18} />
              </Link>
              <Link to="/about" className="text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-all border-b border-primary hover:border-accent pb-1">
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Feature Stats Section */}
      <section className="py-20 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: 'Naturally Aged', desc: 'Our grains are aged for 24 months to enhance aroma and texture.' },
              { icon: ShieldCheck, title: 'Sustainable Sourcing', desc: 'Directly from fair-trade farms practicing organic cultivation.' },
              { icon: Truck, title: 'Global Concierge', desc: 'Complimentary white-glove delivery to over 45 countries.' },
            ].map((feature, i) => (
              <div key={i} className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-secondary flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-accent" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-primary">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">From Soil to Soul</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Our Craftsmanship</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Sun, title: 'Sun-Dried', desc: 'Slowly dried under the golden sun to preserve nutrient integrity.' },
              { icon: Droplets, title: 'Pure Water', desc: 'Irrigated with mineral-rich Himalayan glacial meltwater.' },
              { icon: Wind, title: 'Aged 2 Years', desc: 'Meticulously aged to develop the signature aromatic profile.' },
              { icon: Award, title: 'Polished', desc: 'Gentle milling to maintain the perfect grain length and pearl finish.' },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-secondary rounded-sm hover:shadow-xl transition-all duration-500"
              >
                <step.icon size={40} className="text-accent mx-auto mb-6" />
                <h3 className="text-xl font-serif font-bold mb-3 text-primary">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Browse by Category */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Browse by Variety</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.length > 0 ? (
              categories.slice(0, 4).map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/shop?category=${cat.name}`}
                  className="group relative h-64 overflow-hidden rounded-sm"
                >
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all duration-500 z-10" />
                  <img
                    src={categoryImages[cat.name] || "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-6 text-center">
                    <h3 className="text-white font-serif text-xl font-bold uppercase tracking-widest">{cat.name}</h3>
                  </div>
                </Link>
              ))
            ) : (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-secondary animate-pulse rounded-sm" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. The Royal Collection */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">Selected for You</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">The Royal Collection</h2>
            </div>
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-all text-primary">
              View Full Collection
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -10 }}
                  className="bg-white p-4 shadow-sm group border border-gray-50"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-6 relative">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.images?.[0]?.url?.startsWith('http') 
                          ? product.images[0].url 
                          : product.images?.[0]?.url 
                            ? `${window.location.origin}${product.images[0].url}`
                            : 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'} 
                        alt={product.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' }}
                      />
                    </Link>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                    
                    {/* Hover Actions */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                      <button 
                        onClick={() => dispatch(addToCart(product))}
                        className="flex-1 bg-white py-3 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-colors shadow-lg"
                      >
                        <ShoppingCart size={14} />
                        <span>Add</span>
                      </button>
                      <button 
                        onClick={() => dispatch(toggleWishlist(product))}
                        className={`bg-white p-3 shadow-lg transition-all ${
                          wishlistItems.find(item => item.id === product.id)
                            ? 'text-accent'
                            : 'text-gray-400 hover:text-accent'
                        }`}
                      >
                        <Heart size={14} fill={wishlistItems.find(item => item.id === product.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {product.salePrice && (
                      <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                        Special Offer
                      </div>
                    )}
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-2">{product.category?.name}</p>
                    <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-accent transition-colors truncate text-primary">{product.name}</h3>
                    <div className="flex items-center space-x-3">
                      <p className="font-bold text-primary">${product.price}</p>
                      {product.salePrice && <p className="text-gray-400 line-through text-xs font-light">${product.salePrice}</p>}
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-serif italic text-lg">Our harvest is currently being curated. Please check back shortly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Luxury Experience */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images (9).jpg" 
            className="w-full h-full object-cover object-center scale-105"
            alt="Authentic Rice Harvest"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl text-white font-serif font-bold mb-8 leading-tight">
              Harvested with <br /> <span className="text-accent">Respect</span>
            </h2>
            <p className="text-gray-200 text-lg mb-10 leading-relaxed font-light">
              We believe in the harmony between man and nature. Our traditional harvesting methods preserve the soul of the grain, ensuring every bite is a tribute to the earth.
            </p>
            <Link to="/about" className="btn-primary bg-white text-primary hover:bg-accent hover:text-white px-12 border-none uppercase tracking-widest text-xs font-bold shadow-2xl transition-all">
              Our Heritage
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 7. Why Choose Us */}
   <section className="py-24 bg-white overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
      {/* Image Container with Luxury Overlay */}
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/5 rounded-sm z-20 pointer-events-none group-hover:bg-transparent transition-all duration-500" />
        <img 
          src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=1200" 
          alt="Exquisite Rice Grains Premium" 
          className="rounded-sm shadow-2xl relative z-10 w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
        />
        {/* Abstract design elements behind image */}
        <div className="absolute -top-6 -right-6 w-48 h-48 bg-accent/10 rounded-full z-0 blur-xl" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-sm z-0 rotation-45" />
      </div>

      {/* Content Details */}
      <div className="space-y-10">
        <div>
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">Uncompromised Quality</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
            The Luxury of <br /> Choice
          </h2>
        </div>

        <div className="space-y-6">
          {[
            { title: 'Aromatic Profile', desc: 'A scent so distinct it transforms your kitchen into a traditional spice market.' },
            { title: 'Extra Long Grains', desc: 'Our premium Basmati expands up to 2.5x its raw length perfectly upon cooking.' },
            { title: 'Pesticide Free', desc: 'Rigorous 100-point laboratory testing ensuring absolutely zero chemical residue.' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex space-x-6 border-l-2 border-gray-100 pl-8 py-2 hover:border-accent transition-all duration-300 group bg-transparent hover:bg-secondary/30 rounded-r-sm pr-4"
            >
              <div>
                <h4 className="font-serif text-xl font-bold mb-2 text-primary group-hover:text-accent transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 8. Culinary Inspiration */}
      <section className="py-24 bg-[#fcf9f2]">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 md:p-16 flex flex-col md:flex-row items-center gap-16 shadow-2xl">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=1200" 
                alt="Exquisite Saffron Rice" 
                className="w-full aspect-square object-cover rounded-sm shadow-lg"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=800&q=80' }}
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-left">
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs block">Culinary Inspiration</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary leading-tight">Gilded Saffron <br /> Pilaf</h2>
              <p className="text-gray-500 leading-relaxed font-light">
                Elevate your dining experience with our Premium Basmati, paired with hand-picked saffron and roasted pistachios. A recipe designed for those who seek the extraordinary in every meal.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-3">
                  <ChevronRight size={14} className="text-accent" />
                  <span>Preparation: 15 mins</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ChevronRight size={14} className="text-accent" />
                  <span>Cooking: 25 mins</span>
                </li>
              </ul>
              <Link to="/blog/1" className="btn-outline px-10 py-4 uppercase tracking-widest text-xs font-bold mt-4 border-primary text-primary hover:bg-primary hover:text-white transition-all inline-block">
                View Full Recipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Global Certifications */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="text-center">
              <Award size={48} className="mx-auto mb-2 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">ISO 9001:2015</span>
            </div>
            <div className="text-center">
              <ShieldCheck size={48} className="mx-auto mb-2 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">HACCP Certified</span>
            </div>
            <div className="text-center">
              <Leaf size={48} className="mx-auto mb-2 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">USDA Organic</span>
            </div>
            <div className="text-center">
              <Wind size={48} className="mx-auto mb-2 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Non-GMO Project</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Kind Words</span>
          <h2 className="text-4xl font-serif font-bold mb-16 text-primary">Global Appreciation</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'Chef Julian Rossi', role: 'Michelin Star Chef', text: "The texture and length of Premium Rice are unparalleled. It's the only grain I trust for my signature risotto." },
              { name: 'Elena Gilbert', role: 'Food Critic', text: "Rarely do you find a brand that marries luxury with such transparent sustainable practices. A true gem." },
              { name: 'Sarfraz Ahmed', role: 'Restaurateur', text: "Our customers immediately noticed the difference. The aroma alone is enough to bring them back." },
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 shadow-sm border border-gray-50 text-gray-600 relative">
                <p className="mb-6 leading-relaxed font-light">{t.text}</p>
                <div className="not-italic">
                  <p className="font-serif font-bold text-primary">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-accent font-bold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Newsletter */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">Join the Inner Circle</h2>
            <p className="text-gray-400 mb-10 font-light">Receive exclusive offers, gourmet recipes, and early access to our seasonal harvests.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border border-white/20 px-6 py-4 outline-none focus:border-accent transition-colors text-white"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-dark text-white px-10 py-4 uppercase tracking-[0.2em] font-bold text-xs transition-all disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;