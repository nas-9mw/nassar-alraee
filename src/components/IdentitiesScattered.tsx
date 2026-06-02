import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import b1 from '@/assets/brands/brand-1.webp';
import b2 from '@/assets/brands/brand-2.webp';
import b3 from '@/assets/brands/brand-3.webp';
import b4 from '@/assets/brands/brand-4.webp';
import b5 from '@/assets/brands/brand-5.webp';
import b6 from '@/assets/brands/brand-6.webp';
import b7 from '@/assets/brands/brand-7.webp';
import b8 from '@/assets/brands/brand-8.webp';
import b9 from '@/assets/brands/brand-9.webp';

const brands = [b1, b2, b3, b4, b5, b6, b7, b8, b9];

export default function IdentitiesScattered() {
  const [open, setOpen] = useState<string | null>(null);
  const segments = [0, 1];

  return (
    <section id="identities" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">العلامات التجارية</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="section-title mt-3 text-white">
            الهويات <span className="text-gradient-red">البصرية</span>
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="red-line mx-auto mt-5" />
          <p className="text-white/60 leading-loose mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            هويات بصرية متكاملة تجسّد روح كل علامة تجارية، من الشعار إلى التفاصيل الدقيقة.
          </p>
        </div>
      </div>

      <div className="overflow-hidden marquee-mask mb-12">
        <div className="marquee-loop marquee-loop-left marquee-loop-identities">
          {segments.map((segment) => (
            <div className="marquee-segment" key={segment} aria-hidden={segment > 0}>
              {brands.map((src, i) => (
                <button
                  key={`${segment}-${i}`}
                  onClick={() => setOpen(src)}
                  className="shrink-0 w-[220px] sm:w-[260px] aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-black/40 group relative"
                >
                  <img
                    src={src}
                    alt="هوية بصرية"
                    loading="lazy"
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-red-500/60 rounded-xl transition-all" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(90vw,480px)] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(220,38,38,0.35)] bg-black"
            >
              <img src={open} alt="هوية بصرية" className="w-full h-full object-cover" />
            </motion.div>
            <button
              onClick={() => setOpen(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 text-white text-2xl flex items-center justify-center transition-colors"
              aria-label="إغلاق"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
