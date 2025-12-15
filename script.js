// =================================================================
// قاموس الترجمة الشامل (Localization Dictionary)
// =================================================================
const translations = {
    // المفاتيح الثابتة (Static Keys)
    title: {
        ar: "Planno - مُخطط الرحلات", en: "Planno - Travel Planner", fr: "Planno - Planificateur de Voyage",
        es: "Planno - Planificador de Viajes", it: "Planno - Pianificatore di Viaggi", pt: "Planno - Planejador de Viagens",
        de: "Planno - Reiseplaner", ru: "Planno - Планировщик Путешествий", ko: "Planno - 여행 플래너",
        ja: "Planno - 旅行プランナー", zh: "Planno - 旅行计划师"
    },
    header_h1: {
        ar: "Planno - مُنشئ خطط السفر الذكي", en: "Planno - Smart Travel Plan Generator", fr: "Planno - Générateur Intelligent de Plans de Voyage",
        es: "Planno - Generador Inteligente de Planes de Viaje", it: "Planno - Generatore Intelligente di Piani di Viaggio", pt: "Planno - Gerador Inteligente de Planos de Viagem",
        de: "Planno - Intelligenter Reiseplangenerator", ru: "Planno - Умный Генератор Планов Путешествий", ko: "Planno - 스마트 여행 계획 생성기",
        ja: "Planno - スマート旅行計画ジェネレーター", zh: "Planno - 智能旅行计划生成器"
    },
    header_p: {
        ar: "اختر وجهتك ولغتك لإنشاء خطة سفر مخصصة وعالمية.", en: "Select your destination and language to create a personalized, global travel plan.", fr: "Sélectionnez votre destination et langue pour créer un plan de voyage personnalisé et mondial.",
        es: "Selecciona tu destino e idioma para crear un plan de viaje personalizado y global.", it: "Seleziona la tua destinazione e lingua per creare un piano di viaggio personalizzato e globale.", pt: "Selecione seu destino e idioma para criar um plano de viagem personalizado e global.",
        de: "Wählen Sie Ihr Ziel und Ihre Sprache, um einen personalisierten, globalen Reiseplan zu erstellen.", ru: "Выберите пункт назначения и язык, чтобы создать персонализированный глобальный план поездки.", ko: "목적지와 언어를 선택하여 맞춤형 글로벌 여행 계획을 만드세요.",
        ja: "目的地と言語を選択して、パーソナライズされたグローバルな旅行計画を作成します。", zh: "选择您的目的地和语言，以创建个性化的全球旅行计划。"
    },
    label_lang: {
        ar: "اختر اللغة:", en: "Select Language:", fr: "Sélectionnez la Langue:", es: "Seleccione el Idioma:", it: "Seleziona la Lingua:", pt: "Selecione o Idioma:",
        de: "Sprache wählen:", ru: "Выберите Язык:", ko: "언어 선택:", ja: "言語を選択:", zh: "选择语言:"
    },
    label_country: {
        ar: "اختر الدولة أو المنطقة:", en: "Select Country or Region:", fr: "Sélectionnez le Pays ou la Région:", es: "Seleccione País o Región:", it: "Seleziona Paese o Regione:", pt: "Selecione País ou Região:",
        de: "Land oder Region wählen:", ru: "Выберите Страну или Регион:", ko: "국가 또는 지역 선택:", ja: "国または地域を選択:", zh: "选择国家或地区:"
    },
    button_generate: {
        ar: "إنشاء خطة السفر", en: "Generate Travel Plan", fr: "Générer le Plan de Voyage", es: "Generar Plan de Viaje", it: "Genera Piano di Viaggio", pt: "Gerar Plano de Viagem",
        de: "Reiseplan erstellen", ru: "Создать План Путешествия", ko: "여행 계획 생성", ja: "旅行計画を生成", zh: "生成旅行计划"
    },
    output_h2: {
        ar: "خطة السفر المقترحة", en: "Suggested Travel Plan", fr: "Plan de Voyage Suggéré", es: "Plan de Viaje Sugerido", it: "Piano di Viaggio Suggerito", pt: "Plano de Viagem Sugerido",
        de: "Vorgeschlagener Reiseplan", ru: "Предлагаемый План Путешествия", ko: "추천 여행 계획", ja: "提案された旅行計画", zh: "推荐旅行计划"
    },
    output_default_p: {
        ar: "الخطة ستظهر هنا بعد اختيار اللغة والدولة والضغط على زر 'إنشاء خطة السفر'.", en: "The plan will appear here after selecting the language, country, and clicking 'Generate Travel Plan'.", fr: "Le plan apparaîtra ici après avoir sélectionné la langue, le pays et cliqué sur 'Générer le Plan de Voyage'.",
        es: "El plan aparecerá aquí después de seleccionar el idioma, el país y hacer clic en 'Generar Plan de Viaje'.", it: "Il piano apparirà qui dopo aver selezionato la lingua, il paese e cliccato su 'Genera Piano di Viaggio'.", pt: "O plano aparecerá aqui após selecionar o idioma, o país e clicar em 'Gerar Plano de Viagem'.",
        de: "Der Plan wird hier angezeigt, nachdem Sie Sprache und Land ausgewählt und auf 'Reiseplan erstellen' geklickt haben.", ru: "План появится здесь после выбора языка, страны и нажатия 'Создать План Путешествия'.", ko: "언어, 국가를 선택하고 '여행 계획 생성'을 클릭하면 계획이 여기에 나타납니다.", ja: "言語と国を選択し、「旅行計画を生成」をクリックすると、計画がここに表示されます。", zh: "选择语言、国家并点击“生成旅行计划”后，计划将在此处显示。"
    },
    footer: {
        ar: "&copy; 2025 Planno. تم الإنشاء بواسطة خبير/ة البرمجة.", en: "&copy; 2025 Planno. Created by Programming Expert.", fr: "&copy; 2025 Planno. Créé par Expert en Programmation.",
        es: "&copy; 2025 Planno. Creado por Experto en Programación.", it: "&copy; 2025 Planno. Creato da Esperto di Programmazione.", pt: "&copy; 2025 Planno. Criado por Especialista em Programação.",
        de: "&copy; 2025 Planno. Erstellt von Programmierexperte.", ru: "&copy; 2025 Planno. Создано Экспертом по Программированию.", ko: "&copy; 2025 Planno. 프로그래밍 전문가가 제작했습니다.", ja: "&copy; 2025 Planno. プログラミングエキスパートによって作成されました。", zh: "&copy; 2025 Planno. 由编程专家创建。"
    },
    // المفاتيح التي تحتاج إلى تعديل حسب السياق
    country_default: {
        ar: "-- يرجى اختيار اللغة أولاً --", en: "-- Please select language first --", fr: "-- Veuillez d'abord sélectionner la langue --",
        es: "-- Por favor, selecciona el idioma primero --", it: "-- Seleziona prima la lingua --", pt: "-- Por favor, selecione o idioma primeiro --",
        de: "-- Bitte wählen Sie zuerst die Sprache aus --", ru: "-- Пожалуйста, выберите язык сначала --", ko: "-- 언어를 먼저 선택해주세요 --",
        ja: "-- 最初に言語を選択してください --", zh: "-- 请先选择语言 --"
    },
    country_placeholder: {
        ar: "-- اختر الدولة --", en: "-- Select Country --", fr: "-- Sélectionnez le Pays --",
        es: "-- Seleccionar País --", it: "-- Seleziona Paese --", pt: "-- Selecionar País --",
        de: "-- Land wählen --", ru: "-- Выберите Страну --", ko: "-- 국가 선택 --",
        ja: "-- 国を選択 --", zh: "-- 选择国家 --"
    }
};

// =================================================================
// دالة الترجمة الشاملة وتغيير اتجاه الصفحة
// =================================================================

/**
 * يغير جميع النصوص الثابتة واتجاه الصفحة بناءً على اللغة المختارة.
 * @param {string} langCode - رمز اللغة (مثل 'ar', 'en', 'fr').
 */
function translatePage(langCode) {
    const isRTL = langCode === 'ar';
    const body = document.body;
    const html = document.documentElement;

    // 1. تغيير اتجاه الصفحة (RTL/LTR)
    body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    html.setAttribute('lang', langCode);
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    
    // 2. ترجمة النصوص الثابتة
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (translations[key] && translations[key][langCode]) {
            element.innerHTML = translations[key][langCode];
        }
    });

    // 3. ترجمة العنوان (Title)
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const key = titleElement.getAttribute('data-translate-key');
         if (translations[key] && translations[key][langCode]) {
            titleElement.textContent = translations[key][langCode];
        }
    }

    // 4. إعادة ملء قائمة الدول باللغة الجديدة (لضمان ظهور أسماء الدول المترجمة إذا كانت متاحة)
    // كما أنها تعيد تعيين الخيارات الافتراضية المترجمة (مثل "-- اختر الدولة --")
    populateCountries();
}

// =================================================================
// خريطة الدول والملفات (تم إكمالها للغة العربية)
// =================================================================
const countryFileMap = {
    // -----------------------------------------------------------------
    //  اللغة العربية (ar)
    // -----------------------------------------------------------------
    'ar': {
        // [الدولة] : {نوع الوجهة: 'countriesA/B/inlands', مجموعة: 'A-J'}
        'أذربيجان': {destType: 'countriesA', group: 'A'},
        'إثيوبيا': {destType: 'countriesB', group: 'A'},  
        'إيسلندا': {destType: 'inlands', group: 'A'},    
        'موريتانيا': {destType: 'countriesB', group: 'B'}, 
        'بنغلاديش': {destType: 'countriesB', group: 'B'},  
        'بوتان': {destType: 'countriesB', group: 'B'},    
        'بنين': {destType: 'countriesB', group: 'B'},      
        'تركيا': {destType: 'countriesA', group: 'C'}, 
        'مالي': {destType: 'countriesB', group: 'C'},  
        'سلوفاكيا': {destType: 'countriesA', group: 'D'}, 
        'غيانا': {destType: 'countriesB', group: 'D'},    
        'أوزبكستان': {destType: 'countriesA', group: 'E'}, 
        'العراق': {destType: 'countriesA', group: 'F'}, 
        'كوريا الجنوبية': {destType: 'countriesA', group: 'F'}, 
        'كوستاريكا': {destType: 'countriesA', group: 'F'}, 
        'كولومبيا': {destType: 'countriesB', group: 'G'}, 
        'منغوليا': {destType: 'countriesB', group: 'G'},  
        'غابون': {destType: 'countriesB', group: 'H'}, 
        'كوسوفو': {destType: 'countriesA', group: 'H'}, 
        'البحرين': {destType: 'inlands', group: 'I'}, 
        'بوركينا فاسو': {destType: 'countriesB', group: 'J'}, 
        'الكاميرون': {destType: 'countriesB', group: 'J'},    
    },
    // -----------------------------------------------------------------
    //  اللغات الأخرى (يجب ملؤها بعد ترجمة أسماء الدول)
    // -----------------------------------------------------------------
    'en': {
        // مثال: ترجمة الدول المتاحة
        'Azerbaijan': {destType: 'countriesA', group: 'A'},
        'Turkey': {destType: 'countriesA', group: 'C'},
        'Iraq': {destType: 'countriesA', group: 'F'},
        // ... (أكمل باقي الدول بالإنجليزية)
    },
    // يرجى ملء الخرائط التالية بأسماء الدول باللغة المطلوبة
    'fr': {
         // مثال: 'La Turquie': {destType: 'countriesA', group: 'C'},
    },
    'es': {},
    'it': {},
    'pt': {},
    'de': {},
    'ru': {},
    'ko': {},
    'ja': {},
    'zh': {}
};

// =================================================================
// خريطة لربط رمز اللغة (HTML) برمز ملف الترجمة (مسار الخادم)
// =================================================================
const languageMap = {
    'ar': 'ar', 'en': 'en', 'fr': 'fr', 'es': 'sp', 'it': 'it', 'pt': 'pt',
    'de': 'ge', 'ru': 'ru', 'ko': 'ko', 'ja': 'ja', 'zh': 'ch' 
};

// =================================================================
// ربط العناصر من HTML
// =================================================================
const langSelect = document.getElementById('language-select');
const countrySelect = document.getElementById('country-select'); 
const generateBtn = document.getElementById('generate-plan-btn');
const planContent = document.getElementById('travel-plan-content');

// =================================================================
// وظائف التحكم في واجهة المستخدم (UI)
// =================================================================

/**
 * يملأ قائمة الدول المنسدلة بناءً على اللغة المختارة من الخريطة countryFileMap.
 */
function populateCountries() {
    const selectedLang = langSelect.value;
    const countries = countryFileMap[selectedLang] || {};
    
    countrySelect.innerHTML = '';
    
    // استخدام المفاتيح المترجمة للخيار الافتراضي
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = Object.keys(countries).length > 0 ? 
                                translations.country_placeholder[selectedLang] : 
                                translations.country_default[selectedLang];
    countrySelect.appendChild(defaultOption);

    // إضافة الدول المتاحة للغة المختارة وفرزها أبجدياً
    const locale = selectedLang === 'ar' ? 'ar' : 'en'; 
    
    Object.keys(countries).sort((a, b) => a.localeCompare(b, locale)).forEach(countryName => {
        const option = document.createElement('option');
        option.value = countryName;
        option.textContent = countryName;
        countrySelect.appendChild(option);
    });
    
    countrySelect.disabled = false;
    // يتم تفعيل زر الإنشاء إذا تم اختيار قيمة صالحة للدولة
    generateBtn.disabled = !countrySelect.value; 
}

// -----------------------------------------------------------------
// ربط الأحداث
// -----------------------------------------------------------------
langSelect.addEventListener('change', () => {
    const newLang = langSelect.value;
    translatePage(newLang); // 🆕 تنفيذ الترجمة
});

countrySelect.addEventListener('change', () => {
    generateBtn.disabled = !countrySelect.value;
});


// -----------------------------------------------------------------
// دالة بناء المسار
// -----------------------------------------------------------------
function buildFilePath(languageCode, selectedCountry) {
    const langKey = languageMap[languageCode];
    const countryData = countryFileMap[languageCode]?.[selectedCountry];

    if (!countryData || !langKey) return null;

    const { destType, group } = countryData;
    
    let fileName = `${langKey} group ${group}.json`; 
    
    return `${langKey}/${destType}/${fileName}`;
}

// -----------------------------------------------------------------
// دالة جلب وعرض الخطة (Fetch & Display)
// -----------------------------------------------------------------
async function fetchAndDisplayPlan() {
    const selectedLang = langSelect.value;
    const selectedCountry = countrySelect.value;
    const filePath = buildFilePath(selectedLang, selectedCountry);

    if (!filePath || !selectedCountry) {
        // يمكن ترجمة رسالة الخطأ هذه أيضاً
        planContent.innerHTML = '<p style="color: red;">خطأ: يرجى اختيار لغة ودولة صالحة.</p>';
        return;
    }

    planContent.innerHTML = `جاري تحميل خطة السفر لدولة ${selectedCountry}...`; 
    
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`تعذر تحميل بيانات السفر المطلوبة (Error 404). يرجى مراجعة اختيارك وهيكل المجلدات لملفات المجموعة.`);
        }

        const data = await response.json(); 
        
        const filteredData = filterDataByCountry(data, selectedCountry);
        
        displayPlan(filteredData);

    } catch (error) {
        let displayMessage = 'تعذر العثور على ملف البيانات. يرجى التأكد من أن الملف المترجم موجود في مكانه الصحيح على الخادم.';

        if (error.message.includes('JSON')) {
             displayMessage = 'حدث خطأ في قراءة ملف البيانات. قد يكون الملف غير صالح (JSON) أو تم تحميله بشكل غير صحيح.';
        } else if (error.message.includes('404')) {
             displayMessage = 'ملف بيانات الدولة غير موجود أو لا يمكن الوصول إليه. تأكد من وجود الملف في المسار الصحيح (مثلاً: ar/countriesA/ar group A.json).';
        }
       
        planContent.innerHTML = `<div style="background-color: #ffcccc; padding: 15px; border-radius: 5px;"><p style="color: #cc0000; font-weight: bold;">خطأ في تحميل البيانات:</p><p>${displayMessage}</p></div>`;
    }
}

// -----------------------------------------------------------------
// وظيفة فرعية لفلترة البيانات
// -----------------------------------------------------------------
function filterDataByCountry(data, countryName) {
    let plansData = data;
    
    if (typeof data === 'object' && data !== null && data.البيانات) {
        plansData = data.البيانات;
    }

    if (!Array.isArray(plansData) || plansData.length === 0) return [];
    
    const isStructure1Or3 = plansData.some(item => item.الدولة && item.المدن);

    if (isStructure1Or3) {
        return plansData.filter(item => item.الدولة === countryName);
    } else {
        const countryCities = plansData.filter(item => item.الدولة === countryName);
        
        if (countryCities.length === 0) return [];
        
        const countryObject = {
            الدولة: countryName,
            المدن: countryCities
        };
        return [countryObject];
    }
}

// -----------------------------------------------------------------
// وظائف تنسيق وعرض البيانات
// -----------------------------------------------------------------
function displayPlan(filteredData) {
    let htmlContent = '';
    const selectedLang = langSelect.value;
    const bodyDir = document.body.getAttribute('dir'); // لضمان تنسيق RTL/LTR

    if (!Array.isArray(filteredData) || filteredData.length === 0) {
        planContent.innerHTML = `<p>لا توجد بيانات سفر صالحة للدولة المختارة.</p>`;
        return;
    }

    filteredData.forEach(countryObj => {
        // نمرر الاتجاه إلى دالة التنسيق
        htmlContent += formatCountryPlan(countryObj, bodyDir);
    });

    planContent.innerHTML = htmlContent;
}

function formatCountryPlan(countryObj, dir) {
    let html = `<div class="country-plan" dir="${dir}">`;
    html += `<h2><i class="fas fa-flag"></i> ${countryObj.الدولة}</h2>`;
    
    if (countryObj.الوصف) {
        html += `<p class="description">${countryObj.الوصف}</p>`;
    }
    
    (countryObj.المدن || []).forEach(cityObj => {
        html += formatCityDetails(cityObj, dir);
    });
    
    html += `</div>`;
    return html;
}

function formatCityDetails(cityObj, dir) {
    const cityName = cityObj.المدينة الرئيسية || cityObj.المدينة || 'مدينة غير مسماة';
    
    const attractionsKey = cityObj['مناطق الجذب'] || cityObj['المعالم_التاريخية_والمعمارية'] || cityObj['المعالم التاريخية والمعمارية البارزة'];
    const activitiesKey = cityObj.الأنشطة || cityObj['أهم الأنشطة والتجارب السياحية'];
    const foodKey = cityObj.المأكولات || cityObj['المأكولات المحلية المشهورة'] || cityObj.المأكولات_المحلية;
    const natureKey = cityObj['المساحات الخضراء'] || cityObj.الساحات_الخضراء_والمناظر_الطبيعية || cityObj['المساحات الخضراء والمناظر الطبيعية'];
    
    let html = `<div class="city-details" dir="${dir}">`;
    html += `<h3><i class="fas fa-city"></i> ${cityName}</h3>`;
    
    // يجب ترجمة هذه العناوين أيضاً ولكنها لا تتطلب مفتاح data-key
    const titles = {
        'attractions': {ar: 'المعالم ومناطق الجذب', en: 'Landmarks and Attractions'},
        'activities': {ar: 'الأنشطة والتجارب', en: 'Activities and Experiences'},
        'food': {ar: 'المأكولات المحلية', en: 'Local Cuisine'},
        'nature': {ar: 'المساحات والمناظر الطبيعية', en: 'Green Spaces and Natural Scenery'}
    };
    const selectedLang = langSelect.value;
    const getTitle = (key) => titles[key][selectedLang] || titles[key].en;


    const formatDetail = (key, content, iconClass) => {
        const title = getTitle(key);
        if (content && content.trim() !== 'ابحث عن أطباق' && content.trim() !== 'ابحث عن أنشطة سياحية' && content.trim() !== '' && content.trim() !== 'ابحث عن ساحات خضراء' && content.trim() !== 'ابحث عن أطباق مشهورة') {
            const listItems = content.split(/[،,؛;]/).map(item => item.trim()).filter(item => item.length > 0);
            return `<p><i class="${iconClass}"></i> <strong>${title}:</strong></p><ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
        return '';
    };

    html += formatDetail('attractions', attractionsKey, 'fas fa-landmark');
    html += formatDetail('activities', activitiesKey, 'fas fa-walking');
    html += formatDetail('food', foodKey, 'fas fa-utensils');
    html += formatDetail('nature', natureKey, 'fas fa-tree');
    
    html += `</div>`;
    return html;
}


// =================================================================
// الإعداد الأولي عند تحميل الصفحة
// =================================================================

generateBtn.addEventListener('click', fetchAndDisplayPlan);
// عند التحميل، نقوم بتطبيق اللغة العربية كإعداد افتراضي
translatePage(langSelect.value);
