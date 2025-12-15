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
// وظيفة بناء مسار الملف (تستخدم الهيكل الجديد: [رمز اللغة]/[نوع الوجهة]/[اسم الملف])
// =================================================================

function buildFilePath(languageCode, destinationType, group) {
    let langKey = languageMap[languageCode]; 
    
    // نمط اسم الملف الموحد: ar group A.json (بناءً على ملفاتك المرفقة)
    let fileName = `${langKey} group ${group}.json`; 
    
    // المسار النهائي: ar/countriesA/ar group A.json
    return `${langKey}/${destinationType}/${fileName}`;
}

// =================================================================
// وظائف جلب البيانات ومعالجتها (تم تعديل رسائل العرض)
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

    // 🔴 التعديل: إزالة مسار الملف من رسالة التحميل المرئية
    planContent.innerHTML = `جاري تحميل خطة السفر...`; 
    
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            // 🔴 التعديل: إزالة تفاصيل المسار من رسالة الخطأ للمستخدم
            throw new Error(`تعذر تحميل بيانات السفر المطلوبة (Error 404). يرجى مراجعة اختيارك وهيكل المجلدات لملفات المجموعة.`);
        }

        const data = await response.json(); 
        
        displayPlan(data);

    } catch (error) {
        // 🔴 التعديل: عرض رسالة خطأ عامة ومهنية
        let displayMessage = error.message;

        if (error.message.includes('404')) {
             displayMessage = 'تعذر العثور على ملف البيانات. يرجى التأكد من أن الملف المترجم موجود في مكانه الصحيح على الخادم.';
        } else if (error.message.includes('JSON')) {
             displayMessage = 'حدث خطأ في قراءة ملف البيانات. قد يكون الملف غير صالح (JSON) أو تم تحميله بشكل غير صحيح.';
        }
       

        planContent.innerHTML = `<div style="background-color: #ffcccc; padding: 15px; border-radius: 5px;"><p style="color: #cc0000; font-weight: bold;">خطأ في تحميل البيانات:</p><p>${displayMessage}</p></div>`;
    }
}

// =================================================================
// وظائف تنسيق وعرض البيانات (متعدد الهياكل)
// =================================================================

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
    
    if (countryObj.الوصف) {
        html += `<p class="description">${countryObj.الوصف}</p>`;
    }
    
    (countryObj.المدن || []).forEach(cityObj => {
        html += formatCityDetails(cityObj);
    });
    
    html += `</div>`;
    return html;
}

// دالة فرعية لتنسيق تفاصيل مدينة واحدة
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
        if (content && content.trim() !== 'ابحث عن أطباق' && content.trim() !== 'ابحث عن أنشطة سياحية' && content.trim() !== '' && content.trim() !== 'ابحث عن ساحات خضراء') {
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
