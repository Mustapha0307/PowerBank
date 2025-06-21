'use client';
import { useState } from 'react';
import './Style/GalleryImg.css';

const images = [
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg',
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="p-4">
      {/* الصورة الكبيرة */}
      <div className="mb-4">
        <img
          src={selectedImage}
          alt="الصورة المختارة"
          className="w-full max-h-80 object-contain rounded-xl shadow-lg transition-all duration-300"
        />
      </div>

      {/* قائمة الصور المصغرة - scroll touch */}
      <div className="flex overflow-x-auto gap-2 scrollbar-hide">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`صورة ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`h-24 w-32 object-cover flex-shrink-0 cursor-pointer rounded-lg border-4 ${
              selectedImage === img ? 'border-blue-500' : 'border-transparent'
            } hover:opacity-80 transition`}
          />
        ))}
      </div>
    </div>
  );
}
