import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, User, Heart, Search, Menu, LogOut, ShieldCheck } from 'lucide-react';
import { logout } from '../features/auth/authSlice';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'The Collection', path: '/shop' },
    { name: 'Our Story', path: '/about' },
    { name: 'Blogs', path: '/blog' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold tracking-tighter text-primary">
            PREMIUM<span className="text-accent">RICE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors ${
                location.pathname === link.path ? 'text-accent border-b border-accent pb-1' : 'text-gray-500 hover:text-accent'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user?.role === 'ADMIN' && (
            <Link 
              to="/admin" 
              className={`flex items-center space-x-1 transition-colors ${
                location.pathname.startsWith('/admin') ? 'text-accent' : 'text-accent/70 hover:text-accent'
              }`}
            >
              <ShieldCheck size={14} />
              <span>Vault</span>
            </Link>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="hidden sm:block hover:text-accent transition-colors">
            <Search size={18} />
          </button>
          
          <div className="group relative">
            <Link to={user ? "/dashboard" : "/login"} className="hover:text-accent transition-colors block">
              <User size={18} />
            </Link>
            {user && (
              <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white shadow-2xl border border-gray-100 p-6 w-48 rounded-sm">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-300 mb-4">Account</p>
                  <ul className="space-y-3 text-sm font-medium">
                    {user?.role === 'ADMIN' && (
                      <li><Link to="/admin" className="text-accent flex items-center space-x-2 hover:opacity-70">
                        <ShieldCheck size={14} />
                        <span>Admin Vault</span>
                      </Link></li>
                    )}
                    <li><Link to="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
                    <li><Link to="/dashboard/orders" className="hover:text-accent transition-colors">My Orders</Link></li>
                    <li className="pt-3 border-t border-gray-50">
                      <button onClick={onLogout} className="text-red-500 flex items-center space-x-2 hover:opacity-70">
                        <LogOut size={14} />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link to="/wishlist" className="hidden sm:block hover:text-accent transition-colors relative">
            <Heart size={18} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="hover:text-accent transition-colors relative">
            <ShoppingBag size={18} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalQuantity}
              </span>
            )}
          </Link>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hover:text-accent transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 p-6 space-y-4 text-xs font-bold uppercase tracking-widest text-center">
          <Link to="/" className="block py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="block py-2" onClick={() => setIsMenuOpen(false)}>The Collection</Link>
          <Link to="/about" className="block py-2" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
          <Link to="/blog" className="block py-2" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="block py-2 text-accent" onClick={() => setIsMenuOpen(false)}>Vault (Admin)</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
