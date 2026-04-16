import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  { id: 1, title: 'هوية بصرية - مقهى رويال', category: 'هوية بصرية', description: 'تصميم هوية بصرية متكاملة لمقهى فاخر تشمل الشعار والألوان والمطبوعات', image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&h=400&fit=crop&q=80' },
  { id: 2, title: 'حملة إعلانية - متجر أزياء', category: 'تسويق إلكتروني', description: 'إدارة حملة إعلانية على انستقرام وسناب شات لمتجر أزياء نسائية', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80' },
  { id: 3, title: 'تصاميم سوشيال ميديا - مطعم', category: 'تصميم جرافيكي', description: 'تصميم مجموعة منشورات إعلانية لمطعم عربي فاخر على انستقرام', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop&q=80' },
  { id: 4, title: 'استراتيجية تسويق - تطبيق', category: 'استشارات تسويق', description: 'بناء خطة تسويقية متكاملة لإطلاق تطبيق توصيل طعام جديد', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80' },
  { id: 5, title: 'هوية شركة تقنية', category: 'هوية بصرية', description: 'تصميم شعار وهوية بصرية لشركة ناشئة في مجال التقنية', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop&q=80' },
  { id: 6, title: 'حملة تسويق عقاري', category: 'تسويق إلكتروني', description: 'إدارة حملة إعلانية لمجمع سكني فاخر على Google و Meta', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80' },
];

const categories = ['الكل', 'تصميم جرافيكي', 'هوية بصرية', 'تسويق إلكتروني', 'استشارات تسويق'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const filteredProjects = activeCategory === 'الكل' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">معرض الأعمال</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="section-title mt-3 text-white">
            أحدث <span className="text-gradient-red">مشاريعي</span>
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="red-line mx-auto mt-5" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeCategory === cat ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'glass text-white/60 hover:text-white hover:bg-white/10'}`}>
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="portfolio-item group rounded-2xl overflow-hidden glass border border-white/5 relative aspect-[3/2] cursor-pointer">
                <img src={project.image} alt={project.title} className="portfolio-img" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop&q=80'; }} />
                <div className="portfolio-overlay">
                  <div>
                    <span className="inline-block px-3 py-1 bg-red-600/90 text-white text-xs font-semibold rounded-full mb-2">{project.category}</span>
                    <h3 className="text-white font-bold text-lg">{project.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{project.description}</p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-0 h-0 group-hover:w-full group-hover:h-0.5 bg-gradient-to-l from-red-500 to-transparent transition-all duration-500" />
                <div className="absolute top-0 right-0 w-0 h-0 group-hover:h-full group-hover:w-0.5 bg-gradient-to-b from-red-500 to-transparent transition-all duration-500 delay-75" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 glass-card p-12">
            <p className="text-white/40 text-lg">لا توجد مشاريع في هذا القسم حالياً</p>
          </div>
        )}
      </div>
    </section>
  );
}
