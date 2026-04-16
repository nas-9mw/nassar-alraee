import { motion } from 'framer-motion';

const services = [
  {
    title: 'تصميم جرافيكي',
    description: 'تصاميم إبداعية تجذب الانتباه وتحقق أهدافك التسويقية. من المنشورات إلى المطبوعات، أصنع تصاميم تترك أثراً.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="6" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
        <circle cx="18" cy="18" r="5" fill="#dc2626" opacity="0.6"/>
        <path d="M6 32l10-10 8 8 6-6 12 12" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="30" y="14" width="8" height="8" rx="2" fill="#dc2626" opacity="0.3"/>
      </svg>
    ),
  },
  {
    title: 'هويات بصرية',
    description: 'أبني هوية بصرية متكاملة تعكس قيم علامتك التجارية وتميزك عن المنافسين. شعارات، ألوان، خطوط، ودليل استخدام.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
        <path d="M6 14l18 10 18-10" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 24v20" stroke="#dc2626" strokeWidth="2"/>
        <circle cx="24" cy="24" r="4" fill="#dc2626" opacity="0.6"/>
        <circle cx="24" cy="24" r="1.5" fill="#dc2626"/>
      </svg>
    ),
  },
  {
    title: 'استشارات تسويق',
    description: 'أقدم لك استراتيجيات تسويقية مخصصة بناءً على تحليل السوق والمنافسين. خطط عمل واضحة ومقاييس أداء دقيقة.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
        <path d="M16 28l6-8 5 5 5-9" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="28" r="2" fill="#dc2626"/>
        <circle cx="22" cy="20" r="2" fill="#dc2626"/>
        <circle cx="27" cy="25" r="2" fill="#dc2626"/>
        <circle cx="32" cy="16" r="2" fill="#dc2626"/>
      </svg>
    ),
  },
  {
    title: 'تسويق إلكتروني',
    description: 'إدارة حملات إعلانية احترافية على جميع المنصات الرقمية. إعلانات مستهدفة تحقق أعلى عائد على الاستثمار.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="10" width="32" height="22" rx="3" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
        <path d="M18 36h12" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M24 32v4" stroke="#dc2626" strokeWidth="2.5"/>
        <path d="M16 20h8" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 24h16" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <circle cx="34" cy="18" r="6" fill="#dc2626" opacity="0.15" stroke="#dc2626" strokeWidth="2"/>
        <path d="M32 18l2 2 3-3" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial-red opacity-30 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">ماذا أقدم</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="section-title mt-3 text-white">
            خدماتي <span className="text-gradient-red">الإبداعية</span>
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="red-line mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }}>
              <div className="glass-card p-8 sm:p-10 h-full group cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <div className="mt-6 w-0 group-hover:w-full h-0.5 bg-gradient-to-l from-red-500 to-transparent transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
