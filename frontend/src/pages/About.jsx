import { motion } from 'framer-motion';
import { Award, Globe, Leaf, Users, ShieldCheck, Heart, Droplets, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-secondary min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Rice Fields"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-bold tracking-[0.4em] uppercase text-sm mb-4 block"
          >
            Since 1924
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white font-bold mb-6"
          >
            Our Heritage
          </motion.h1>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">A Century of Excellence</span>
              <h2 className="text-4xl font-serif font-bold mb-8 text-primary">Nurturing Grains for Generations</h2>
              <p className="text-gray-600 leading-relaxed mb-6 font-light">
                Founded in the fertile valleys of Punjab in 1924, Premium Rice began as a small family-owned estate dedicated to preserving the ancient art of grain cultivation. Over the decades, we have evolved into a global symbol of luxury and quality.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                Our mission has always been simple: to bring the finest, most aromatic, and sustainably harvested rice from our fields to your table. Every grain tells a story of tradition, hard work, and a commitment to nature.
              </p>
            </motion.div>
        <div className="grid grid-cols-2 gap-6">
  <img
    src="https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80"
    className="rounded-sm shadow-2xl mt-12 h-80 w-full object-cover"
    alt="Premium Basmati Rice"
  />

  <img
    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
    className="rounded-sm shadow-2xl h-80 w-full object-cover"
    alt="Rice Grains"
  />
</div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (NEW) */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary">The Pillars of Our Estate</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'Uncompromising Quality', desc: 'Every batch undergoes 100+ quality checks to ensure the highest purity and length.' },
              { icon: Heart, title: 'Family Legacy', desc: 'Our family heritage drives us to maintain the same passion for excellence established 100 years ago.' },
              { icon: Leaf, title: 'Sustainable Future', desc: 'We employ eco-friendly farming practices to protect the soil for future generations.' },
            ].map((value, i) => (
              <div key={i} className="bg-white p-12 text-center shadow-sm hover:shadow-xl transition-all duration-500">
                <value.icon size={40} className="text-accent mx-auto mb-6" />
                <h3 className="text-xl font-serif font-bold mb-4 text-primary">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats/Impact */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img src="https://www.toptal.com/designers/subtlepatterns/uploads/ricepaper.png" alt="" className="w-full h-full object-repeat" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: Globe, label: 'Countries Exported', value: '45+' },
              { icon: Droplets, label: 'Liters Water Saved', value: '1.2B' },
              { icon: Users, label: 'Local Farmers', value: '5,000+' },
              { icon: Award, label: 'Global Awards', value: '32' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon size={32} className="mx-auto text-accent mb-4" />
                <h3 className="text-4xl font-bold mb-1 text-white">{stat.value}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Global Presence (NEW) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-bold text-primary">From Himalayan Foothills <br /> to the World</h2>
              <p className="text-gray-600 leading-relaxed font-light">
                Our distribution network spans across continents, bringing the authentic taste of premium rice to gourmet kitchens in London, Paris, New York, and Dubai.
              </p>
              <div className="space-y-4">
                {[
                  { region: 'Europe', hubs: 'London, Paris, Berlin' },
                  { region: 'Middle East', hubs: 'Dubai, Riyadh, Doha' },
                  { region: 'North America', hubs: 'New York, Toronto, Los Angeles' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                    <MapPin size={16} className="text-accent" />
                    <div>
                      <span className="font-bold text-sm text-primary uppercase tracking-widest">{item.region}:</span>
                      <span className="ml-2 text-sm text-gray-500">{item.hubs}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?auto=format&fit=crop&q=80&w=1000" alt="Global Map Placeholder" className="rounded-sm shadow-2xl brightness-90" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Timeline */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary">Our Centennial Journey</h2>
          </div>
          <div className="space-y-12">
            {[
              { year: '1924', title: 'The Foundation', desc: 'Started with 50 acres of Basmati fields in the heart of Punjab.' },
              { year: '1960', title: 'Modernization', desc: 'Introduced advanced milling technology to preserve grain integrity.' },
              { year: '1995', title: 'Global Reach', desc: 'First international export to luxury boutiques in Europe.' },
              { year: '2024', title: 'The Century Milestone', desc: 'Celebrating 100 years of defining luxury in the world of grains.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-12 items-start group">
                <div className="text-3xl font-serif font-bold text-accent pt-1 group-hover:scale-110 transition-transform duration-300">{item.year}</div>
                <div className="flex-1 pb-8 border-b border-gray-200">
                  <h4 className="text-xl font-bold mb-2 text-primary uppercase tracking-widest">{item.title}</h4>
                  <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call to Action */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-serif font-bold text-primary italic">"A legacy of taste, a commitment to purity."</h2>
            <p className="text-gray-400 uppercase tracking-[0.3em] text-xs font-bold">— The Khan Family, Founders</p>
            <div className="pt-8">
              <Link to="/shop" className="btn-primary px-12 py-5 uppercase tracking-widest text-xs">Experience the Collection</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
