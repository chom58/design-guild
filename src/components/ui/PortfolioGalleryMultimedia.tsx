'use client';

import React, { useState } from 'react';
import { Portfolio } from '@/lib/types';
import { MultiMediaViewer } from './MultiMediaViewer';

interface PortfolioGalleryMultimediaProps {
  portfolio: Portfolio[];
}

export const PortfolioGalleryMultimedia: React.FC<PortfolioGalleryMultimediaProps> = ({ portfolio }) => {
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null);

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'audio':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case '3d':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <MultiMediaViewer portfolio={item} isModal={false} />
              
              {/* Media type indicator overlay */}
              {item.type !== 'image' && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2">
                  {getMediaIcon(item.type)}
                </div>
              )}
              
              {/* Duration overlay for videos/audio */}
              {item.duration && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                  {item.duration}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <span className="capitalize">{item.type}</span>
                {item.dimensions && (
                  <span className="ml-2">• {item.dimensions.width}x{item.dimensions.height}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Media Content */}
              <div className="bg-gray-100">
                <MultiMediaViewer portfolio={selectedItem} isModal={true} />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="capitalize flex items-center">
                        {getMediaIcon(selectedItem.type)}
                        <span className="ml-2">{selectedItem.type}</span>
                      </span>
                      {selectedItem.duration && (
                        <span>再生時間: {selectedItem.duration}</span>
                      )}
                      {selectedItem.dimensions && (
                        <span>{selectedItem.dimensions.width}x{selectedItem.dimensions.height}px</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Download/View button */}
                  {selectedItem.url && selectedItem.type !== 'video' && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      開く
                    </a>
                  )}
                </div>
                
                <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};