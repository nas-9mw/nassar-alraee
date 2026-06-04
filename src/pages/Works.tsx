import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParallaxBackground from '@/components/ParallaxBackground';
import w1 from '@/assets/works/work-1.webp';
import w2 from '@/assets/works/work-2.webp';
import w3 from '@/assets/works/work-3.webp';
import w4 from '@/assets/works/work-4.webp';
import w5 from '@/assets/works/work-5.webp';
import w6 from '@/assets/works/work-6.webp';
import w7 from '@/assets/works/work-7.webp';
import w8 from '@/assets/works/work-8.webp';
import w9 from '@/assets/works/work-9.webp';

const rowA = [w1, w3, w5, w7, w9];
const rowB = [w2, w4, w6, w8, w1];

function MarqueeRow({
  images,
  direction,
  onOpen,
}: {
  images: string[];
  direction: 'left' | 'right';
  onOpen: (src: string) => void;
}) {
  const loop = [...images, ...images, ...images, ...images];
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      controls.stop();
    } else {
      controls.start({
        x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        transition: { duration: 60, repeat: Infinity, ease: 'linear' },
      });
    }
  }, [paused, direction, controls]);

  return (
    <div
      className="flex overflow-hidden py-3 gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div animate={controls} className="flex gap-4 sm:gap-5 shrink-0">
        {loop.map((img, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.04, zIndex: 10 }}
            onClick={() => onOpen(img)}
            className="relative shrink-0 h-48 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer"
            aria-label="عرض العمل"
          >
            <img
              src={img}
              alt="عمل"
              loading="lazy"
              className="h-full w-auto object-contain brightness-90 hover:brightness-110 transition-all duration-500"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 hover:ring-2 hover:ring-red-500/60 transition-all" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

export default function WorksPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div dir="rtl" className="min-h-screen relative" style={{ backgroundColor: '#050505' }}>
      <ParallaxBackground />
      <Navbar />

      <main className="pt-32 pb-20 relative">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">
              معرض الأعمال
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-title mt-3 text-white"
          >
            <span className="text-gradient-red">أعمالي</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="red-line mx-auto mt-5"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/70 mt-6 max-w-2xl mx-auto"
          >
            مجموعة من أحدث مشاريعي بمقاساتها الأصلية، مرّر بالماوس فوق الشريط لإيقاف الحركة، واضغط على أي عمل لعرضه بحجم كامل.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="space-y-4 sm:space-y-6">
            <MarqueeRow images={rowA} direction="left" onOpen={setOpen} />
            <MarqueeRow images={rowB} direction="right" onOpen={setOpen} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 mt-16 text-center">
          <Link to="/#contact" className="btn-primary inline-flex items-center gap-2">
            ابدأ مشروعك الآن
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
              aria-label="إغلاق"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={open}
              alt="عرض كامل"
              className="max-w-[96vw] max-h-[92vh] object-contain rounded-xl shadow-[0_0_60px_rgba(220,38,38,0.3)] border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
