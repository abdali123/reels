// =================================================================
// 🚨 خطوة يجب على المستخدم إكمالها 🚨
// خريطة لربط اسم الدولة بالملف الذي يحتوي على بياناتها.
// يجب ملء هذه الخريطة بجميع الدول الموجودة في ملفاتك المترجمة.
// (Dest Type) هي [countriesA, countriesB, inlands] و (Group) هي [A, B, C, ... J]
// =================================================================
const countryFileMap = {
    // -----------------------------------------------------------------
    //  اللغة العربية (ar)
    // -----------------------------------------------------------------
    'ar': {
        // [الدولة] : {نوع الوجهة: 'countriesA/B/inlands', مجموعة: 'A-J'}
        
        // البيانات المستخلصة من الملفات المرفقة:
        
        // من ar group A.json
        'أذربيجان': {destType: 'countriesA', group: 'A'},
        'إثيوبيا': {destType: 'countriesB', group: 'A'},
        'إيسلندا': {destType: 'inlands', group: 'A'}, // تم تعديل نوع الوجهة بناءً على الطلب السابق للجزر

        // من ar group B.json
        'موريتانيا': {destType: 'countriesB', group: 'B'},
        'بنغلاديش': {destType: 'countriesB', group: 'B'},
        'بوتان': {destType: 'countriesB', group: 'B'},
        'بنين': {destType: 'countriesB', group: 'B'},
        
        // من ar group C.json
        'تركيا': {destType: 'countriesA', group: 'C'},
        'مالي': {destType: 'countriesB', group: 'C'},
        
        // من ar group D.json
        'سلوفاكيا': {destType: 'countriesA', group: 'D'},
        'غيانا': {destType: 'countriesB', group: 'D'},
        
        // من ar group E.json 
        // ملاحظة: الملف E به بيانات أوزبكستان فقط ولكننا نستخدم المجموعة A في الكود السابق. نفترض أنها كانت خطأ مطبعي.
        'أوزبكستان': {destType: 'countriesA', group: 'E'}, 
        
        // من ar group F.json
        'العراق': {destType: 'countriesA', group: 'F'},
        'كوريا الجنوبية': {destType: 'countriesA', group: 'F'},
        'كوستاريكا': {destType: 'countriesA', group: 'F'},
        
        // من ar group G.json
        'كولومبيا': {destType: 'countriesB', group: 'G'},
        'منغوليا': {destType: 'countriesB', group: 'G'},

        // من ar group H.json
        'غابون': {destType: 'countriesB', group: 'H'},
        'كوسوفو': {destType: 'countriesA', group: 'H'},

        // من ar group i.json (ملف البحرين وإثيوبيا)
        'البحرين': {destType: 'inlands', group: 'I'},
        // إثيوبيا مكررة في A، لكن سنحتفظ بها في A للحفاظ على توازن مجموعات الملفات.

        // من ar group J.json
        'بوركينا فاسو': {destType: 'countriesB', group: 'J'},
        'الكاميرون': {destType: 'countriesB', group: 'J'},

        // 🛠️ يرجى إضافة بقية الدول من ملفاتك هنا 🛠️
    },
    // -----------------------------------------------------------------
    //  اللغة الإنجليزية (en) - يرجى استخدام أسماء الدول بالإنجليزية
    // -----------------------------------------------------------------
    'en': {
        // مثال - يجب ملء هذه بالأسماء الإنجليزية المقابلة لنفس الملفات
        'Turkey': {destType: 'countriesA', group: 'C'},
        'Iraq': {destType: 'countriesA', group: 'F'},
        // 🛠️ يرجى إضافة بقية الدول باللغة الإنجليزية هنا 🛠️
    }
    // يرجى إضافة كائنات اللغات الأخرى هنا عند ترجمتها
};
// =================================================================
// نهاية خطوة إكمال الخريطة
// =================================================================


// =================================================================
// ربط العناصر من HTML
// =================================================================
const langSelect = document.getElementById('language-select');
const countrySelect = document.getElementById('country-select'); // 🆕
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

    // إضافة الدول المتاحة للغة المختارة
    Object.keys(countries).sort((a, b) => a.localeCompare(b, 'ar')).forEach(countryName => {
        const option = document.createElement('option');
        option.value = countryName;
        option.textContent = countryName;
        countrySelect.appendChild(option);
    });
    
    // تفعيل قائمة الدول وزر الإنشاء
    countrySelect.disabled = false;
    countrySelect.addEventListener('change', () => {
        // يتم تفعيل زر الإنشاء إذا تم اختيار قيمة صالحة للدولة
        generateBtn.disabled = !countrySelect.value;
    });
    
    // تأكد من أن زر الإنشاء معطل في البداية
    generateBtn.disabled = true; 
}

// -----------------------------------------------------------------
// ربط أحداث تغيير اللغة لاختيار الدول المناسبة
// -----------------------------------------------------------------
langSelect.addEventListener('change', populateCountries);
// ملء القائمة بالدول العربية عند تحميل الصفحة لأول مرة
populateCountries(); 

// =================================================================
// وظائف جلب البيانات ومعالجتها
// =================================================================

/**
 * يبني مسار ملف JSON بناءً على الدولة المختارة.
 */
function buildFilePath(languageCode, selectedCountry) {
    // هذه الخريطة تحتاج إلى التعديل لتضم رموز اللغات الأخرى التي تستخدمها
    const languageMap = {
        'ar': 'ar', 
        'en': 'en',
        // أضف البقية هنا إذا لزم الأمر: 'fr': 'fr', 'es': 'es', إلخ
    };

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
            // رسالة خطأ مهنية بدون مسارات
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
             displayMessage = 'ملف بيانات الدولة غير موجود أو لا يمكن الوصول إليه.';
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
    // نحاول الحصول على اسم المدينة من أي مفتاح متاح
    const cityName = cityObj.المدينة الرئيسية || cityObj.المدينة || 'مدينة غير مسماة';
    
    // استخدام مفاتيح بديلة متعددة
    const attractionsKey = cityObj['مناطق الجذب'] || cityObj['المعالم_التاريخية_والمعمارية'] || cityObj['المعالم التاريخية والمعمارية البارزة'];
    const activitiesKey = cityObj.الأنشطة || cityObj['أهم الأنشطة والتجارب السياحية'];
    const foodKey = cityObj.المأكولات || cityObj['المأكولات المحلية المشهورة'] || cityObj.المأكولات_المحلية;
    const natureKey = cityObj['المساحات الخضراء'] || cityObj.الساحات_الخضراء_والمناظر_الطبيعية || cityObj['المساحات الخضراء والمناظر الطبيعية'];
    
    let html = `<div class="city-details">`;
    html += `<h3><i class="fas fa-city"></i> ${cityName}</h3>`;
    
    const formatDetail = (title, content, iconClass) => {
        // التحقق من وجود محتوى ومن عدم كونه عبارة "ابحث عن..." فارغة
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
