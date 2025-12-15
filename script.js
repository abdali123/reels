// =================================================================
// 🚀 تم إكمال هذه الخريطة بناءً على محتوى ملفاتك المرفقة لجعله يعمل 🚀
// =================================================================
const countryFileMap = {
    // -----------------------------------------------------------------
    //  اللغة العربية (ar)
    // -----------------------------------------------------------------
    'ar': {
        // [الدولة] : {نوع الوجهة: 'countriesA/B/inlands', مجموعة: 'A-J'}
        
        'أذربيجان': {destType: 'countriesA', group: 'A'}, // ar group A.json
        'إثيوبيا': {destType: 'countriesB', group: 'A'},  // ar group A.json
        'إيسلندا': {destType: 'inlands', group: 'A'},    // ar group A.json

        'موريتانيا': {destType: 'countriesB', group: 'B'}, // ar group B.json
        'بنغلاديش': {destType: 'countriesB', group: 'B'},  // ar group B.json
        'بوتان': {destType: 'countriesB', group: 'B'},    // ar group B.json
        'بنين': {destType: 'countriesB', group: 'B'},      // ar group B.json
        
        'تركيا': {destType: 'countriesA', group: 'C'}, // ar group C.json
        'مالي': {destType: 'countriesB', group: 'C'},  // ar group C.json
        
        'سلوفاكيا': {destType: 'countriesA', group: 'D'}, // ar group D.json
        'غيانا': {destType: 'countriesB', group: 'D'},    // ar group D.json
        
        'أوزبكستان': {destType: 'countriesA', group: 'E'}, // ar group E.json
        
        'العراق': {destType: 'countriesA', group: 'F'}, // ar group F.json
        'كوريا الجنوبية': {destType: 'countriesA', group: 'F'}, // ar group F.json
        'كوستاريكا': {destType: 'countriesA', group: 'F'}, // ar group F.json
        
        'كولومبيا': {destType: 'countriesB', group: 'G'}, // ar group G.json
        'منغوليا': {destType: 'countriesB', group: 'G'},  // ar group G.json

        'غابون': {destType: 'countriesB', group: 'H'}, // ar group H.json
        'كوسوفو': {destType: 'countriesA', group: 'H'}, // ar group H.json

        'البحرين': {destType: 'inlands', group: 'I'}, // ar group i.json

        'بوركينا فاسو': {destType: 'countriesB', group: 'J'}, // ar group J.json
        'الكاميرون': {destType: 'countriesB', group: 'J'},    // ar group J.json

    },
    // -----------------------------------------------------------------
    //  اللغة الإنجليزية (en) - يرجى إضافة الدول بالإنجليزية هنا لتفعيلها
    // -----------------------------------------------------------------
    'en': {
        // يجب إضافة ترجمة أسماء الدول هنا لتعمل باللغة الإنجليزية
        'Turkey': {destType: 'countriesA', group: 'C'},
        'Iraq': {destType: 'countriesA', group: 'F'},
        // مثال: 'Bahrain': {destType: 'inlands', group: 'I'},
    }
    // يجب إضافة كائنات اللغات الأخرى هنا عند ترجمتها
};
// =================================================================
// إعدادات المسارات واللغات (باستخدام اختصارات الحروف اللاتينية من السابق)
// =================================================================
const languageMap = {
    'ar': 'ar', 
    'en': 'en',
    'fr': 'fr',
    'es': 'es',
    'it': 'it',
    'pt': 'po', 
    'de': 'ge', 
    'ru': 'ru', 
    'ko': 'ko', 
    'ja': 'ja', 
    'zh': 'ch'  
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
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `-- اختر الدولة --`;
    countrySelect.appendChild(defaultOption);

    // إضافة الدول المتاحة للغة المختارة وفرزها أبجدياً
    // نستخدم 'ar' للفرز الأبجدي العربي إذا كانت اللغة عربية
    const locale = selectedLang === 'ar' ? 'ar' : 'en'; 
    
    Object.keys(countries).sort((a, b) => a.localeCompare(b, locale)).forEach(countryName => {
        const option = document.createElement('option');
        option.value = countryName;
        option.textContent = countryName;
        countrySelect.appendChild(option);
    });
    
    // تفعيل قائمة الدول وزر الإنشاء
    countrySelect.disabled = false;
    countrySelect.addEventListener('change', () => {
        generateBtn.disabled = !countrySelect.value;
    });
    
    generateBtn.disabled = true; 
}

// -----------------------------------------------------------------
// ربط أحداث تغيير اللغة لاختيار الدول المناسبة
// -----------------------------------------------------------------
langSelect.addEventListener('change', populateCountries);
populateCountries(); 

// =================================================================
// وظائف جلب البيانات ومعالجتها
// =================================================================

/**
 * يبني مسار ملف JSON بناءً على الدولة المختارة.
 */
function buildFilePath(languageCode, selectedCountry) {
    const langKey = languageMap[languageCode];
    const countryData = countryFileMap[languageCode]?.[selectedCountry];

    if (!countryData || !langKey) return null;

    const { destType, group } = countryData;
    
    // نمط اسم الملف الموحد: ar group A.json
    let fileName = `${langKey} group ${group}.json`; 
    
    // المسار النهائي: ar/countriesA/ar group A.json
    return `${langKey}/${destType}/${fileName}`;
}

/**
 * يجلب ملف JSON ويستعرض بيانات الدولة المختارة منه فقط.
 */
async function fetchAndDisplayPlan() {
    const selectedLang = langSelect.value;
    const selectedCountry = countrySelect.value;
    const filePath = buildFilePath(selectedLang, selectedCountry);

    if (!filePath || !selectedCountry) {
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
        
        // فلترة البيانات لعرض الدولة المختارة فقط
        const filteredData = filterDataByCountry(data, selectedCountry);
        
        displayPlan(filteredData);

    } catch (error) {
        let displayMessage = 'تعذر العثور على ملف البيانات. يرجى التأكد من أن الملف المترجم موجود في مكانه الصحيح على الخادم.';

        if (error.message.includes('JSON')) {
             displayMessage = 'حدث خطأ في قراءة ملف البيانات. قد يكون الملف غير صالح (JSON) أو تم تحميله بشكل غير صحيح.';
        } else if (error.message.includes('404')) {
             displayMessage = 'ملف بيانات الدولة غير موجود أو لا يمكن الوصول إليه. تأكد من وجود الملف في المسار الصحيح.';
        }
       
        planContent.innerHTML = `<div style="background-color: #ffcccc; padding: 15px; border-radius: 5px;"><p style="color: #cc0000; font-weight: bold;">خطأ في تحميل البيانات:</p><p>${displayMessage}</p></div>`;
    }
}

/**
 * وظيفة فرعية لفلترة البيانات المجلوبة بناءً على الدولة المختارة
 * حيث قد يحتوي ملف JSON واحد على بيانات لعدة دول.
 */
function filterDataByCountry(data, countryName) {
    let plansData = data;
    
    // معالجة الهيكل 3: الملفوف داخل كائن بمفتاح "البيانات"
    if (typeof data === 'object' && data !== null && data.البيانات) {
        plansData = data.البيانات;
    }

    if (!Array.isArray(plansData) || plansData.length === 0) return [];
    
    // الفلترة: تبحث عن كائنات الدولة التي تطابق الاسم
    // نتحقق من وجود المفتاح "المدن" لتحديد الهيكل (1 أو 3) مقابل الهيكل 2 (المفلطح)
    const isStructure1Or3 = plansData.some(item => item.الدولة && item.المدن);

    if (isStructure1Or3) {
        // الهيكل 1 و 3: فلترة قائمة الدول
        return plansData.filter(item => item.الدولة === countryName);
    } else {
        // الهيكل 2 (المفلطح): فلترة قائمة المدن، ثم تجميعها حول الدولة المختارة
        const countryCities = plansData.filter(item => item.الدولة === countryName);
        
        if (countryCities.length === 0) return [];
        
        // تجميعها في هيكل الدولة المنظم ليتوافق مع دالة formatCountryPlan
        const countryObject = {
            الدولة: countryName,
            المدن: countryCities
        };
        return [countryObject];
    }
}


// =================================================================
// وظائف تنسيق وعرض البيانات (تبقى كما هي)
// =================================================================

function displayPlan(filteredData) {
    let htmlContent = '';

    if (!Array.isArray(filteredData) || filteredData.length === 0) {
        planContent.innerHTML = `<p>لا توجد بيانات سفر صالحة للدولة المختارة.</p>`;
        return;
    }

    filteredData.forEach(countryObj => {
        htmlContent += formatCountryPlan(countryObj);
    });

    planContent.innerHTML = htmlContent;
}

function formatCountryPlan(countryObj) {
    let html = `<div class="country-plan">`;
    html += `<h2><i class="fas fa-flag"></i> ${countryObj.الدولة}</h2>`;
    
    if (countryObj.الوصف) {
        html += `<p class="description">${countryObj.الوصف}</p>`;
    }
    
    (countryObj.المدن || []).forEach(cityObj => {
        html += formatCityDetails(cityObj);
    });
    
    html += `</div>`;
    return html;
}

function formatCityDetails(cityObj) {
    const cityName = cityObj.المدينة الرئيسية || cityObj.المدينة || 'مدينة غير مسماة';
    
    // استخدام مفاتيح بديلة متعددة
    const attractionsKey = cityObj['مناطق الجذب'] || cityObj['المعالم_التاريخية_والمعمارية'] || cityObj['المعالم التاريخية والمعمارية البارزة'];
    const activitiesKey = cityObj.الأنشطة || cityObj['أهم الأنشطة والتجارب السياحية'];
    const foodKey = cityObj.المأكولات || cityObj['المأكولات المحلية المشهورة'] || cityObj.المأكولات_المحلية;
    const natureKey = cityObj['المساحات الخضراء'] || cityObj.الساحات_الخضراء_والمناظر_الطبيعية || cityObj['المساحات الخضراء والمناظر الطبيعية'];
    
    let html = `<div class="city-details">`;
    html += `<h3><i class="fas fa-city"></i> ${cityName}</h3>`;
    
    const formatDetail = (title, content, iconClass) => {
        if (content && content.trim() !== 'ابحث عن أطباق' && content.trim() !== 'ابحث عن أنشطة سياحية' && content.trim() !== '' && content.trim() !== 'ابحث عن ساحات خضراء' && content.trim() !== 'ابحث عن أطباق مشهورة') {
            const listItems = content.split(/[،,؛;]/).map(item => item.trim()).filter(item => item.length > 0);
            return `<p><i class="${iconClass}"></i> <strong>${title}:</strong></p><ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
        return '';
    };

    html += formatDetail('المعالم ومناطق الجذب', attractionsKey, 'fas fa-landmark');
    html += formatDetail('الأنشطة والتجارب', activitiesKey, 'fas fa-walking');
    html += formatDetail('المأكولات المحلية', foodKey, 'fas fa-utensils');
    html += formatDetail('المساحات والمناظر الطبيعية', natureKey, 'fas fa-tree');
    
    html += `</div>`;
    return html;
}

// =================================================================
// ربط الأحداث
// =================================================================

generateBtn.addEventListener('click', fetchAndDisplayPlan);
