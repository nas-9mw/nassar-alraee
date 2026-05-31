import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import w1 from '@/assets/works/work-1.webp';
import w2 from '@/assets/works/work-2.webp';
import w3 from '@/assets/works/work-3.webp';
import w4 from '@/assets/works/work-4.webp';
import w5 from '@/assets/works/work-5.webp';
import w6 from '@/assets/works/work-6.webp';
import w7 from '@/assets/works/work-7.webp';
import w8 from '@/assets/works/work-8.webp';
import w9 from '@/assets/works/work-9.webp';

const all = [w1, w2, w3, w4, w5, w6, w7, w8, w9];
const rowA = [w1, w3, w5, w7, w9];
const rowB = [w2, w4, w6, w8, w1];

function Row({ images, dir }: { images: string[]; dir: 'left' | 'right' }) {
  const [open, setOpen] = useState<string | null>(null);
  const items = [...images, ...images];
  return (
    <>
      <div className="overflow-hidden marquee-mask">
        <div className={`flex gap-4 w-max ${dir === 'left' ? 'marquee-track-left' : 'marquee-track-right'}`}>
          {items.map((src, i) => (
            <button
              key={i}
              onClick={() => setOpen(src)}
              className="shrink-0 w-[180px] sm:w-[220px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-black/40 group relative"
            >
              <img
                src={src}
                alt="عمل"
                loading="lazy"
                className="w-full h-full object-cover brightness-50 saturate-50 group-hover:brightness-100 group-hover:saturate-100 transition-all duration-500"
              />
              <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-red-500/60 rounded-2xl transition-all" />
            </button>
          ))}
        </div>
      </div>
      <Lightbox src={open} onClose={() => setOpen(null)} />
    </>
  );
}

function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            src={src}
            alt="عرض كامل"
            className="max-w-[95vw] max-h-[92vh] object-contain rounded-xl shadow-[0_0_60px_rgba(220,38,38,0.3)]"
          />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 text-white text-2xl flex items-center justify-center transition-colors"
            aria-label="إغلاق"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WorksMarquee() {
  void all;
  return (
    <div className="mt-10 space-y-5">
      <Row images={rowA} dir="left" />
      <Row images={rowB} dir="right" />
    </div>
  );
}
