import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="bg-white p-16 text-center shadow-xl border border-gray-100 max-w-md w-full">
          <Heart size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-3xl font-serif font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-8 text-sm">Save your favorite premium grains here to purchase them later.</p>
          <Link to="/shop" className="btn-primary block">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen pb-24">
      <div className="bg-white py-20 border-b border-gray-100 mb-16 text-center">
        <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Personal Vault</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold">My Wishlist</h1>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <motion.div 
              key={product.id}
              layout
              className="bg-white p-4 shadow-sm group border border-gray-50 flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-6 relative">
                <img 
                  src={product.images?.[0]?.url?.startsWith('http') 
                    ? product.images[0].url 
                    : `${window.location.origin}${product.images?.[0]?.url}`} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <button 
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                  className="absolute top-4 right-4 bg-white/90 p-2 text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="flex-grow">
                <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-2">{product.category?.name}</p>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-accent transition-colors truncate">{product.name}</h3>
                <p className="font-bold text-primary mb-6">${product.price}</p>
              </div>

              <button 
                onClick={() => dispatch(addToCart(product))}
                className="w-full btn-primary flex items-center justify-center space-x-3 py-4 text-xs font-bold uppercase tracking-widest"
              >
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
