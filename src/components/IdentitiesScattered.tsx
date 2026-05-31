import { motion } from 'framer-motion';
import b1 from '@/assets/brands/brand-1.webp';
import b2 from '@/assets/brands/brand-2.webp';
import b3 from '@/assets/brands/brand-3.webp';
import b4 from '@/assets/brands/brand-4.webp';
import b5 from '@/assets/brands/brand-5.webp';
import b6 from '@/assets/brands/brand-6.webp';
import b7 from '@/assets/brands/brand-7.webp';
import b8 from '@/assets/brands/brand-8.webp';
import b9 from '@/assets/brands/brand-9.webp';
import b10 from '@/assets/brands/brand-10.webp';

const cards = [
  { src: b1, top: '2%', left: '4%', rot: -6, dur: 7, delay: 0, size: 'w-40 h-40 sm:w-48 sm:h-48' },
  { src: b2, top: '8%', left: '38%', rot: 4, dur: 8, delay: 0.5, size: 'w-44 h-44 sm:w-56 sm:h-56' },
  { src: b3, top: '0%', left: '70%', rot: -3, dur: 6.5, delay: 1, size: 'w-36 h-36 sm:w-44 sm:h-44' },
  { src: b4, top: '38%', left: '0%', rot: 5, dur: 7.5, delay: 1.5, size: 'w-36 h-36 sm:w-44 sm:h-44' },
  { src: b5, top: '42%', left: '28%', rot: -4, dur: 9, delay: 0.2, size: 'w-44 h-44 sm:w-52 sm:h-52' },
  { src: b6, top: '34%', left: '60%', rot: 6, dur: 6.8, delay: 0.8, size: 'w-40 h-40 sm:w-48 sm:h-48' },
  { src: b7, top: '70%', left: '10%', rot: -5, dur: 8.5, delay: 1.2, size: 'w-36 h-36 sm:w-44 sm:h-44' },
  { src: b8, top: '74%', left: '42%', rot: 3, dur: 7.2, delay: 0.6, size: 'w-40 h-40 sm:w-48 sm:h-48' },
  { src: b9, top: '68%', left: '72%', rot: -7, dur: 8.2, delay: 0.3, size: 'w-36 h-36 sm:w-44 sm:h-44' },
  { src: b10, top: '20%', left: '85%', rot: 4, dur: 7.8, delay: 1.4, size: 'w-32 h-32 sm:w-40 sm:h-40 hidden lg:block' },
];

export default function IdentitiesScattered() {
  return (
    <section id="identities" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Right side text (RTL: appears on right via order) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 order-1 lg:order-2 text-right"
          >
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">العلامات التجارية</span>
            <h2 className="section-title mt-3 text-white leading-tight">
              الهويات <br />
              <span className="text-gradient-red">البصرية</span>
            </h2>
            <div className="red-line mt-5 ml-auto" />
            <p className="text-white/60 leading-loose mt-6 text-base sm:text-lg">
              هويات بصرية متكاملة تجسّد روح كل علامة تجارية، من الشعار إلى التفاصيل الدقيقة، بصمة فنية تترك أثراً لا يُنسى.
            </p>
          </motion.div>

          {/* Scattered cards (left side) */}
          <div className="lg:col-span-8 order-2 lg:order-1 relative w-full h-[520px] sm:h-[640px] lg:h-[720px]">
            {cards.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ scale: 1.08, zIndex: 30, rotate: 0 }}
                className={`absolute ${c.size} float-card cursor-pointer`}
                style={
                  {
                    top: c.top,
                    left: c.left,
                    ['--rot' as string]: `${c.rot}deg`,
                    ['--dur' as string]: `${c.dur}s`,
                    ['--delay' as string]: `${c.delay}s`,
                  } as React.CSSProperties
                }
              >
                <div className="relative w-full h-full">
                  <div className="absolute -inset-2 bg-red-600/30 blur-2xl rounded-[2rem] opacity-60" />
                  <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-black/40">
                    <img src={c.src} alt="هوية بصرية" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
