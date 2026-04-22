import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import appleLogo from '@/assets/logos/apple.svg';
import sonyLogo from '@/assets/logos/sony.svg';
import cnnLogo from '@/assets/logos/cnn.svg';
import adidasLogo from '@/assets/logos/adidas.svg';
import kfcLogo from '@/assets/logos/kfc.svg';
import { briefConfigs, BriefField } from './briefConfigs';

const logoTypesData = [
  { id: 'symbolic', num: '١', name: 'شعارات رمزية', description: 'تحتوى على أيقونات ورموز', example: 'Apple', logo: <img src={appleLogo} alt="Apple" className="w-14 h-14 object-contain" /> },
  { id: 'wordmark', num: '٢', name: 'شعارات نصية', description: 'تعتمد على كلمه او اكثر ولا يدخل فى التصميم رموز او رسومات', example: 'Sony', logo: <img src={sonyLogo} alt="Sony" className="w-20 h-14 object-contain" /> },
  { id: 'lettermark', num: '٣', name: 'شعارات حرفيه', description: 'شعارات تحتوى على حرف أو إثنين، وربما اول مجموعة احرف من اسم الشركة أو المشروع', example: 'CNN', logo: <img src={cnnLogo} alt="CNN" className="w-20 h-14 object-contain" /> },
  { id: 'combination', num: '٤', name: 'شعارات نصية رمزية', description: 'تحتوى على مزيج من النوعين الأول والثاني، كلمات مع رموز وأيقونات', example: 'Adidas', logo: <img src={adidasLogo} alt="Adidas" className="w-16 h-16 object-contain" /> },
  { id: 'emblem', num: '٥', name: 'شعارات رسومية', description: 'تعتمد على الرسومات فى اغلب اشكالها، وقد يضاف اليها بعض الكلمات', example: 'KFC', logo: <img src={kfcLogo} alt="KFC" className="w-16 h-16 object-contain" /> },
];

type FormValues = Record<string, string | string[]>;

const clientInfoIds = ['name', 'email', 'phone'];

export default function Brief() {
  const { type } = useParams<{ type?: string }>();
  const config = briefConfigs[type ?? 'identity'] ?? briefConfigs.identity;

  const [currentSection, setCurrentSection] = useState(0);
  const [values, setValues] = useState<FormValues>(() => {
    const initial: FormValues = {};
    config.sections.forEach(s => s.fields.forEach(f => {
      initial[f.id] = f.type === 'multi' ? [] : '';
    }));
    return initial;
  });
  const [selectedLogoType, setSelectedLogoType] = useState<string | null>(null);
  const [logoTypeName, setLogoTypeName] = useState<string>('');

  if (type && !briefConfigs[type]) return <Navigate to="/brief/identity" replace />;

  const updateField = (id: string, value: string | string[]) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const currentSectionData = config.sections[currentSection];

  const isSectionValid = useMemo(() => {
    if (currentSectionData.special === 'logoTypes') return selectedLogoType !== null;
    for (const field of currentSectionData.fields) {
      if (field.required) {
        const val = values[field.id];
        if (!val || (Array.isArray(val) && val.length === 0)) return false;
      }
    }
    return true;
  }, [currentSectionData, selectedLogoType, values]);

  const handleNext = () => {
    if (!isSectionValid) return;
    if (currentSection < config.sections.length - 1) setCurrentSection(p => p + 1);
  };
  const handlePrevious = () => {
    if (currentSection > 0) setCurrentSection(p => p - 1);
  };

  const handleLogoTypeSelect = (typeName: string) => {
    const t = logoTypesData.find(x => x.name === typeName);
    if (t) {
      setSelectedLogoType(t.id);
      setLogoTypeName(t.name);
    }
  };

  const sendToWhatsApp = () => {
    const v = (val: string | string[] | undefined) => {
      if (Array.isArray(val)) return val.length ? val.join('، ') : '—';
      return val && val.trim() ? val : '—';
    };

    let summary = `*${config.emoji} ${config.title}*\n━━━━━━━━━━━━━━━━━━\n`;
    config.sections.forEach(section => {
      summary += `\n*▪️ ${section.title}*\n`;
      if (section.special === 'logoTypes') {
        summary += `• نوع الشعار: ${v(logoTypeName)}\n`;
        return;
      }
      section.fields.forEach(f => {
        summary += `• ${f.label}: ${v(values[f.id])}\n`;
      });
    });
    summary += `\n━━━━━━━━━━━━━━━━━━`;

    const url = `https://wa.me/967779467573?text=${encodeURIComponent(summary)}`;
    window.open(url, '_blank');
  };

  const progress = ((currentSection + 1) / config.sections.length) * 100;

  const renderField = (field: BriefField, index: number) => {
    const val = values[field.id];
    return (
      <motion.div
        key={field.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <label className="block text-base sm:text-lg font-medium text-gray-200 mb-3">
          {field.label}
          {field.required && <span className="text-red-400 mr-1">*</span>}
        </label>

        {field.type === 'text' || field.type === 'email' || field.type === 'tel' ? (
          <input
            type={field.type}
            value={(val as string) || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm"
            placeholder={field.placeholder || 'أدخل الإجابة هنا...'}
          />
        ) : field.type === 'textarea' ? (
          <textarea
            value={(val as string) || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            rows={4}
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
            placeholder={field.placeholder || 'أدخل الإجابة هنا...'}
          />
        ) : field.type === 'single' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {field.options!.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateField(field.id, option)}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  val === option
                    ? 'bg-red-600/20 border-red-500/50 shadow-lg shadow-red-600/20'
                    : 'bg-white/5 border-white/10 hover:border-red-500/30 hover:bg-red-600/10'
                }`}
              >
                <span className="text-sm font-medium">{option}</span>
              </motion.button>
            ))}
          </div>
        ) : field.type === 'multi' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {field.options!.map((option) => {
              const arr = (val as string[]) || [];
              const isSelected = arr.includes(option);
              return (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const next = isSelected ? arr.filter(x => x !== option) : [...arr, option];
                    updateField(field.id, next);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-red-600/20 border-red-500/50 shadow-lg shadow-red-600/20'
                      : 'bg-white/5 border-white/10 hover:border-red-500/30 hover:bg-red-600/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{option}</span>
                    {isSelected && <Check className="w-4 h-4 text-red-400" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : null}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir="rtl">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-red-700/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-0.5 bg-gray-800">
          <motion.div
            className="h-full bg-gradient-to-l from-red-600 to-red-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 bg-black/80 backdrop-blur-sm">
          <Link to="/" className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 hover:text-red-400 transition-colors">
            <ArrowRight className="w-4 h-4" />
            <span>الرئيسية</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm text-gray-300 font-medium hidden sm:inline">{config.title}</span>
            <span className="text-xs sm:text-sm text-gray-400">
              {currentSection + 1} / {config.sections.length}
            </span>
            <span className="text-xs sm:text-sm text-red-400 font-medium">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="max-w-3xl mx-auto w-full"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-4"
              >
                <Sparkles className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-300">{currentSectionData.title}</span>
              </motion.div>
            </div>

            <div className="space-y-6">
              {currentSectionData.special === 'logoTypes' && (
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-bold text-white mb-2">اختر نوع الشعار الأقرب لك</h2>
                  <p className="text-gray-400 text-sm">اختيار واحد فقط</p>
                </div>
              )}

              {currentSectionData.fields.map((field, index) => renderField(field, index))}

              {currentSectionData.special === 'logoTypes' && (
                <div className="grid gap-4">
                  {logoTypesData.map((t, idx) => (
                    <motion.button
                      key={t.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleLogoTypeSelect(t.name)}
                      className={`p-5 rounded-2xl border text-right transition-all duration-300 ${
                        selectedLogoType === t.id
                          ? 'bg-red-600/20 border-red-500/60 shadow-lg shadow-red-600/20'
                          : 'bg-white/5 border-white/10 hover:border-red-500/30 hover:bg-red-600/5'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-24 h-20 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <div className="text-black flex items-center justify-center w-full h-full">
                            {t.logo}
                          </div>
                        </div>
                        <div className="flex-1 text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-red-400 font-bold text-lg">{t.num}</span>
                            <h4 className="font-bold text-white text-base">{t.name}</h4>
                          </div>
                          <p className="text-sm text-gray-400 leading-relaxed">{t.description}</p>
                          <p className="text-xs text-gray-500 mt-1">مثال: {t.example}</p>
                        </div>
                        {selectedLogoType === t.id && (
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-10 gap-4">
              <motion.button
                whileHover={{ scale: currentSection > 0 ? 1.02 : 1 }}
                whileTap={{ scale: currentSection > 0 ? 0.98 : 1 }}
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  currentSection > 0
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-transparent text-gray-600 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
                <span>السابق</span>
              </motion.button>

              {currentSection < config.sections.length - 1 ? (
                <motion.button
                  whileHover={{ scale: isSectionValid ? 1.02 : 1 }}
                  whileTap={{ scale: isSectionValid ? 0.98 : 1 }}
                  onClick={handleNext}
                  disabled={!isSectionValid}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 ${
                    isSectionValid
                      ? 'bg-gradient-to-l from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>التالي</span>
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: isSectionValid ? 1.02 : 1 }}
                  whileTap={{ scale: isSectionValid ? 0.98 : 1 }}
                  onClick={sendToWhatsApp}
                  disabled={!isSectionValid}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 ${
                    isSectionValid
                      ? 'bg-gradient-to-l from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-600/30'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>إكمال وإرسال</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
