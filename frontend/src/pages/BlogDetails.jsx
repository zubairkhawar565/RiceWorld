import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, User, Clock } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams();

  // Mock data for the specific blog (In a real app, fetch from API)
  const post = {
    title: "The Art of Aging Basmati Rice",
    content: `
      <p className="mb-6">For centuries, the finest rice has been aged to perfection. Much like a fine wine, Basmati rice develops its signature aroma and elongated grain structure over time. At Premium Rice Estate, we age our grains for a minimum of 24 months in temperature-controlled environments.</p>
      <h3 className="text-2xl font-serif font-bold mb-4">Why Aging Matters</h3>
      <p className="mb-6">During the aging process, the moisture content of the rice decreases. This makes the grains harder and less sticky when cooked. The result is a light, fluffy texture where each grain remains separate—the hallmark of high-quality Basmati.</p>
      <blockquote className="border-l-4 border-accent pl-6 italic my-10 text-xl text-gray-600">
        "Aging is not just a process; it's a commitment to the patience required for true luxury."
      </blockquote>
      <h3 className="text-2xl font-serif font-bold mb-4">The Result on Your Table</h3>
      <p className="mb-6">When you cook aged rice, you'll notice a distinct difference. The grains expand up to 2.5 times their raw length, and the kitchen is filled with a nutty, floral aroma that only time can produce.</p>
    `,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200",
    date: "June 05, 2026",
    author: "Sarfraz Khan",
    readTime: "5 min read",
    category: "Heritage"
  };

  return (
    <div className="bg-secondary min-h-screen pb-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors mb-12">
          <ChevronLeft size={16} />
          <span>Back to Journal</span>
        </Link>

        <article className="bg-white p-8 md:p-16 shadow-2xl rounded-sm border border-gray-100">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 block">{post.category}</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8 leading-tight">{post.title}</h1>
          
          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-12 pb-8 border-b border-gray-100">
            <span className="flex items-center space-x-2">
              <Calendar size={14} className="text-accent" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-2 border-l border-gray-200 pl-6">
              <User size={14} className="text-accent" />
              <span>By {post.author}</span>
            </span>
            <span className="flex items-center space-x-2 border-l border-gray-200 pl-6">
              <Clock size={14} className="text-accent" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <div className="aspect-video overflow-hidden mb-12 rounded-sm shadow-lg">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div 
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center">
            <div className="flex space-x-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Share:</span>
              {/* Social icons could go here */}
            </div>
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors underline decoration-accent decoration-2 underline-offset-8">
              Shop This Grain
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
