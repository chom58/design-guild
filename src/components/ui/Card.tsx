'use client';

import React from 'react';
import { PlaceholderImage } from './PlaceholderImage';

export interface CreatorCardProps {
  id: string;
  name: string;
  profession: string;
  skills: Array<'graphic' | 'illustration' | 'branding'>;
  onClick?: (id: string) => void;
}

export const Card: React.FC<CreatorCardProps> = ({
  id,
  name,
  profession,
  skills,
  onClick
}) => {
  const skillColors = {
    graphic: 'bg-green-100 text-green-800 border-green-200',
    illustration: 'bg-purple-100 text-purple-800 border-purple-200',
    branding: 'bg-amber-100 text-amber-800 border-amber-200'
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1"
      onClick={handleClick}
    >
      {/* Portfolio Preview Image */}
      <div className="relative h-48 overflow-hidden flex items-center justify-center">
        <PlaceholderImage
          width={600}
          height={192}
          text="Portfolio"
          type="portfolio"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Creator Info */}
      <div className="p-4">
        {/* Profile Section */}
        <div className="flex items-center mb-3">
          <div className="rounded-full overflow-hidden mr-3 border-2 border-gray-200">
            <PlaceholderImage
              width={40}
              height={40}
              text={name.split(' ')[0]}
              type="profile"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
            <p className="text-gray-600 text-xs">{profession}</p>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1">
          {skills.map((skill) => (
            <span
              key={skill}
              className={`px-2 py-1 rounded-full text-xs font-medium border ${skillColors[skill]}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};