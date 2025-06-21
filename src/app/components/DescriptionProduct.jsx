import React from 'react';
import './Style/DescriptionProduct.css'; 

export default function ProductDescription() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-gray-800 space-y-4">
      <h1 className="text-2xl font-bold text-center text-green-600">
        🔋 خليك مشحون وين ما كنت!
      </h1>

      <h2 className="text-lg text-center font-medium text-gray-700">
        باور بانك HOCO سريع وقوي بسعة 20000mAh
      </h2>

      <ul className="list-disc list-inside space-y-1">
        <li>✅ سعة حقيقية: <strong>20000mAh</strong></li>
        <li>✅ شحن سريع <strong>22.5W</strong> – تقنيات PD & QC 3.0</li>
        <li>✅ يشحن 3 أجهزة في نفس الوقت!</li>
        <li>✅ مؤشرات LED لعرض الطاقة</li>
        <li>✅ هيكل قوي – مقاوم للصدمات</li>
        <li>✅ حماية من الحرارة والجهد الزائد</li>
      </ul>

      <div className="bg-green-50 p-4 rounded-lg shadow-inner text-center space-y-2">
        <p className="text-xl font-semibold text-green-700">💰 السعر الحالي: 4200 دج</p>
        <p className="text-sm text-gray-600">🚚 التوصيل مجاني • 💵 الدفع عند الاستلام</p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow">
          أطلب الآن
        </button>
      </div>
    </div>
  );
}
