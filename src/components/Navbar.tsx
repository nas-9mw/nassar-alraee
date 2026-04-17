import { useState, useEffect } from 'react';

const navLinks = [
  { id: 'hero', label: 'الرئيسية' },
  { id: 'services', label: 'خدماتي' },
  { id: 'portfolio', label: 'أعمالي' },
  { id: 'contact', label: 'تواصل' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg shadow-black/20 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center group" aria-label="نصار الراعي">
            <div className="w-7 h-7 rounded-lg bg-gradient-red flex items-center justify-center shadow-md shadow-red-900/50 group-hover:shadow-red-700/60 transition-shadow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9"/>
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`nav-link ${activeSection === link.id ? 'active' : ''}`}>
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="btn-primary text-sm !py-2.5 !px-6">
              ابدأ مشروعك
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex flex-col gap-1 p-1.5" aria-label="القائمة">
            <span className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-500 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass-strong mt-3 mx-4 rounded-2xl p-6 space-y-1">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className={`block w-full text-right py-3 px-4 rounded-xl font-semibold transition-all ${activeSection === link.id ? 'text-red-400 bg-red-500/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')} className="w-full btn-primary mt-4 !py-3">
            ابدأ مشروعك
          </button>
        </div>
      </div>
    </nav>
  );
}
