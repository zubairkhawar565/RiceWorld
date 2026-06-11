import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { logout } from '../features/auth/authSlice';
import axios from 'axios';

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User, path: '/dashboard' },
    { id: 'orders', label: 'Order History', icon: ShoppingBag, path: '/dashboard/orders' },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart, path: '/dashboard/wishlist' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  // Add Admin Panel link for admin users
  if (user?.role === 'ADMIN') {
    menuItems.unshift({ id: 'admin', label: 'Admin Vault', icon: ShieldCheck, path: '/admin' });
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="text-center mb-10 pb-10 border-b border-gray-50">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-serif font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <h2 className="text-xl font-serif font-bold">{user?.name}</h2>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">{user?.role}</p>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-sm transition-all text-sm font-medium ${
                      location.pathname === item.path 
                        ? 'bg-primary text-white' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={14} className={location.pathname === item.path ? 'opacity-100' : 'opacity-0'} />
                  </Link>
                ))}
                
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-sm text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-6"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<ProfileOverview user={user} />} />
              <Route path="/orders" element={<OrderHistory token={token} />} />
              <Route path="/wishlist" element={<div className="bg-white p-12 text-center">Your wishlist is currently empty.</div>} />
              <Route path="/settings" element={<div className="bg-white p-12 text-center">Security settings coming soon.</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

const ProfileOverview = ({ user }) => (
  <div className="space-y-8">
    <div className="bg-white p-10 shadow-sm border border-gray-100">
      <h3 className="text-2xl font-serif font-bold mb-8">Personal Information</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Full Name</p>
          <p className="text-lg font-medium">{user?.name}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Email Address</p>
          <p className="text-lg font-medium">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Phone</p>
          <p className="text-lg font-medium">{user?.phone || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Member Since</p>
          <p className="text-lg font-medium">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
        </div>
      </div>
      <button className="mt-10 btn-outline py-2 px-6 text-xs uppercase tracking-widest font-bold">Edit Profile</button>
    </div>
  </div>
);

const OrderHistory = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'DELIVERED': return <CheckCircle size={16} className="text-green-500" />;
      case 'CANCELLED': return <XCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-accent" />;
    }
  };

  if (loading) return <div className="bg-white p-20 text-center animate-pulse">Loading your order history...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-serif font-bold mb-6">Recent Orders</h3>
      {orders.length === 0 ? (
        <div className="bg-white p-12 text-center border border-dashed border-gray-200">
          <Package size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Link to="/shop" className="text-accent font-bold mt-2 inline-block">Explore Our Grains</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap justify-between items-center mb-4 gap-4 pb-4 border-b border-gray-50">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Order #{order.id}</span>
                  <div className="flex items-center space-x-1 px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {order.orderItems?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="w-10 h-10 border-2 border-white bg-gray-100 rounded-sm overflow-hidden">
                      <img src={item.product?.images?.[0]?.url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {order.orderItems?.length > 3 && (
                    <div className="w-10 h-10 border-2 border-white bg-gray-100 rounded-sm flex items-center justify-center text-[10px] font-bold text-gray-400">
                      +{order.orderItems.length - 3}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Total Amount</p>
                  <p className="text-lg font-bold text-primary">${order.totalAmount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
