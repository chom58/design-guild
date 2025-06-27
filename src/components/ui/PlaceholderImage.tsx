import React from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text: string;
  type?: 'profile' | 'portfolio' | 'hero' | 'event' | 'default';
  className?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  text,
  type = 'default',
  className = ''
}) => {
  const gradients = {
    profile: {
      from: '#3b82f6',
      to: '#1e40af',
      textColor: '#ffffff'
    },
    portfolio: {
      from: '#8b5cf6',
      to: '#5b21b6',
      textColor: '#ffffff'
    },
    hero: {
      from: '#06b6d4',
      to: '#0891b2',
      textColor: '#ffffff'
    },
    event: {
      from: '#f59e0b',
      to: '#d97706',
      textColor: '#ffffff'
    },
    default: {
      from: '#6b7280',
      to: '#4b5563',
      textColor: '#ffffff'
    }
  };

  const gradient = gradients[type] || gradients.default;
  // テキストとサイズからハッシュを生成してIDを作成（SSR対応）
  const createStableId = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit整数に変換
    }
    return Math.abs(hash).toString(36);
  };
  const gradientId = `gradient-${type}-${createStableId(text + width + height)}`;

  return (
    <svg 
      width={width} 
      height={height} 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: gradient.from, stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: gradient.to, stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${gradientId})`}/>
      <circle cx="50%" cy="40%" r="20" fill="rgba(255,255,255,0.2)" opacity="0.5"/>
      <rect x="30%" y="65%" width="40%" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
      <rect x="35%" y="72%" width="30%" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
      <text 
        x="50%" 
        y="85%" 
        fontFamily="Arial, sans-serif" 
        fontSize="12" 
        fontWeight="500" 
        fill={gradient.textColor} 
        textAnchor="middle" 
        dy=".3em"
      >
        {text}
      </text>
    </svg>
  );
};