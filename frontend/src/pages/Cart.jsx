import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { removeFromCart, addToCart, clearCart } from '../features/cart/cartSlice';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="bg-white p-12 text-center shadow-xl border border-gray-100 max-w-md w-full">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added any of our premium grains yet.</p>
          <Link to="/shop" className="btn-primary block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen pb-24">
      <div className="bg-white py-16 border-b border-gray-100 mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold mb-2">Shopping Cart</h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase">Secure Checkout Process</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 flex items-center shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-gray-50 overflow-hidden flex-shrink-0">
                  <img src={item.images?.[0]?.url} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider">{item.weight || '5kg'}</p>
                  <div className="flex justify-between items-end">
                    <div className="flex border border-gray-100 text-sm">
                      <button className="px-3 py-1 hover:bg-gray-50">-</button>
                      <span className="px-4 py-1 border-x border-gray-100 font-bold">{item.quantity}</span>
                      <button className="px-3 py-1 hover:bg-gray-50">+</button>
                    </div>
                    <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => dispatch(clearCart())}
              className="text-gray-400 text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors"
            >
              Clear Shopping Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-2xl border border-gray-100 sticky top-24">
              <h2 className="text-xl font-serif font-bold mb-6 pb-4 border-b border-gray-50">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxes</span>
                  <span className="font-bold text-gray-300">Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-gray-50 flex justify-between">
                  <span className="font-serif font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-accent-dark">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link to="/checkout" className="btn-primary w-full flex items-center justify-center space-x-2 py-4">
                  <span>Checkout Now</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/shop" className="block text-center text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 flex justify-center space-x-4 opacity-30 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
