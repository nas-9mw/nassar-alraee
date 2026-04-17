import { motion } from 'framer-motion';
import portfolioCta from '@/assets/portfolio-cta.jpg';

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">معرض الأعمال</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="section-title mt-3 text-white">
            أحدث <span className="text-gradient-red">مشاريعي</span>
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="red-line mx-auto mt-5" />
        </div>

        <motion.a
          href="#"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="portfolio-item group block rounded-2xl overflow-hidden glass border border-white/5 relative aspect-[746/328] cursor-pointer"
        >
          <img src={portfolioCta} alt="ملف اعمالي" className="portfolio-img" loading="lazy" />
          <div className="portfolio-overlay">
            <div>
              <h3 className="text-white font-bold text-2xl sm:text-3xl">ملف اعمالي</h3>
              <p className="text-white/70 text-base sm:text-lg mt-2">تصفح ملف اعمالي بالنقر هنا</p>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-0 h-0 group-hover:w-full group-hover:h-0.5 bg-gradient-to-l from-red-500 to-transparent transition-all duration-500" />
          <div className="absolute top-0 right-0 w-0 h-0 group-hover:h-full group-hover:w-0.5 bg-gradient-to-b from-red-500 to-transparent transition-all duration-500 delay-75" />
        </motion.a>
      </div>
    </section>
  );
}
