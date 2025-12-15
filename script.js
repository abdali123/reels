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
        'Turkey': {destType: 'countriesA', group: 'C'},
        'Iraq': {destType: 'countriesA', group: 'F'},
        // ... (أكمل باقي الدول بالإنجليزية)
    },
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
// تم تحديثها لتشمل جميع اللغات المطلوبة
// =================================================================
const languageMap = {
    'ar': 'ar', 
    'en': 'en',
    'fr': 'fr', // فرنسي
    'es': 'sp', // إسباني (مفترض أن رمز ملف الترجمة هو 'sp' أو 'es') - إذا كان 'es' يجب تغييره
    'it': 'it', // إيطالي
    'pt': 'pt', // برتغالي
    'de': 'ge', // ألماني (مفترض أن رمز ملف الترجمة هو 'ge' أو 'de')
    'ru': 'ru', // روسي
    'ko': 'ko', // كوري
    'ja': 'ja', // ياباني
    'zh': 'ch'  // صيني (مفترض أن رمز ملف الترجمة هو 'ch' أو 'zh')
};


// =================================================================
// ربط العناصر من HTML (باقي الوظائف تبقى كما هي)
// =================================================================
const langSelect = document.getElementById('language-select');
const countrySelect = document.getElementById('country-select'); 
const generateBtn = document.getElementById('generate-plan-btn');
const planContent = document.getElementById('travel-plan-content');

// ... (باقي الدوال: populateCountries، buildFilePath، fetchAndDisplayPlan، filterDataByCountry، displayPlan، formatCountryPlan، formatCityDetails) ...
// (ملاحظة: الدوال في الأسفل لم تتغير، يمكنك استخدامها كما هي من الرد السابق مع إضافة الـ languageMap الجديد)

/**
 * يملأ قائمة الدول المنسدلة بناءً على اللغة المختارة من الخريطة countryFileMap.
 */
function populateCountries() {
    const selectedLang = langSelect.value;
    const countries = countryFileMap[selectedLang] || {};
    
    countrySelect.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = (selectedLang === 'ar') ? `-- اختر الدولة --` : 
                               (selectedLang === 'en') ? `-- Select Country --` : 
                               `-- Select Country --`; // يمكن إضافة ترجمة لكل لغة
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
    countrySelect.addEventListener('change', () => {
        generateBtn.disabled = !countrySelect.value;
    });
    
    generateBtn.disabled = true; 
}

/**
 * يبني مسار ملف JSON بناءً على الدولة المختارة.
 */
function buildFilePath(languageCode, selectedCountry) {
    const langKey = languageMap[languageCode];
    const countryData = countryFileMap[languageCode]?.[selectedCountry];

    if (!countryData || !langKey) return null;

    const { destType, group } = countryData;
    
    let fileName = `${langKey} group ${group}.json`; 
    
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

/**
 * وظيفة فرعية لفلترة البيانات المجلوبة بناءً على الدولة المختارة
 */
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
langSelect.addEventListener('change', populateCountries);
populateCountries();
