import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CategoryForm = ({ category, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
      });
    }
  }, [category]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (category) {
        await axios.put(`/api/categories/${category.id}`, formData, config);
        Swal.fire('Success', 'Category updated successfully', 'success');
      } else {
        await axios.post('/api/categories', formData, config);
        Swal.fire('Success', 'Category created successfully', 'success');
      }
      onSuccess();
      onClose();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-sm shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold">{category ? 'Edit Category' : 'Add New Category'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">Category Name</label>
            <input 
              type="text" name="name" value={formData.name} onChange={onChange}
              className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
              placeholder="e.g. Long Grain Basmati" required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">URL Slug</label>
            <input 
              type="text" name="slug" value={formData.slug} onChange={onChange}
              className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
              placeholder="e.g. long-grain-basmati" required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">Description</label>
            <textarea 
              name="description" value={formData.description} onChange={onChange}
              className="w-full border border-gray-200 p-3 h-24 focus:border-accent outline-none transition-colors resize-none text-sm"
              placeholder="Brief description of this category..."
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-4 uppercase tracking-[0.2em] font-bold text-[10px] hover:bg-accent transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (category ? 'Update Category' : 'Create Category')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
