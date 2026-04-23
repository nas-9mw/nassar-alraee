export interface BriefField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'single' | 'multi';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface BriefSection {
  id: string;
  title: string;
  fields: BriefField[];
  special?: 'logoTypes';
}

export interface BriefConfig {
  key: string;
  title: string;
  emoji: string;
  sections: BriefSection[];
}

const clientInfoSection: BriefSection = {
  id: 'clientInfo',
  title: 'بيانات العميل',
  fields: [
    { id: 'name', label: 'الاسم الكامل', type: 'text', required: true },
    { id: 'email', label: 'البريد الإلكتروني', type: 'email', required: true },
    { id: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
  ],
};

// ========== IDENTITY (existing) ==========
export const identityBrief: BriefConfig = {
  key: 'identity',
  title: 'بريف هوية بصرية',
  emoji: '🎨',
  sections: [
    clientInfoSection,
    {
      id: 'basicInfo',
      title: 'معلومات أساسية',
      fields: [
        { id: 'brandName', label: 'اسم العلامة التجارية', type: 'text', required: true },
        { id: 'brandStory', label: 'هل للاسم معنى أو قصة؟', type: 'textarea' },
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
    { id: 'visualDirection', title: 'أنواع الشعارات', fields: [], special: 'logoTypes' },
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
        { id: 'specialUsage', label: 'استخدامات خاصة؟', type: 'textarea' },
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
  ],
};

// ========== GRAPHIC DESIGN (new — per user spec) ==========
export const graphicBrief: BriefConfig = {
  key: 'graphic',
  title: 'بريف تصميم جرافيكي',
  emoji: '🖌️',
  sections: [
    clientInfoSection,
    {
      id: 'goal',
      title: 'الهدف والرسالة',
      fields: [
        {
          id: 'mainGoal',
          label: 'ما هو الهدف الرئيسي من هذا التصميم؟',
          type: 'single',
          options: ['زيادة مبيعات', 'توعية', 'دعوة لحضور حدث', 'بناء صورة ذهنية', 'أخرى'],
          required: true,
        },
        {
          id: 'coreMessage',
          label: 'ما هي الرسالة الأساسية التي يجب أن يوصلها التصميم؟',
          type: 'textarea',
          required: true,
          placeholder: 'جملة واحدة تشرح الفكرة الجوهرية',
        },
      ],
    },
    {
      id: 'audience',
      title: 'الجمهور المستهدف',
      fields: [
        { id: 'audienceAge', label: 'العمر', type: 'multi', options: ['أقل من 18', '18-24', '25-34', '35-44', '45+'], required: true },
        { id: 'audienceGender', label: 'الجنس', type: 'single', options: ['ذكر', 'أنثى', 'كلاهما'], required: true },
        { id: 'audienceJob', label: 'المهنة', type: 'text', required: true },
        { id: 'audienceInterests', label: 'الاهتمامات', type: 'text', required: true },
        { id: 'audienceEducation', label: 'المستوى التعليمي', type: 'single', options: ['ثانوي', 'جامعي', 'دراسات عليا', 'متنوع'], required: true },
      ],
    },
    {
      id: 'tone',
      title: 'الكول تون والنبرة',
      fields: [
        {
          id: 'tone',
          label: 'ما هو "الكول تون" أو النبرة الصوتية المطلوبة؟',
          type: 'single',
          options: ['رسمي وجاد', 'مرح وودود', 'فاخر وحصري', 'شبابي وحيوي'],
          required: true,
        },
      ],
    },
    {
      id: 'mandatory',
      title: 'عناصر إلزامية',
      fields: [
        {
          id: 'mandatoryElements',
          label: 'هل هناك أي عناصر إلزامية يجب تضمينها؟',
          type: 'multi',
          options: ['الشعار', 'الشعار النصي', 'الرقم الموحد', 'الموقع الإلكتروني', 'حسابات السوشيال ميديا', 'رموز QR'],
        },
        {
          id: 'otherMandatory',
          label: 'عناصر أخرى (اختياري)',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'guidelines',
      title: 'الهوية البصرية',
      fields: [
        {
          id: 'hasGuidelines',
          label: 'هل هناك تصاميم سابقة أو دليل هوية بصرية (Brand Guidelines) يجب اتباعها؟',
          type: 'single',
          options: ['نعم', 'لا'],
          required: true,
        },
        {
          id: 'guidelinesDetails',
          label: 'اذكر تفاصيل الألوان والخطوط والأيقونات إن وجدت',
          type: 'textarea',
          placeholder: 'يمكنك مشاركتنا روابط أو وصف الملف',
        },
      ],
    },
    {
      id: 'execution',
      title: 'التنفيذ والميزانية',
      fields: [
        { id: 'deadline', label: 'ما هو تاريخ التسليم النهائي ؟', type: 'text', required: true },
        {
          id: 'budget',
          label: 'ما هي الميزانية المخصصة للتصميم ؟',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

// ========== MARKETING CONSULTING ==========
export const marketingBrief: BriefConfig = {
  key: 'marketing',
  title: 'بريف استشارات تسويق',
  emoji: '📊',
  sections: [
    clientInfoSection,
    {
      id: 'business',
      title: 'نشاطك',
      fields: [
        {
          id: 'activityType',
          label: 'إيش نوع النشاط؟',
          type: 'single',
          options: ['مطعم', 'متجر', 'عيادة', 'خدمات', 'أخرى'],
          required: true,
        },
        { id: 'mainProduct', label: 'إيش المنتج أو الخدمة الرئيسية؟', type: 'textarea', required: true },
        { id: 'differentiation', label: 'إيش اللي يخليك مختلف عن غيرك؟', type: 'textarea', required: true },
      ],
    },
    {
      id: 'audience',
      title: 'جمهورك المستهدف',
      fields: [
        { id: 'audienceAge', label: 'عمره تقريبًا؟', type: 'text', required: true },
        { id: 'audienceLocation', label: 'وين موجود؟ (مدينة / دولة)', type: 'text', required: true },
        { id: 'audienceOnline', label: 'وين يقضي وقته أونلاين؟', type: 'text', required: true },
      ],
    },
    {
      id: 'goal',
      title: 'هدفك الرئيسي',
      fields: [
        {
          id: 'mainGoal',
          label: 'إيش هدفك الرئيسي؟',
          type: 'single',
          options: ['مبيعات', 'متابعين', 'تفاعل', 'الناس تعرف اسمك'],
          required: true,
        },
        { id: 'goalNumber', label: 'عطني رقم للهدف واقعي + وقت متوقع لتحقيقه', type: 'textarea', required: true },
      ],
    },
    {
      id: 'budget',
      title: 'ميزانيتك الشهرية',
      fields: [
        { id: 'budget', label: 'وش أقل وأكثر مبلغ تقدر تخصصه؟', type: 'text', required: true },
      ],
    },
    {
      id: 'platforms',
      title: 'المنصات المطلوبة',
      fields: [
        {
          id: 'platforms',
          label: 'اختر المنصات',
          type: 'multi',
          options: ['فيسبوك', 'انستقرام', 'تيك توك', 'سناب شات', 'جوجل (إعلانات / SEO)', 'بريد إلكتروني'],
          required: true,
        },
        { id: 'otherPlatforms', label: 'منصات أخرى (اختياري)', type: 'text' },
      ],
    },
    {
      id: 'timing',
      title: 'متى نبدأ؟',
      fields: [
        { id: 'startDate', label: 'متى تبي تبدأ فعليًا؟', type: 'text', required: true },
        { id: 'deadline', label: 'إيش الموعد النهائي اللي لازم نكون جاهزين قبله؟', type: 'text', required: true },
      ],
    },
  ],
};

// ========== DIGITAL MARKETING / ADS ==========
export const digitalBrief: BriefConfig = {
  key: 'digital',
  title: 'بريف تسويق إلكتروني',
  emoji: '📱',
  sections: [
    clientInfoSection,
    {
      id: 'project',
      title: 'عن المشروع',
      fields: [
        { id: 'productName', label: 'إيش اسم منتجك/خدمتك؟', type: 'text', required: true },
        { id: 'productDescription', label: 'إيش تبيع بالضبط؟', type: 'textarea', required: true },
      ],
    },
    {
      id: 'goal',
      title: 'الهدف',
      fields: [
        {
          id: 'campaignGoal',
          label: 'إيش تبي تحقق من الحملة؟',
          type: 'single',
          options: ['مبيعات', 'شهرة', 'متابعين', 'أخرى'],
          required: true,
        },
      ],
    },
    {
      id: 'audience',
      title: 'الجمهور',
      fields: [
        { id: 'targetAudience', label: 'مين تستهدف؟', type: 'text', required: true },
        { id: 'targetAge', label: 'كم أعمارهم تقريباً؟', type: 'text', required: true },
        { id: 'targetLocation', label: 'وين موقعهم؟', type: 'text', required: true },
      ],
    },
    {
      id: 'product',
      title: 'المنتج',
      fields: [
        { id: 'productAdvantage', label: 'إيش يميز منتجك؟', type: 'textarea', required: true },
        { id: 'whyBuy', label: 'ليش الناس تشتريه؟', type: 'textarea', required: true },
      ],
    },
    {
      id: 'competitors',
      title: 'المنافسين',
      fields: [
        { id: 'competitors', label: 'مين منافسينك؟', type: 'textarea', required: true },
        { id: 'differentiation', label: 'إيش الفرق بينك وبينهم؟', type: 'textarea', required: true },
      ],
    },
    {
      id: 'budget',
      title: 'الميزانية',
      fields: [
        { id: 'adBudget', label: 'كم ميزانيتك؟', type: 'text', required: true },
        { id: 'startDate', label: 'متى تبي تبدأ؟', type: 'text', required: true },
      ],
    },
    {
      id: 'channels',
      title: 'القنوات',
      fields: [
        {
          id: 'platforms',
          label: 'وين تبي تسوق؟',
          type: 'multi',
          options: ['انستقرام', 'تيك توك', 'سناب', 'تويتر/X', 'فيسبوك', 'يوتيوب', 'قوقل'],
          required: true,
        },
      ],
    },
  ],
};

export const briefConfigs: Record<string, BriefConfig> = {
  identity: identityBrief,
  graphic: graphicBrief,
  marketing: marketingBrief,
  digital: digitalBrief,
};
