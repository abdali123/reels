// =================================================================
// إعدادات المسارات واللغات
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

const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// =================================================================
// ربط العناصر من HTML
// =================================================================
const langSelect = document.getElementById('language-select');
const destTypeSelect = document.getElementById('destination-type-select');
const groupSelect = document.getElementById('group-select');
const generateBtn = document.getElementById('generate-plan-btn');
const planContent = document.getElementById('travel-plan-content');

// =================================================================
// وظائف التحكم في واجهة المستخدم (UI)
// =================================================================

function populateGroups() {
    groupSelect.innerHTML = ''; 
    groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = `المجموعة ${group}`;
        groupSelect.appendChild(option);
    });
}

populateGroups();
destTypeSelect.addEventListener('change', populateGroups);

// =================================================================
// 🚨 الوظيفة المُحدَّثة لبناء مسار الملف (تستخدم مجلد اللغة كجذر)
// =================================================================

function buildFilePath(languageCode, destinationType, group) {
    let langKey = languageMap[languageCode]; // ar, en, fr...

    // نمط اسم الملف للدول: ar group A.json
    let baseFileName = `${langKey} group ${group}.json`; 
    
    // مسار ملفات الدول (Countries A & B)
    if (destinationType === 'countriesA' || destinationType === 'countriesB') {
        // المسار الجديد: ar/countriesA/ar group A.json
        return `${langKey}/${destinationType}/${baseFileName}`;
    } 
    // مسار ملفات الجزر (Inlands)
    else if (destinationType === 'inlands') {
        // نمط اسم ملف الجزر: inlands A.json (بافتراض أن الاسم لا يحتوي على رمز اللغة)
        let inlandsFileName = `inlands ${group}.json`; 
        
        // المسار الجديد: ar/inlands/inlands A.json
        return `${langKey}/inlands/${inlandsFileName}`;
        
        // **إذا كان اسم ملف الجزر لديك يحتوي على رمز اللغة (مثل ar group A.json) استخدم هذا:**
        // return `${langKey}/inlands/${baseFileName}`;
    }

    return null; 
}

// =================================================================
// وظائف جلب البيانات ومعالجتها
// =================================================================

async function fetchAndDisplayPlan() {
    const selectedLang = langSelect.value;
    const selectedDestType = destTypeSelect.value;
    const selectedGroup = groupSelect.value;
    const filePath = buildFilePath(selectedLang, selectedDestType, selectedGroup);

    if (!filePath) {
        planContent.innerHTML = '<p style="color: red;">خطأ: لم يتم تحديد مسار ملف صالح.</p>';
        return;
    }

    planContent.innerHTML = `جاري تحميل الخطة من: <code>${filePath}</code> ...`;
    
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            const langName = langSelect.options[langSelect.selectedIndex].text;
            throw new Error(`تعذر العثور على الملف (404). يرجى التأكد من وجود ملف خطة السفر المترجم في المسار التالي: [${filePath}]`);
        }

        const data = await response.json(); 
        
        displayPlan(data);

    } catch (error) {
        planContent.innerHTML = `<div style="background-color: #ffcccc; padding: 15px; border-radius: 5px;"><p style="color: #cc0000; font-weight: bold;">خطأ في تحميل البيانات:</p><pre>${error.message}</pre></div>`;
    }
}

// =================================================================
// وظائف تنسيق وعرض البيانات (متعدد الهياكل)
// =================================================================
// هذه الوظائف مصممة للتعامل مع جميع هياكل JSON التي قمت بمشاركتها.

function displayPlan(data) {
    let htmlContent = '';
    let plansData = data;

    // معالجة الهيكل 3: الملفوف داخل كائن بمفتاح "البيانات"
    if (typeof data === 'object' && data !== null && data.البيانات) {
        plansData = data.البيانات;
    }

    if (!Array.isArray(plansData) || plansData.length === 0) {
        planContent.innerHTML = `<p>لا توجد بيانات سفر صالحة في هذا الملف.</p>`;
        return;
    }

    // تهيئة البيانات: تحويل جميع الهياكل إلى قائمة موحدة من الدول والمدن
    
    // الهيكل 1 و 3 (منظمة حسب الدولة ثم المدن)
    if (plansData[0].الدولة && plansData[0].المدن) {
        plansData.forEach(countryObj => {
            htmlContent += formatCountryPlan(countryObj);
        });
    } 
    // الهيكل 2 (مفلطحة، كل عنصر هو مدينة)
    else if (plansData[0].الدولة && plansData[0].المدينة) {
        const groupedByCountry = plansData.reduce((acc, cityObj) => {
            const country = cityObj.الدولة;
            if (!acc[country]) {
                acc[country] = { الدولة: country, المدن: [] };
            }
            acc[country].المدن.push(cityObj);
            return acc;
        }, {});

        Object.values(groupedByCountry).forEach(countryObj => {
            htmlContent += formatCountryPlan(countryObj);
        });
    } else {
        htmlContent = `<p>هيكل ملف JSON غير متوقع. لم يتمكن النظام من عرضه.</p>`;
    }

    planContent.innerHTML = htmlContent;
}

// دالة فرعية لتنسيق خطة دولة واحدة
function formatCountryPlan(countryObj) {
    let html = `<div class="country-plan">`;
    html += `<h2><i class="fas fa-flag"></i> ${countryObj.الدولة}</h2>`;
    
    // إضافة الوصف إذا كان موجودًا 
    if (countryObj.الوصف) {
        html += `<p class="description">${countryObj.الوصف}</p>`;
    }
    
    // التكرار على المدن داخل الدولة
    (countryObj.المدن || []).forEach(cityObj => {
        html += formatCityDetails(cityObj);
    });
    
    html += `</div>`;
    return html;
}

// دالة فرعية لتنسيق تفاصيل مدينة واحدة
function formatCityDetails(cityObj) {
    // محاولة الحصول على اسم المدينة من عدة مفاتيح محتملة
    const cityName = cityObj.المدينة الرئيسية || cityObj.المدينة || 'مدينة غير مسماة';
    
    // محاولة الحصول على البيانات من عدة مفاتيح محتملة 
    const attractionsKey = cityObj['مناطق الجذب'] || cityObj['المعالم_التاريخية_والمعمارية'] || cityObj['المعالم التاريخية والمعمارية البارزة'];
    const activitiesKey = cityObj.الأنشطة || cityObj['أهم الأنشطة والتجارب السياحية'];
    const foodKey = cityObj.المأكولات || cityObj['المأكولات المحلية المشهورة'] || cityObj.المأكولات_المحلية;
    const natureKey = cityObj['المساحات الخضراء'] || cityObj.الساحات_الخضراء_والمناظر_الطبيعية || cityObj['المساحات الخضراء والمناظر الطبيعية'];
    
    let html = `<div class="city-details">`;
    html += `<h3><i class="fas fa-city"></i> ${cityName}</h3>`;
    
    // دالة مساعدة لتنسيق البيانات كقائمة
    const formatDetail = (title, content, iconClass) => {
        // التحقق من وجود محتوى ومن عدم كونه عبارة "ابحث عن..." فارغة
        if (content && content.trim() !== 'ابحث عن أطباق' && content.trim() !== 'ابحث عن أنشطة سياحية' && content.trim() !== '' && content.trim() !== 'ابحث عن ساحات خضراء') {
             // تقسيم المحتوى باستخدام فواصل مختلفة
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

// ربط زر "إنشاء خطة السفر" بالوظيفة
generateBtn.addEventListener('click', fetchAndDisplayPlan);