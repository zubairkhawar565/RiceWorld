import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Mail,
  LogOut,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Tag,
  TrendingUp,
  BarChart3,
  DollarSign,
  Eye,
  Settings,
  X
} from 'lucide-react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductForm from '../components/ProductForm';
import CategoryForm from '../components/CategoryForm';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [adminProfile, setAdminProfile] = useState({ name: '', email: '', password: '' });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/newsletter', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/admin');
      return;
    }
    fetchProducts();
    fetchCategories();
    fetchOrders();
    fetchUsers();
    if (user) setAdminProfile({ name: user.name, email: user.email, password: '' });
    if (activeTab === 'newsletter') fetchSubscribers();
  }, [user, navigate, activeTab]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This grain will be removed from the vault!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1a1a1a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Deleted!', 'Product has been removed.', 'success');
        fetchProducts();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete product', 'error');
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "All products in this category will lose their association!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1a1a1a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Deleted!', 'Category has been removed.', 'success');
        fetchCategories();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete category', 'error');
      }
    }
  };

  const handleDeleteSubscriber = async (id) => {
    const result = await Swal.fire({
      title: 'Remove Subscriber?',
      text: "This person will no longer receive updates.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1a1a1a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/newsletter/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Removed!', 'Subscriber has been removed.', 'success');
        fetchSubscribers();
      } catch (error) {
        Swal.fire('Error', 'Failed to remove subscriber', 'error');
      }
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire('Updated!', `Order status changed to ${status}`, 'success');
      fetchOrders();
    } catch (error) {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-6 hidden lg:flex flex-col">
        <div className="mb-10 px-2">
          <Link to="/" className="text-xl font-serif font-bold tracking-tighter">
            PREMIUM<span className="text-accent">ADMIN</span>
          </Link>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'categories', label: 'Categories', icon: Tag },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'users', label: 'Customers', icon: Users },
            { id: 'newsletter', label: 'Newsletter', icon: Mail },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium ${
                activeTab === item.id ? 'bg-accent text-white' : 'hover:bg-white/10'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-3 px-4 py-3 text-sm font-medium hover:text-accent transition-colors w-full"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 capitalize">{activeTab}</h1>
            <p className="text-gray-500 text-sm">Manage your premium rice collection and store data.</p>
          </div>
          {activeTab === 'products' && (
            <button 
              onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
              className="btn-primary flex items-center space-x-2 text-xs py-3 px-6"
            >
              <Plus size={18} />
              <span className="uppercase tracking-widest font-bold">Add New Grain</span>
            </button>
          )}
          {activeTab === 'categories' && (
            <button 
              onClick={() => { setEditingCategory(null); setIsCategoryFormOpen(true); }}
              className="btn-primary flex items-center space-x-2 text-xs py-3 px-6"
            >
              <Plus size={18} />
              <span className="uppercase tracking-widest font-bold">Add Category</span>
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: `$${orders.reduce((acc, curr) => acc + Number(curr.totalAmount || 0), 0).toFixed(2)}`, icon: DollarSign, color: 'bg-green-500' },
                { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'bg-blue-500' },
                { label: 'Total Products', value: products.length, icon: Package, color: 'bg-orange-500' },
                { label: 'Active Customers', value: users.length, icon: Users, color: 'bg-purple-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className={`${stat.color} p-3 rounded-sm text-white`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">{stat.label}</p>
                    <p className="text-2xl font-serif font-bold text-primary">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-serif font-bold text-lg">Sales Performance</h3>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <div className="h-64 bg-secondary flex items-end justify-between px-4 pb-4">
                  {[40, 70, 45, 90, 65, 85, 50].map((h, i) => (
                    <div key={i} className="w-8 bg-accent hover:bg-accent-dark transition-all rounded-t-sm cursor-pointer relative group" style={{ height: `${h}%` }}>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Day {i+1}: ${h*12}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                <h3 className="font-serif font-bold text-lg mb-8">Recent Activity</h3>
                <div className="space-y-6">
                  {orders.slice(0, 4).map((order, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                          <ShoppingBag size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">New Order #{order.id}</p>
                          <p className="text-[10px] text-gray-400 uppercase">{order.user?.name}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-primary">${order.totalAmount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => (
                    <tr key={product.id} className="text-sm hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden">
                          <img 
                            src={product.images?.[0]?.url?.startsWith('http') 
                              ? product.images[0].url 
                              : `${window.location.origin}${product.images?.[0]?.url}`} 
                            alt="" 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Rice' }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{product.name}</div>
                        <div className="text-xs text-gray-400 font-mono uppercase">{product.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 text-[10px] uppercase font-bold tracking-tighter">
                          {product.category?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold">${product.price}</div>
                        {product.salePrice && <div className="text-xs text-accent line-through">${product.salePrice}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`font-medium ${product.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                          {product.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => { setEditingProduct(product); setIsFormOpen(true); }}
                            className="p-2 text-gray-400 hover:text-accent transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                          <Link to={`/product/${product.id}`} className="p-2 text-gray-400 hover:text-primary transition-colors">
                            <ExternalLink size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr key={order.id} className="text-sm hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">#{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{order.user?.name}</div>
                        <div className="text-[10px] text-gray-400">{order.user?.email}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-primary">${order.totalAmount}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-[10px] font-bold uppercase py-1 px-2 rounded-full border-none focus:ring-0 cursor-pointer ${
                            order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                            order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                            'bg-accent/10 text-accent'
                          }`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase ${order.paymentStatus === 'PAID' ? 'text-green-500' : 'text-orange-500'}`}>
                          {order.paymentStatus}
                        </span>
                        <div className="text-[10px] text-gray-400">{order.paymentMethod}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => { setSelectedOrder(order); setIsOrderModalOpen(true); }}
                          className="p-2 text-gray-400 hover:text-primary transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <span className="text-gray-400 text-xs ml-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-10 rounded-sm shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-8">Admin Profile Settings</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const token = localStorage.getItem('token');
                await axios.put('/api/auth/profile', adminProfile, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire('Success', 'Profile updated successfully', 'success');
              } catch (error) {
                Swal.fire('Error', 'Failed to update profile', 'error');
              }
            }} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">Display Name</label>
                <input 
                  type="text" 
                  value={adminProfile.name}
                  onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})}
                  className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none"
                  placeholder="Admin Name"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">Email Address</label>
                <input 
                  type="email" 
                  value={adminProfile.email}
                  onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
                  className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none"
                  placeholder="admin@premiumrice.com"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">New Password (leave blank to keep current)</label>
                <input 
                  type="password" 
                  value={adminProfile.password}
                  onChange={(e) => setAdminProfile({...adminProfile, password: e.target.value})}
                  className="w-full border-b border-gray-200 py-3 focus:border-accent outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full py-4 text-xs">Update Credentials</button>
            </form>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Products</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map((cat) => (
                  <tr key={cat.id} className="text-sm hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{cat.name}</td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs uppercase">{cat.slug}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 px-2 py-1 text-[10px] font-bold">
                        {cat.products?.length || 0} Grains
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => { setEditingCategory(cat); setIsCategoryFormOpen(true); }}
                          className="p-2 text-gray-400 hover:text-accent"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Subscriber Email</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="text-sm hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{sub.email}</td>
                    <td className="px-6 py-4 text-gray-400">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteSubscriber(sub.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u.id} className="text-sm hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{u.name}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 text-gray-600">{u.phone || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${u.role === 'ADMIN' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form Modals */}
        {isFormOpen && (
          <ProductForm 
            product={editingProduct} 
            onClose={() => setIsFormOpen(false)} 
            onSuccess={fetchProducts} 
          />
        )}

        {isCategoryFormOpen && (
          <CategoryForm 
            category={editingCategory} 
            onClose={() => setIsCategoryFormOpen(false)} 
            onSuccess={fetchCategories} 
          />
        )}

        {isOrderModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                <div>
                  <h2 className="text-xl font-serif font-bold">Order Details</h2>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Order #{selectedOrder.id}</p>
                </div>
                <button onClick={() => setIsOrderModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-accent mb-4">Customer Info</h3>
                    <p className="text-sm font-bold text-primary">{selectedOrder.user?.name || selectedOrder.guestName || 'Guest'}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.user?.email || selectedOrder.guestEmail}</p>
                    <p className="text-sm text-gray-500 mt-2">{selectedOrder.address}</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-accent mb-4">Order Summary</h3>
                    <p className="text-sm font-bold text-primary">Date: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Payment: {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
                    <p className="text-lg font-bold text-primary mt-2">Total: ${selectedOrder.totalAmount}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-accent mb-4">Items Ordered</h3>
                  <div className="space-y-4">
                    {selectedOrder.orderItems?.map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-sm overflow-hidden">
                            <img 
                              src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/50'} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary">{item.product?.name}</p>
                            <p className="text-xs text-gray-400">Qty: {item.quantity} × ${item.price}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-sm">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-primary mb-4">Internal Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <select 
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                      className="text-xs font-bold uppercase py-2 px-4 border border-gray-200 rounded-sm outline-none focus:border-accent"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                    <button className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-primary underline">Print Invoice</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
