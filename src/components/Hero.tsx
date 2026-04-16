import { useEffect, useState } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'أحوّل أفكارك إلى تصاميم تُباع';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 right-10 w-px h-32 bg-gradient-to-b from-red-500/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-px h-32 bg-gradient-to-t from-red-500/30 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="fade-up inline-flex items-center gap-2 glass-red px-5 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-red-500 rounded-full glow-pulse" />
          <span className="text-sm font-semibold text-red-300">متاح لمشاريع جديدة</span>
        </div>

        <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
          <span className="text-white">مرحباً، أنا</span>
          <br />
          <span className="text-gradient-red text-glow">نصّار</span>
        </h1>

        <p className="fade-up fade-up-delay-2 text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-4 font-light">
          مصمم جرافيكي ومُسوّق إبداعي
        </p>
        <p className="fade-up fade-up-delay-3 text-base sm:text-lg text-red-400/80 max-w-xl mx-auto mb-10 font-medium" dir="rtl">
          {typedText}
          <span className="animate-pulse text-red-500">|</span>
        </p>

        <div className="fade-up fade-up-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={scrollToContact} className="btn-primary text-lg !px-10 !py-4">
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              تواصل معي
            </span>
          </button>
          <button onClick={scrollToPortfolio} className="btn-outline text-lg !px-10 !py-4">
            <span className="flex items-center gap-2">
              استكشف أعمالي
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 10 20 15 15 20"/>
                <path d="M4 4v16"/>
              </svg>
            </span>
          </button>
        </div>

        <div className="fade-up fade-up-delay-5 mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: '+150', label: 'مشروع منجز' },
            { value: '+80', label: 'عميل سعيد' },
            { value: '+7', label: 'سنوات خبرة' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-gradient-red">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-white/40">اسحب للأسفل</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-red-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
