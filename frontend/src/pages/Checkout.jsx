import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, ShoppingBag } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { clearCart } from '../features/cart/cartSlice';

const Checkout = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: 'Pakistan',
    paymentMethod: 'COD'
  });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        address: `${formData.address}, ${formData.city}, ${formData.country}`,
        paymentMethod: formData.paymentMethod,
        totalAmount: totalAmount,
        guestEmail: !user ? formData.email : undefined,
        guestName: !user ? `${formData.firstName} ${formData.lastName}` : undefined
      };

      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      };

      const { data } = await axios.post('/api/orders', orderData, config);
      
      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: `Your order #${data.id} has been received.`,
        confirmButtonColor: '#1a1a1a'
      });

      dispatch(clearCart());
      navigate('/dashboard/orders');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to place order', 'error');
    }
  };

  if (cartItems.length === 0) {
    navigate('/shop');
    return null;
  }

  return (
    <div className="bg-secondary min-h-screen pb-24">
      <div className="bg-white py-16 border-b border-gray-100 mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold mb-2">Secure Checkout</h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase">Completing Your Premium Selection</p>
      </div>

      <div className="container mx-auto px-4">
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-12">
          {/* Billing Details */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif font-bold mb-8 flex items-center">
                <span className="w-8 h-8 bg-primary text-white text-xs flex items-center justify-center rounded-full mr-4">01</span>
                Shipping Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">First Name</label>
                  <input type="text" name="firstName" required onChange={onChange} className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Last Name</label>
                  <input type="text" name="lastName" required onChange={onChange} className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Email Address</label>
                  <input type="email" name="email" value={formData.email} required onChange={onChange} className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Shipping Address</label>
                  <input type="text" name="address" required onChange={onChange} className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none" placeholder="Street address, apartment, suite, etc." />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">City</label>
                  <input type="text" name="city" required onChange={onChange} className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Phone Number</label>
                  <input type="tel" name="phone" required onChange={onChange} className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none" />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif font-bold mb-8 flex items-center">
                <span className="w-8 h-8 bg-primary text-white text-xs flex items-center justify-center rounded-full mr-4">02</span>
                Payment Method
              </h2>
              
              <div className="space-y-4">
                {[
                  { id: 'COD', label: 'Cash on Delivery', icon: Truck },
                  { id: 'Stripe', label: 'Credit Card (Stripe)', icon: CreditCard },
                  { id: 'PayPal', label: 'PayPal Express', icon: ShoppingBag }
                ].map((method) => (
                  <label key={method.id} className={`flex items-center justify-between p-6 border cursor-pointer transition-all ${formData.paymentMethod === method.id ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method.id} 
                        checked={formData.paymentMethod === method.id}
                        onChange={onChange}
                        className="w-4 h-4 text-accent focus:ring-0 mr-4"
                      />
                      <span className="font-bold text-sm uppercase tracking-wider">{method.label}</span>
                    </div>
                    <method.icon className={formData.paymentMethod === method.id ? 'text-accent' : 'text-gray-300'} size={24} />
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-white p-8 md:p-10 shadow-2xl sticky top-24">
              <h2 className="text-xl font-serif font-bold mb-8 border-b border-white/10 pb-4">Your Order</h2>
              
              <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-accent">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-accent font-bold uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <span className="font-serif font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold text-accent">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-accent hover:bg-accent-dark text-white py-5 uppercase tracking-[0.2em] font-bold text-sm transition-all flex items-center justify-center space-x-3"
              >
                <ShieldCheck size={20} />
                <span>Authorize Payment</span>
              </button>
              
              <p className="text-[10px] text-center mt-6 text-gray-500 uppercase tracking-widest">
                SSL Encrypted & Secure Transaction
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
