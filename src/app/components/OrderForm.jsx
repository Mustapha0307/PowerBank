'use client';

import { useState, useEffect } from 'react';
import GalleryImg from './GalleryImg';
import DescriptionProduct from './DescriptionProduct';





export default function OrderForm() {
  const [message, setMessage] = useState('');
  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
    fetch('/cities.json')
      .then(res => res.json())
      .then(data => {
        setCitiesData(data.communes);
        const uniqueWilayas = [...new Set(data.communes.map(item => item.wilaya))].filter(w => w !== "اختر ولاية");
        setWilayas(uniqueWilayas);
      });
  }, []);

  useEffect(() => {
    if (selectedWilaya) {
      const filtered = citiesData.filter(item => item.wilaya === selectedWilaya && item.baladiya !== "إختر بلدية");
      setCommunes(filtered);
    } else {
      setCommunes([]);
    }
  }, [selectedWilaya]);

  useEffect(() => {
  if (selectedWilaya && selectedCommune) {
    const address = `${selectedWilaya} ==> ${selectedCommune}`;
    document.getElementById("address").value = address;
  }
}, [selectedWilaya, selectedCommune]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowMessage(true);


    setMessage("⏳ يرجى الانتظار حتى تأكيد الطلبية");

    const formData = new FormData(e.target);
    formData.set("wilayaValue", selectedWilaya);
    formData.set("communeValue", selectedCommune);

    const response = await fetch('/api/send-form', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      setMessage("✅ تم ارسال الطلبية بنجاح شكرا");
      
      setSelectedWilaya('');
      setSelectedCommune('');
      setTimeout(() => {
        e.target.reset();
        window.location.reload();
        setShowMessage(flase);
      },2800)
      setIsSubmitting(false);
    } else {
      setMessage("❌ حدث خطأ ما الرجاء المحاولة مرة اخرى");
      setTimeout(() => {
        setShowMessage(flase);
      },2000)
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className=" send-order" id="formContainer">
      <div className="forDesktopV">
        <div className="img">
        <div className="img-top">
          < GalleryImg />
        </div>
        <div className="img-bottom">
          < DescriptionProduct/>
        </div>
        </div>
       

        <form id="orderForm" name="orderForm" method="post" onSubmit={handleSubmit}>
          <label htmlFor="fullName">: الاسم الكامل</label>
          <input type="text" name="fullName" id="fullName" required />

          <label htmlFor="phone">: رقم الهاتف</label>
          <input type="text" name="phone" id="phone" required />


        <div className="adresseW">
          <label htmlFor="address">: العنوان</label>
          <div className="fullADRES">
                    <label htmlFor="wilaya">: الولاية</label>
          <select
            name="Wilaya"
            id="wilaya"
            value={selectedWilaya}
            onChange={(e) => setSelectedWilaya(e.target.value)}
            required
          >
            <option value="">-- اختر الولاية --</option>
            {wilayas.map((w, i) => (
              <option key={i} value={w}>{w}</option>
            ))}
          </select>
          <br />
          <input type="hidden" name="wilayaValue" value={selectedWilaya} />
          <br/>
         
          <label htmlFor="commune">: البلدية</label>
          <select
            name="Commune"
            id="commune"
            value={selectedCommune}
            onChange={(e) => setSelectedCommune(e.target.value)}
            required
          >
            <option value="">-- اختر البلدية --</option>
            {communes.map((c, i) => (
              <option key={i} value={c.baladiya}>{c.baladiya}</option>
            ))}
          </select>
          <input type="hidden" name="communeValue" value={selectedCommune} />
            </div>
          <input
            type="hidden"
            name="address"
            id="address"
            placeholder="! رجاءا ادخال الولاية و البلدية فقط"
            required
          />
          </div>

          {/* Hidden Status */}
          <input
            type="hidden"
            name="status"
            id="status result"
            value="Order waiting for confirmation"
          />

          {/* Message */}
          {showMessage && (
          <div
            id="messageContainer"
            style={{
                background:"#F0F9FF",
                color: "#0F5132",
                padding:"10px",
                marginTop:"15px",
                border:"2px solid #B6EFFB",
                borderRadius:"5px",
                textAlign: "center",
                animation: "fadein 0.5s ease-in",
                alignSelf: "center",
            }}
          >
            {message}
          </div>
          )}

          {!isSubmitting && ( <button type="submit" className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow' id="btnSO" >  ارسال الطلبية </button>)}
        </form>
      </div>
    </div>
    </>
  );
}
