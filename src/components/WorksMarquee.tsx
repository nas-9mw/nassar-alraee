import { type CSSProperties, useState } from 'react';
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

const rowA = [w1, w3, w5, w7, w9, w2];
const rowB = [w4, w6, w8, w1, w5, w3];

function Row({ images, dir, onOpen }: { images: string[]; dir: 'left' | 'right'; onOpen: (src: string) => void }) {
  const segments = Array.from({ length: 6 }, (_, index) => index);
  return (
    <div className="marquee-viewport marquee-mask">
      <div
        className={`marquee-loop ${dir === 'left' ? 'marquee-loop-left' : 'marquee-loop-right'}`}
        style={{ '--marquee-segments': segments.length } as CSSProperties}
      >
        {segments.map((segment) => (
          <div className="marquee-segment" key={segment} aria-hidden={segment > 0}>
            {images.map((src, i) => (
              <button
                key={`${segment}-${i}`}
                onClick={() => onOpen(src)}
                className="shrink-0 w-[300px] sm:w-[360px] aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/40 group relative"
              >
                <img
                  src={src}
                  alt="عمل"
                  loading="lazy"
                  className="w-full h-full object-cover brightness-50 saturate-50 group-hover:brightness-100 group-hover:saturate-100 transition-all duration-500"
                />
                <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-red-500/60 rounded-xl transition-all" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
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
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="mt-10 mb-16 space-y-4 -mx-4 sm:-mx-6 lg:-mx-8">
      <Row images={rowA} dir="left" onOpen={setOpen} />
      <Row images={rowB} dir="right" onOpen={setOpen} />
      <Lightbox src={open} onClose={() => setOpen(null)} />
    </div>
  );
}
