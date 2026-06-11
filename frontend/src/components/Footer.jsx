import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/newsletter/subscribe', { email });
      Swal.fire({
        icon: 'success',
        title: 'Subscribed!',
        text: 'Thank you for joining our exclusive circle.',
        confirmButtonColor: '#1a1a1a'
      });
      setEmail('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Subscription Failed',
        text: error.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#1a1a1a'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        {/* <div className="mb-20 pb-20 border-b border-white/10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4 tracking-tight">Join The Harvest</h2>
          <p className="text-gray-400 text-sm mb-8 uppercase tracking-widest">Receive exclusive insights into our seasonal yields and special collections.</p>
          <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/20 py-4 px-6 text-sm outline-none focus:border-accent transition-colors"
              required
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-accent hover:bg-accent-dark text-white px-6 flex items-center transition-all disabled:opacity-50"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest mr-2">Join</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-serif font-bold tracking-tighter">
              PREMIUM<span className="text-accent">RICE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sourcing the world's most exquisite grains since 1924. Our commitment to quality and sustainability ensures every meal is a masterpiece.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-accent">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All Grains</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">The Grain Journal</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Get In Touch</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-accent">Customer Care</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-accent">The Estate</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-accent" />
                <span>123 Harvest Avenue, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-accent" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-accent" />
                <span>concierge@premiumrice.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
          <p>© 2026 Premium Rice Estate. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
