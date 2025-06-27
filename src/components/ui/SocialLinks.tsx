import React from 'react';

interface SocialLinksProps {
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ social }) => {
  const socialPlatforms = [
    {
      name: 'Twitter',
      key: 'twitter' as keyof typeof social,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
      baseUrl: 'https://twitter.com/',
      color: 'hover:bg-blue-500 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'Instagram',
      key: 'instagram' as keyof typeof social,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      baseUrl: 'https://instagram.com/',
      color: 'hover:bg-pink-500 hover:text-white',
      bgColor: 'bg-pink-50 text-pink-600'
    },
    {
      name: 'LinkedIn',
      key: 'linkedin' as keyof typeof social,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      baseUrl: 'https://linkedin.com/in/',
      color: 'hover:bg-blue-700 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-700'
    },
    {
      name: 'Website',
      key: 'website' as keyof typeof social,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      baseUrl: '',
      color: 'hover:bg-gray-600 hover:text-white',
      bgColor: 'bg-gray-50 text-gray-600'
    }
  ];

  const activePlatforms = socialPlatforms.filter(platform => social[platform.key]);

  if (activePlatforms.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {activePlatforms.map((platform) => {
        const value = social[platform.key];
        if (!value) return null;

        const url = platform.key === 'website' ? value : `${platform.baseUrl}${value}`;

        return (
          <a
            key={platform.name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${platform.bgColor} ${platform.color}`}
            aria-label={`${platform.name}で${platform.key === 'website' ? 'ウェブサイトを' : 'フォローする'}`}
          >
            {platform.icon}
            <span className="ml-2">{platform.name}</span>
          </a>
        );
      })}
    </div>
  );
};