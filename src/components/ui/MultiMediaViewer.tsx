'use client';

import React from 'react';
import { Portfolio } from '@/lib/types';
import { PlaceholderImage } from './PlaceholderImage';

interface MultiMediaViewerProps {
  portfolio: Portfolio;
  isModal?: boolean;
}

export const MultiMediaViewer: React.FC<MultiMediaViewerProps> = ({ portfolio, isModal = false }) => {
  const renderMedia = () => {
    switch (portfolio.type) {
      case 'image':
        return (
          <div className={isModal ? "w-full h-full flex items-center justify-center" : "w-full h-48"}>
            {portfolio.url ? (
              <img 
                src={portfolio.url} 
                alt={portfolio.title}
                className={isModal ? "max-w-full max-h-full object-contain" : "w-full h-full object-cover"}
              />
            ) : (
              <PlaceholderImage
                width={isModal ? 800 : 400}
                height={isModal ? 600 : 192}
                text={portfolio.title}
                type="portfolio"
                className="w-full h-full"
              />
            )}
          </div>
        );

      case 'video':
        if (portfolio.embedUrl) {
          // YouTube or Vimeo embed
          return (
            <div className={isModal ? "w-full aspect-video" : "w-full h-48"}>
              <iframe
                src={portfolio.embedUrl}
                title={portfolio.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        } else if (portfolio.url) {
          // Direct video file
          return (
            <video 
              controls 
              className={isModal ? "w-full max-h-[70vh]" : "w-full h-48 object-cover"}
            >
              <source src={portfolio.url} />
              お使いのブラウザは動画タグをサポートしていません。
            </video>
          );
        }
        break;

      case 'pdf':
        return (
          <div className={isModal ? "w-full h-[80vh]" : "w-full h-48 relative"}>
            {isModal ? (
              <iframe
                src={portfolio.url}
                title={portfolio.title}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-500">PDF Document</span>
              </div>
            )}
          </div>
        );

      case 'audio':
        return (
          <div className={isModal ? "w-full p-8" : "w-full h-48 bg-gray-100 flex items-center justify-center p-4"}>
            <div className="w-full max-w-md">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <audio controls className="w-full">
                <source src={portfolio.url} />
                お使いのブラウザはオーディオタグをサポートしていません。
              </audio>
              {portfolio.duration && (
                <p className="text-sm text-gray-500 text-center mt-2">再生時間: {portfolio.duration}</p>
              )}
            </div>
          </div>
        );

      case '3d':
        return (
          <div className={isModal ? "w-full h-[70vh]" : "w-full h-48 bg-gray-100 flex items-center justify-center"}>
            {isModal && portfolio.embedUrl ? (
              <iframe
                src={portfolio.embedUrl}
                title={portfolio.title}
                className="w-full h-full"
                allow="fullscreen; autoplay; vr"
              />
            ) : (
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-sm text-gray-500">3D Model</span>
                {isModal && (
                  <p className="text-xs text-gray-400 mt-2">クリックして3Dビューアで開く</p>
                )}
              </div>
            )}
          </div>
        );

      default:
        return (
          <PlaceholderImage
            width={isModal ? 800 : 400}
            height={isModal ? 600 : 192}
            text={portfolio.title}
            type="portfolio"
            className="w-full h-full"
          />
        );
    }
  };

  return renderMedia();
};