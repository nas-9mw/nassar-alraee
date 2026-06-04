import { useEffect, useState } from 'react';
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
import b1 from '@/assets/brands/brand-1.webp';
import b2 from '@/assets/brands/brand-2.webp';
import b3 from '@/assets/brands/brand-3.webp';
import b4 from '@/assets/brands/brand-4.webp';
import b5 from '@/assets/brands/brand-5.webp';
import b6 from '@/assets/brands/brand-6.webp';
import b7 from '@/assets/brands/brand-7.webp';
import b8 from '@/assets/brands/brand-8.webp';
import b9 from '@/assets/brands/brand-9.webp';
import portfolioCta from '@/assets/portfolio-cta.jpg';

type Item =
  | { kind: 'image'; src: string; ratio: 'landscape' | 'portrait' | 'wide' }
  | { kind: 'link'; src: string; href: string; ratio: 'wide'; label: string };

const worksRowA: Item[] = [w1, w3, w5, w7, w9].map((src) => ({ kind: 'image', src, ratio: 'landscape' }));
const worksRowB: Item[] = [w2, w4, w6, w8, w1].map((src) => ({ kind: 'image', src, ratio: 'landscape' }));

const ctaItem: Item = {
  kind: 'link',
  src: portfolioCta,
  href: 'https://drive.google.com/file/d/1soh5VqdSo-sZTAkrnId0NJIAk7x1yMLA/view?usp=drivesdk',
  ratio: 'wide',
  label: 'ملف اعمالي',
};

const identitiesRowA: Item[] = [
  { kind: 'image', src: b1, ratio: 'portrait' },
  { kind: 'image', src: b2, ratio: 'portrait' },
  ctaItem,
  { kind: 'image', src: b3, ratio: 'portrait' },
  { kind: 'image', src: b4, ratio: 'portrait' },
  { kind: 'image', src: b5, ratio: 'portrait' },
];

const identitiesRowB: Item[] = [
  { kind: 'image', src: b6, ratio: 'portrait' },
  { kind: 'image', src: b7, ratio: 'portrait' },
  { kind: 'image', src: b8, ratio: 'portrait' },
  ctaItem,
  { kind: 'image', src: b9, ratio: 'portrait' },
  { kind: 'image', src: b1, ratio: 'portrait' },
];

function Card({ item, onOpen }: { item: Item; onOpen: (src: string) => void }) {
  const heights =
    item.ratio === 'portrait'
      ? 'h-56 sm:h-72 md:h-80 lg:h-96'
      : 'h-48 sm:h-64 md:h-72 lg:h-80';

  const common =
    'relative shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer ' +
    heights;

  if (item.kind === 'link') {
    return (
      <motion.a
        whileHover={{ scale: 1.04, zIndex: 10 }}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={common + ' group'}
        aria-label={item.label}
      >
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          className="h-full w-auto object-contain brightness-90 group-hover:brightness-110 transition-all duration-500"
        />
        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-right w-full">
            <h3 className="text-white font-bold text-lg sm:text-xl">{item.label}</h3>
            <p className="text-white/70 text-xs sm:text-sm mt-1">اضغط للتصفح</p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-red-500/40" />
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04, zIndex: 10 }}
      onClick={() => onOpen(item.src)}
      className={common}
      aria-label="عرض العمل"
    >
      <img
        src={item.src}
        alt="عمل"
        loading="lazy"
        className="h-full w-auto object-contain brightness-90 hover:brightness-110 transition-all duration-500"
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 hover:ring-2 hover:ring-red-500/60 transition-all" />
    </motion.button>
  );
}

function MarqueeRow({
  items,
  direction,
  duration = 60,
  onOpen,
}: {
  items: Item[];
  direction: 'left' | 'right';
  duration?: number;
  onOpen: (src: string) => void;
}) {
  const loop = [...items, ...items, ...items, ...items];
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
      transition: { duration, repeat: Infinity, ease: 'linear' },
    });
  }, [direction, duration, controls]);

  return (
    <div className="flex overflow-hidden py-3 gap-4">
      <motion.div animate={controls} className="flex gap-4 sm:gap-5 shrink-0">
        {loop.map((item, i) => (
          <Card key={i} item={item} onOpen={onOpen} />
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">معرض الأعمال</span>
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
            مجموعة من أحدث مشاريعي والهويات البصرية بمقاساتها الأصلية، اضغط على أي عمل لعرضه بحجم كامل.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="space-y-4 sm:space-y-6">
            <MarqueeRow items={worksRowA} direction="left" duration={70} onOpen={setOpen} />
            <MarqueeRow items={worksRowB} direction="right" duration={75} onOpen={setOpen} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center mt-20 mb-8">
          <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">العلامات التجارية</span>
          <h2 className="section-title mt-3 text-white">
            الهويات <span className="text-gradient-red">البصرية</span>
          </h2>
          <div className="red-line mx-auto mt-5" />
          <p className="text-white/60 leading-loose mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            هويات بصرية متكاملة تجسّد روح كل علامة تجارية، من الشعار إلى التفاصيل الدقيقة.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="space-y-4 sm:space-y-6">
            <MarqueeRow items={identitiesRowA} direction="left" duration={80} onOpen={setOpen} />
            <MarqueeRow items={identitiesRowB} direction="right" duration={85} onOpen={setOpen} />
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
