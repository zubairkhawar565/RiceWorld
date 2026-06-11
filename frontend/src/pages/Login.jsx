import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { Mail, Lock, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      Swal.fire({ icon: 'error', title: 'Login Failed', text: message });
    }
    if (user) {
      navigate('/shop');
    }
    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-secondary px-4 py-10">
      <div className="max-w-md w-full bg-white p-10 shadow-2xl rounded-sm border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Please enter your details to sign in</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={onChange}
                className="w-full border-b border-gray-200 py-3 pl-8 focus:border-accent outline-none transition-colors"
                placeholder="email@example.com"
                required
              />
              <Mail className="absolute left-0 top-3.5 text-gray-300" size={18} />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Password</label>
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

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox text-accent border-gray-200 rounded-none focus:ring-0" />
              <span className="text-sm text-gray-500">Remember me</span>
            </label>
            <Link to="/forgot-password" name="forgot" className="text-sm text-accent hover:text-accent-dark transition-colors">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 uppercase tracking-[0.2em] font-bold text-sm hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-accent font-bold hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
