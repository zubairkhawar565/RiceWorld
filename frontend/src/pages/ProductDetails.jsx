import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Star, ChevronLeft } from 'lucide-react';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const isInWishlist = product && wishlistItems.find(item => item.id === product.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-serif text-2xl">Refining the grain...</div>;
  if (!product) return <div className="p-20 text-center">Product not found</div>;

  return (
    <div className="bg-secondary min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors mb-8">
          <ChevronLeft size={16} />
          <span>Back to Collection</span>
        </Link>
        <div className="grid md:grid-cols-2 gap-16 bg-white p-8 md:p-16 shadow-2xl rounded-sm border border-gray-100">
          
          {/* Gallery */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-50 overflow-hidden rounded-sm">
              <img 
                src={product.images?.[activeImage]?.url?.startsWith('http')
                  ? product.images[activeImage].url
                  : product.images?.[activeImage]?.url
                    ? `${window.location.origin}${product.images[activeImage].url}`
                    : 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000'} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=Premium+Rice' }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square border-2 transition-colors ${activeImage === i ? 'border-accent' : 'border-transparent'}`}
                >
                  <img 
                    src={img.url?.startsWith('http') ? img.url : `${window.location.origin}${img.url}`} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Rice' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-accent font-bold tracking-widest text-xs uppercase mb-2 block">
                {product.category?.name}
              </span>
              <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-accent">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill={i <= 4 ? "currentColor" : "none"} />)}
                </div>
                <span className="text-sm text-gray-400">(24 Reviews)</span>
              </div>
              <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>
             <p className="text-gray-600 leading-relaxed mb-8 break-words whitespace-normal overflow-hidden">
  {product.description}
</p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-4">
                <div className="flex border border-gray-200">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-200 font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => dispatch(addToCart({ ...product, quantity }))}
                  className="flex-1 btn-primary flex items-center justify-center space-x-3 py-4"
                >
                  <ShoppingCart size={20} />
                  <span className="uppercase tracking-widest text-sm font-bold">Add to Cart</span>
                </button>
                <button 
                  onClick={() => dispatch(toggleWishlist(product))}
                  className={`p-4 border transition-all ${
                    isInWishlist 
                      ? 'bg-accent text-white border-accent' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <ShieldCheck className="text-accent" size={20} />
                <span>100% Quality Assurance & Lab Tested</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="text-accent" size={20} />
                <span>Global Express Shipping (3-5 Days)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RotateCcw className="text-accent" size={20} />
                <span>Easy 30-Day Returns & Exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
