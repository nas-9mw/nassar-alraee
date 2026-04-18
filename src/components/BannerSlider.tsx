import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import banner1 from '@/assets/banner-1.png';
import banner2 from '@/assets/banner-2.png';

const banners = [
  { src: banner1, alt: 'تصميم يخليك الخيار الأول مش خيار إضافي' },
  { src: banner2, alt: 'حيا حيا' },
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-4 pb-2 sm:pt-6 sm:pb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[640/160]">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={banners[index].src}
              alt={banners[index].alt}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-contain"
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`الانتقال للبانر ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
