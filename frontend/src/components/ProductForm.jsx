import { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductForm = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    salePrice: '',
    stock: '',
    weight: '',
    categoryId: '',
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    // If editing, populate form
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice || '',
        stock: product.stock,
        weight: product.weight || '',
        categoryId: product.categoryId,
      });
      if (product.images) {
        setImagePreviews(product.images.map(img => img.url));
      }
    }
  }, [product]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'categoryId' || key === 'price' || key === 'salePrice' || key === 'stock') {
        data.append(key, formData[key] === '' ? '' : Number(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    images.forEach(image => {
      data.append('images', image);
    });

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };

      if (product) {
        await axios.put(`/api/products/${product.id}`, data, config);
        Swal.fire('Success', 'Product updated successfully', 'success');
      } else {
        await axios.post('/api/products', data, config);
        Swal.fire('Success', 'Product created successfully', 'success');
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-serif font-bold">{product ? 'Edit Product' : 'Add New Grain'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-8 grid md:grid-cols-2 gap-8">
          {/* Left Column: Details */}
          <div className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Product Name</label>
              <input 
                type="text" name="name" value={formData.name} onChange={onChange}
                className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                placeholder="e.g. Premium Basmati Rice" required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">URL Slug</label>
              <input 
                type="text" name="slug" value={formData.slug} onChange={onChange}
                className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                placeholder="e.g. premium-basmati-rice" required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Description</label>
              <textarea 
                name="description" value={formData.description} onChange={onChange}
                className="w-full border border-gray-200 p-3 h-32 focus:border-accent outline-none transition-colors resize-none"
                placeholder="Tell the story of this grain..." required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Regular Price ($)</label>
                <input 
                  type="number" step="0.01" name="price" value={formData.price} onChange={onChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Sale Price ($)</label>
                <input 
                  type="number" step="0.01" name="salePrice" value={formData.salePrice} onChange={onChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Inventory & Images */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Stock Quantity</label>
                <input 
                  type="number" name="stock" value={formData.stock} onChange={onChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Weight (e.g. 5kg)</label>
                <input 
                  type="text" name="weight" value={formData.weight} onChange={onChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Category</label>
              <select 
                name="categoryId" value={formData.categoryId} onChange={onChange}
                className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none bg-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Product Images (Max 5)</label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square border border-gray-100 group">
                    <img src={preview} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {imagePreviews.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors">
                    <Upload size={24} className="text-gray-300" />
                    <span className="text-[10px] uppercase tracking-tighter mt-2 font-bold text-gray-400">Upload</span>
                    <input type="file" multiple className="hidden" onChange={onImageChange} accept="image/*" />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-4 uppercase tracking-[0.2em] font-bold text-sm hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? 'Processing Grain...' : product ? 'Update Product' : 'Add to Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
