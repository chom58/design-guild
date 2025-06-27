'use client';

import React, { useState } from 'react';
import { Portfolio } from '@/lib/types';
import { PlaceholderImage } from './PlaceholderImage';

interface PortfolioGalleryProps {
  portfolio: Portfolio[];
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ portfolio }) => {
  const [selectedImage, setSelectedImage] = useState<Portfolio | null>(null);

  const openImageViewer = (item: Portfolio) => {
    setSelectedImage(item);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
            onClick={() => openImageViewer(item)}
          >
            <div className="relative h-48 overflow-hidden">
              <PlaceholderImage
                width={400}
                height={192}
                text={item.title}
                type="portfolio"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={closeImageViewer}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={closeImageViewer}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative h-96 bg-gray-100 flex items-center justify-center">
                <PlaceholderImage
                  width={800}
                  height={400}
                  text={selectedImage.title}
                  type="portfolio"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedImage.title}</h2>
                <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};