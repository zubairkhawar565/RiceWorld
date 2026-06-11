import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import { User, Mail, Lock, Phone, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, phone, password, confirmPassword } = formData;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/shop');
    }
  }, [user, navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return Swal.fire({ icon: 'error', title: 'Error', text: 'Passwords do not match' });
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, phone, password });
      Swal.fire({ icon: 'success', title: 'Success', text: 'Account created successfully' });
      navigate('/login');
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: error.response?.data?.message || 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-secondary px-4 py-12">
      <div className="max-w-xl w-full bg-white p-10 md:p-16 shadow-2xl rounded-sm border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold mb-2">Join the Elite</h1>
          <p className="text-gray-500 text-sm">Create your account for a premium shopping experience</p>
        </div>

        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Full Name</label>
            <div className="relative">
              <input 
                type="text" 
                name="name"
                value={name}
                onChange={onChange}
                className="w-full border-b border-gray-200 py-3 pl-8 focus:border-accent outline-none transition-colors"
                placeholder="John Doe"
                required
              />
              <User className="absolute left-0 top-3.5 text-gray-300" size={18} />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Email</label>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={onChange}
                className="w-full border-b border-gray-200 py-3 pl-8 focus:border-accent outline-none transition-colors"
                placeholder="john@example.com"
                required
              />
              <Mail className="absolute left-0 top-3.5 text-gray-300" size={18} />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Phone</label>
            <div className="relative">
              <input 
                type="text" 
                name="phone"
                value={phone}
                onChange={onChange}
                className="w-full border-b border-gray-200 py-3 pl-8 focus:border-accent outline-none transition-colors"
                placeholder="+1 234 567 890"
              />
              <Phone className="absolute left-0 top-3.5 text-gray-300" size={18} />
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

          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Confirm</label>
            <div className="relative">
              <input 
                type="password" 
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                className="w-full border-b border-gray-200 py-3 pl-8 focus:border-accent outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-0 top-3.5 text-gray-300" size={18} />
            </div>
          </div>

          <div className="md:col-span-2 pt-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 uppercase tracking-[0.2em] font-bold text-sm hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-accent font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
