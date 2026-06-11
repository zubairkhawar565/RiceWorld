import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { Mail, Lock, Loader2, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      Swal.fire({ icon: 'error', title: 'Access Denied', text: message });
    }
    if (user && user.role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else if (user) {
      Swal.fire({ icon: 'warning', title: 'Unauthorized', text: 'This area is restricted to administrators only.' });
    }
    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="max-w-md w-full bg-white p-10 shadow-2xl rounded-sm border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2 text-primary uppercase tracking-tighter">
            PREMIUM<span className="text-accent">ADMIN</span>
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Secure Access Portal</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">Admin Email</label>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={onChange}
                className="w-full border-b border-gray-200 py-3 pl-8 focus:border-accent outline-none transition-colors"
                placeholder="admin@premiumrice.com"
                required
              />
              <Mail className="absolute left-0 top-3.5 text-gray-300" size={18} />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">Secret Password</label>
            <div className="relative">
              <input 
                type="password" 
                name="password"
                value={password}
                onChange={onChange}
                className="w-full border-b border-gray-200 py-3 pl-8 focus:border-accent outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-0 top-3.5 text-gray-300" size={18} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 uppercase tracking-[0.2em] font-bold text-xs hover:bg-accent transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Authorize Entry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
