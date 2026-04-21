import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
}

interface BriefData {
  clientInfo: ClientInfo;
  brandName: string;
  brandStory: string;
  activityField: string;
  activityDescription: string;
  brandGoals: string[];
  uniqueSellingPoint: string;
  targetAge: string[];
  targetGender: string;
  targetLocation: string;
  targetInterests: string[];
  problemSolved: string;
  desiredFeeling: string[];
  brandPersonality: string[];
  threeWords: string;
  communicationTone: string;
  brandStyle: string[];
  preferredColors: string;
  rejectedColors: string;
  visualStyle: string[];
  logoType: string;
  brandReferences: string;
  preferredElements: string[];
  competitors: string;
  competitorsLike: string;
  competitorsDislike: string;
  differentiation: string;
  usagePlatforms: string[];
  multipleVersions: string;
  specialUsage: string;
  budget: string;
  deadline: string;
  revisions: string;
  hasFiles: string;
  finalFeeling: string;
}

const logoTypesData = [
  {
    id: 'symbolic',
    num: '١',
    name: 'شعارات رمزية',
    description: 'تحتوى على أيقونات ورموز',
    example: 'Apple',
    logo: (
      <svg viewBox="0 0 100 100" className="w-20 h-20" fill="currentColor">
        <path d="M50 10 C48 10 47 11 46 13 C44 18 40 22 35 24 C30 26 25 25 20 27 C15 29 12 34 10 39 C8 44 9 49 12 53 C15 57 19 60 23 62 C28 64 33 63 38 61 C43 59 47 56 51 53 C55 50 58 47 62 45 C66 43 71 42 75 40 C79 38 82 34 84 30 C86 26 86 21 84 17 C82 13 78 10 74 8 C70 6 65 6 61 8 C57 10 54 13 52 17 Z"/>
      </svg>
    ),
  },
  {
    id: 'wordmark',
    num: '٢',
    name: 'شعارات نصية',
    description: 'تعتمد على كلمه او اكثر ولا يدخل فى التصميم رموز او رسومات',
    example: 'Sony',
    logo: (
      <svg viewBox="0 0 200 60" className="w-32 h-10" fill="currentColor">
        <text x="10" y="42" fontSize="40" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="4">SONY</text>
      </svg>
    ),
  },
  {
    id: 'lettermark',
    num: '٣',
    name: 'شعارات حرفيه',
    description: 'شعارات تحتوى على حرف أو إثنين، وربما اول مجموعة احرف من اسم الشركة أو المشروع',
    example: 'CNN',
    logo: (
      <svg viewBox="0 0 150 80" className="w-28 h-16" fill="none" stroke="currentColor" strokeWidth="4">
        <rect x="4" y="4" width="142" height="72" rx="6"/>
        <text x="75" y="52" fontSize="38" fontWeight="900" fontFamily="Arial Black, sans-serif" textAnchor="middle" fill="currentColor" stroke="none" letterSpacing="2">CNN</text>
      </svg>
    ),
  },
  {
    id: 'combination',
    num: '٤',
    name: 'شعارات نصية رمزية',
    description: 'تحتوى على مزيج من النوعين الأول والثاني، كلمات مع رموز وأيقونات',
    example: 'Adidas',
    logo: (
      <svg viewBox="0 0 120 100" className="w-24 h-20" fill="currentColor">
        <polygon points="60,8 18,72 42,72"/>
        <polygon points="60,8 42,72 68,72"/>
        <polygon points="60,8 68,72 92,72"/>
        <text x="60" y="92" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle" letterSpacing="3">adidas</text>
      </svg>
    ),
  },
  {
    id: 'emblem',
    num: '٥',
    name: 'شعارات رسومية',
    description: 'تعتمد على الرسومات فى اغلب اشكالها، وقد يضاف اليها بعض الكلمات',
    example: 'KFC',
    logo: (
      <svg viewBox="0 0 120 140" className="w-24 h-28" fill="currentColor">
        <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="4"/>
        <ellipse cx="60" cy="45" rx="28" ry="32" fill="currentColor"/>
        <ellipse cx="50" cy="38" rx="5" ry="6" fill="white"/>
        <ellipse cx="70" cy="38" rx="5" ry="6" fill="white"/>
        <circle cx="50" cy="40" r="3" fill="#111"/>
        <circle cx="70" cy="40" r="3" fill="#111"/>
        <rect x="43" y="32" width="14" height="12" rx="4" fill="none" stroke="white" strokeWidth="2"/>
        <rect x="63" y="32" width="14" height="12" rx="4" fill="none" stroke="white" strokeWidth="2"/>
        <line x1="57" y1="38" x2="63" y2="38" stroke="white" strokeWidth="2"/>
        <ellipse cx="60" cy="50" rx="3" ry="2" fill="white"/>
        <path d="M48,54 Q60,50 72,54" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M40,65 Q60,80 80,65" fill="currentColor"/>
        <path d="M50,75 L60,82 L70,75 L60,82 Z" fill="white"/>
        <circle cx="60" cy="82" r="3" fill="white"/>
        <text x="60" y="115" fontSize="24" fontWeight="900" fontFamily="Arial Black, sans-serif" textAnchor="middle" fill="currentColor" letterSpacing="2">KFC</text>
      </svg>
    ),
  },
];

const questionsData = [
  {
    id: 'clientInfo',
    title: 'بيانات العميل',
    fields: [
      { id: 'name', label: 'الاسم الكامل', type: 'text', required: true },
      { id: 'email', label: 'البريد الإلكتروني', type: 'email', required: true },
      { id: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
    ],
  },
  {
    id: 'basicInfo',
    title: 'معلومات أساسية',
    fields: [
      { id: 'brandName', label: 'اسم العلامة التجارية', type: 'text', required: true },
      { id: 'brandStory', label: 'هل للاسم معنى أو قصة؟', type: 'textarea', required: false },
      { id: 'activityField', label: 'مجال النشاط', type: 'single', options: ['خدمات', 'منتجات', 'تقنية', 'مطاعم', 'تجارة', 'أخرى'], required: true },
      { id: 'activityDescription', label: 'صف نشاطك بشكل مختصر', type: 'textarea', required: true },
      { id: 'brandGoals', label: 'الهدف الرئيسي من العلامة', type: 'multi', options: ['زيادة المبيعات', 'بناء وعي', 'فخامة', 'انتشار', 'جذب استثمار'], required: true },
      { id: 'uniqueSellingPoint', label: 'ايش يميزك عن المنافسين؟', type: 'textarea', required: true },
    ],
  },
  {
    id: 'targetAudience',
    title: 'الجمهور المستهدف',
    fields: [
      { id: 'targetAge', label: 'الفئة العمرية المستهدفة', type: 'multi', options: ['18-24', '25-34', '35-44', '45+'], required: true },
      { id: 'targetGender', label: 'الجنس المستهدف', type: 'single', options: ['ذكر', 'أنثى', 'كلاهما'], required: true },
      { id: 'targetLocation', label: 'الموقع الجغرافي', type: 'text', required: true },
      { id: 'targetInterests', label: 'اهتمامات الجمهور', type: 'multi', options: ['تقنية', 'أزياء', 'أعمال', 'رياضة', 'رفاهية', 'محتوى رقمي', 'أخرى'], required: true },
      { id: 'problemSolved', label: 'ايش المشكلة اللي تحلها لهم؟', type: 'textarea', required: true },
      { id: 'desiredFeeling', label: 'ايش الشعور اللي تبغاه يوصل لهم؟', type: 'multi', options: ['ثقة', 'راحة', 'فخامة', 'حماس', 'أمان', 'انتماء'], required: true },
    ],
  },
  {
    id: 'brandPersonality',
    title: 'شخصية العلامة',
    fields: [
      { id: 'brandPersonality', label: 'كيف تصف شخصية البراند؟', type: 'multi', options: ['جريء', 'هادئ', 'فاخر', 'مرح', 'رسمي', 'عصري'], required: true },
      { id: 'threeWords', label: 'ثلاث كلمات تصف البراند', type: 'text', required: true },
      { id: 'communicationTone', label: 'نبرة التواصل', type: 'single', options: ['رسمية', 'شبه رسمية', 'شبابية', 'مباشرة', 'غامضة'], required: true },
      { id: 'brandStyle', label: 'هل فيه طابع معين؟', type: 'multi', options: ['تقني', 'كلاسيكي', 'مستقبلي', 'بحري', 'فاخر', 'بسيط'], required: true },
    ],
  },
  { id: 'visualDirection', title: 'أنواع الشعارات', fields: [] },
  {
    id: 'competitors',
    title: 'المنافسين',
    fields: [
      { id: 'competitors', label: 'من هم منافسينك؟', type: 'textarea', required: true },
      { id: 'competitorsLike', label: 'ايش يعجبك فيهم؟', type: 'textarea', required: true },
      { id: 'competitorsDislike', label: 'ايش ما يعجبك فيهم؟', type: 'textarea', required: true },
      { id: 'differentiation', label: 'كيف تبغى تكون مختلف؟', type: 'textarea', required: true },
    ],
  },
  {
    id: 'usage',
    title: 'الاستخدامات',
    fields: [
      { id: 'usagePlatforms', label: 'أين سيتم استخدام الشعار؟', type: 'multi', options: ['سوشيال ميديا', 'موقع', 'تطبيق', 'مطبوعات', 'لوحات', 'تغليف'], required: true },
      { id: 'multipleVersions', label: 'هل تحتاج نسخ متعددة؟', type: 'single', options: ['نعم', 'لا'], required: true },
      { id: 'specialUsage', label: 'استخدامات خاصة؟', type: 'textarea', required: false },
    ],
  },
  {
    id: 'execution',
    title: 'تفاصيل التنفيذ',
    fields: [
      { id: 'budget', label: 'الميزانية التقريبية', type: 'single', options: ['منخفض', 'متوسط', 'عالي'], required: true },
      { id: 'deadline', label: 'موعد التسليم', type: 'text', required: true },
      { id: 'revisions', label: 'عدد التعديلات', type: 'single', options: ['محدود', 'مفتوح'], required: true },
      { id: 'hasFiles', label: 'هل لديك أفكار أو ملفات جاهزة؟', type: 'single', options: ['نعم', 'لا'], required: true },
    ],
  },
  {
    id: 'final',
    title: 'السؤال الحاسم',
    fields: [
      { id: 'finalFeeling', label: 'ايش الشعور اللي لازم يوصل فوراً عند رؤية الشعار؟', type: 'textarea', required: true },
    ],
  },
];

export default function Brief() {
  const [currentSection, setCurrentSection] = useState(0);
  const [briefData, setBriefData] = useState<BriefData>({
    clientInfo: { name: '', email: '', phone: '' },
    brandName: '', brandStory: '', activityField: '', activityDescription: '',
    brandGoals: [], uniqueSellingPoint: '', targetAge: [], targetGender: '',
    targetLocation: '', targetInterests: [], problemSolved: '', desiredFeeling: [],
    brandPersonality: [], threeWords: '', communicationTone: '', brandStyle: [],
    preferredColors: '', rejectedColors: '', visualStyle: [], logoType: '',
    brandReferences: '', preferredElements: [], competitors: '', competitorsLike: '',
    competitorsDislike: '', differentiation: '', usagePlatforms: [],
    multipleVersions: '', specialUsage: '', budget: '', deadline: '',
    revisions: '', hasFiles: '', finalFeeling: '',
  });
  const [selectedLogoType, setSelectedLogoType] = useState<string | null>(null);

  const updateField = (fieldId: string, value: string | string[]) => {
    if (fieldId === 'name' || fieldId === 'email' || fieldId === 'phone') {
      setBriefData(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, [fieldId]: value } }));
    } else {
      setBriefData(prev => ({ ...prev, [fieldId]: value }));
    }
  };

  const getField = (fieldId: string) => {
    if (fieldId === 'name' || fieldId === 'email' || fieldId === 'phone') {
      return briefData.clientInfo[fieldId];
    }
    return briefData[fieldId as keyof Omit<BriefData, 'clientInfo'>];
  };

  const isSectionValid = () => {
    const section = questionsData[currentSection];
    if (section.id === 'visualDirection') return selectedLogoType !== null;
    for (const field of section.fields) {
      if (field.required) {
        const value = getField(field.id);
        if (!value || (Array.isArray(value) && value.length === 0)) return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!isSectionValid()) return;
    if (currentSection < questionsData.length - 1) setCurrentSection(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentSection > 0) setCurrentSection(prev => prev - 1);
  };

  const handleLogoTypeSelect = (typeName: string) => {
    const selectedType = logoTypesData.find(t => t.name === typeName);
    if (selectedType) {
      setSelectedLogoType(selectedType.id);
      updateField('logoType', selectedType.name);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(0, 30, pageWidth, 30);
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text('Brand Design Brief', pageWidth / 2, 18, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(220, 38, 38);
    doc.text('Nassar Alraee', pageWidth / 2, 25, { align: 'center' });

    let yPos = 40;
    const addSection = (title: string, fields: { label: string; value: string }[]) => {
      if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
      doc.setFillColor(20, 20, 20);
      doc.roundedRect(15, yPos - 5, pageWidth - 30, 8, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(220, 38, 38);
      doc.text(title, 20, yPos);
      yPos += 12;
      fields.forEach(field => {
        if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
        doc.setFontSize(10);
        doc.setTextColor(180, 180, 180);
        doc.text(field.label + ':', 20, yPos);
        doc.setTextColor(220, 220, 220);
        const splitText = doc.splitTextToSize(field.value || '-', pageWidth - 45);
        doc.text(splitText, 20, yPos + 5);
        yPos += 8 + (splitText.length * 4);
      });
      yPos += 5;
    };

    addSection('Client Info', [
      { label: 'Name', value: briefData.clientInfo.name },
      { label: 'Email', value: briefData.clientInfo.email },
      { label: 'Phone', value: briefData.clientInfo.phone },
    ]);
    addSection('Basic Info', [
      { label: 'Brand', value: briefData.brandName },
      { label: 'Story', value: briefData.brandStory },
      { label: 'Field', value: briefData.activityField },
      { label: 'Description', value: briefData.activityDescription },
      { label: 'Goals', value: briefData.brandGoals.join(', ') },
      { label: 'USP', value: briefData.uniqueSellingPoint },
    ]);
    addSection('Target Audience', [
      { label: 'Age', value: briefData.targetAge.join(', ') },
      { label: 'Gender', value: briefData.targetGender },
      { label: 'Location', value: briefData.targetLocation },
      { label: 'Interests', value: briefData.targetInterests.join(', ') },
      { label: 'Problem', value: briefData.problemSolved },
      { label: 'Feeling', value: briefData.desiredFeeling.join(', ') },
    ]);
    addSection('Brand Personality', [
      { label: 'Personality', value: briefData.brandPersonality.join(', ') },
      { label: '3 Words', value: briefData.threeWords },
      { label: 'Tone', value: briefData.communicationTone },
      { label: 'Style', value: briefData.brandStyle.join(', ') },
    ]);
    addSection('Logo Type', [{ label: 'Type', value: briefData.logoType }]);
    addSection('Competitors', [
      { label: 'Competitors', value: briefData.competitors },
      { label: 'Like', value: briefData.competitorsLike },
      { label: 'Dislike', value: briefData.competitorsDislike },
      { label: 'Differentiation', value: briefData.differentiation },
    ]);
    addSection('Usage', [
      { label: 'Platforms', value: briefData.usagePlatforms.join(', ') },
      { label: 'Versions', value: briefData.multipleVersions },
      { label: 'Special', value: briefData.specialUsage },
    ]);
    addSection('Execution', [
      { label: 'Budget', value: briefData.budget },
      { label: 'Deadline', value: briefData.deadline },
      { label: 'Revisions', value: briefData.revisions },
      { label: 'Has Files', value: briefData.hasFiles },
    ]);
    if (yPos > pageHeight - 50) { doc.addPage(); yPos = 20; }
    doc.setFillColor(220, 38, 38);
    doc.roundedRect(15, yPos - 5, pageWidth - 30, 35, 3, 3, 'F');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('Final Feeling', 20, yPos + 5);
    doc.setFontSize(11);
    const splitFinal = doc.splitTextToSize(briefData.finalFeeling, pageWidth - 45);
    doc.text(splitFinal, 20, yPos + 15);
    doc.save(`brand-brief-${briefData.clientInfo.name || 'client'}.pdf`);
  };

  const sendToWhatsApp = () => {
    const summary = `*بريف تصميم علامة تجارية* 🎨

*بيانات العميل:*
الاسم: ${briefData.clientInfo.name}
الايميل: ${briefData.clientInfo.email}
الهاتف: ${briefData.clientInfo.phone}

*معلومات أساسية:*
العلامة: ${briefData.brandName}
المجال: ${briefData.activityField}
الأهداف: ${briefData.brandGoals.join('، ')}

*الجمهور المستهدف:*
العمر: ${briefData.targetAge.join('، ')}
الجنس: ${briefData.targetGender}
الموقع: ${briefData.targetLocation}

*شخصية العلامة:*
الشخصية: ${briefData.brandPersonality.join('، ')}
الكلمات: ${briefData.threeWords}
النبرة: ${briefData.communicationTone}

*نوع الشعار:*
${briefData.logoType}

*السؤال الحاسم:*
${briefData.finalFeeling}`;
    const whatsappUrl = `https://wa.me/967779467573?text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, '_blank');
  };

  const currentSectionData = questionsData[currentSection];
  const progress = ((currentSection + 1) / questionsData.length) * 100;

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
            <span className="text-xs sm:text-sm text-gray-400">
              {currentSection + 1} / {questionsData.length}
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
              {currentSectionData.id === 'visualDirection' && (
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-bold text-white mb-2">اختر نوع الشعار الأقرب لك</h2>
                  <p className="text-gray-400 text-sm">اختيار واحد فقط</p>
                </div>
              )}

              {currentSectionData.fields.map((field, index) => (
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
                      value={getField(field.id) as string}
                      onChange={(e) => updateField(field.id, e.target.value)}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="أدخل الإجابة هنا..."
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={getField(field.id) as string}
                      onChange={(e) => updateField(field.id, e.target.value)}
                      rows={4}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
                      placeholder="أدخل الإجابة هنا..."
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
                            getField(field.id) === option
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
                        const values = (getField(field.id) as string[]) || [];
                        const isSelected = values.includes(option);
                        return (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const newValues = isSelected
                                ? values.filter(v => v !== option)
                                : [...values, option];
                              updateField(field.id, newValues);
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
              ))}

              {currentSectionData.id === 'visualDirection' && (
                <div className="grid gap-4">
                  {logoTypesData.map((type, idx) => (
                    <motion.button
                      key={type.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleLogoTypeSelect(type.name)}
                      className={`p-5 rounded-2xl border text-right transition-all duration-300 ${
                        selectedLogoType === type.id
                          ? 'bg-red-600/20 border-red-500/60 shadow-lg shadow-red-600/20'
                          : 'bg-white/5 border-white/10 hover:border-red-500/30 hover:bg-red-600/5'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-24 h-20 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <div className="text-black flex items-center justify-center w-full h-full">
                            {type.logo}
                          </div>
                        </div>
                        <div className="flex-1 text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-red-400 font-bold text-lg">{type.num}</span>
                            <h4 className="font-bold text-white text-base">{type.name}</h4>
                          </div>
                          <p className="text-sm text-gray-400 leading-relaxed">{type.description}</p>
                          <p className="text-xs text-gray-500 mt-1">مثال: {type.example}</p>
                        </div>
                        {selectedLogoType === type.id && (
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

              {currentSection < questionsData.length - 1 ? (
                <motion.button
                  whileHover={{ scale: isSectionValid() ? 1.02 : 1 }}
                  whileTap={{ scale: isSectionValid() ? 0.98 : 1 }}
                  onClick={handleNext}
                  disabled={!isSectionValid()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 ${
                    isSectionValid()
                      ? 'bg-gradient-to-l from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>التالي</span>
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    generatePDF();
                    setTimeout(sendToWhatsApp, 500);
                  }}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-l from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-600/30 transition-all duration-300"
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
