import { motion } from 'framer-motion';
import adidas from '@/assets/logos/adidas.svg';
import apple from '@/assets/logos/apple.svg';
import cnn from '@/assets/logos/cnn.svg';
import kfc from '@/assets/logos/kfc.svg';
import sony from '@/assets/logos/sony.svg';

const logos = [adidas, apple, cnn, kfc, sony];

export default function BrandsMarquee() {
  return (
    <section id="brands" className="py-20 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">شركاء النجاح</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="section-title mt-3 text-white">
            جزء من نجاح هذه <span className="text-gradient-red">العلامات</span>
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="red-line mx-auto mt-5" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-12">
          {logos.map((src, i) => (
            <div key={i} className="flex items-center justify-center group">
              <img
                src={src}
                alt="شعار"
                loading="lazy"
                style={{ width: 50, height: 50 }}
                className="object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
