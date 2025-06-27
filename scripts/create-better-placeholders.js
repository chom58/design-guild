const fs = require('fs');
const path = require('path');

// Enhanced SVG placeholder generator with gradients and better design
function createEnhancedSVGPlaceholder(width, height, text, type = 'default') {
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
  const gradientId = `gradient-${type}-${Math.random().toString(36).substr(2, 9)}`;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${gradient.from};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${gradient.to};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#${gradientId})"/>
    <circle cx="50%" cy="40%" r="20" fill="rgba(255,255,255,0.2)" opacity="0.5"/>
    <rect x="30%" y="65%" width="40%" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
    <rect x="35%" y="72%" width="30%" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
    <text x="50%" y="85%" font-family="Arial, sans-serif" font-size="12" font-weight="500" fill="${gradient.textColor}" text-anchor="middle" dy=".3em">${text}</text>
  </svg>`;
}

// Create better placeholders
async function createBetterPlaceholders() {
  console.log('🎨 Creating enhanced placeholder images...');

  // Creator profiles with gradient backgrounds
  const creators = [
    { name: 'tanaka', displayName: '田中 美咲' },
    { name: 'sato', displayName: '佐藤 健太' },
    { name: 'yamada', displayName: '山田 あかり' },
    { name: 'suzuki', displayName: '鈴木 翔太' },
    { name: 'takahashi', displayName: '高橋 みゆき' },
    { name: 'nakamura', displayName: '中村 大輔' }
  ];

  console.log('Creating enhanced creator profile images...');
  creators.forEach((creator, index) => {
    const filepath = path.join(__dirname, '..', 'public', 'images', 'creators', `${creator.name}.svg`);
    const svg = createEnhancedSVGPlaceholder(400, 400, creator.displayName, 'profile');
    fs.writeFileSync(filepath, svg);
    console.log(`✓ Created enhanced ${creator.name}.svg`);
  });

  // Portfolio images
  const portfolios = [
    { name: 'brand1', title: 'Brand Identity' },
    { name: 'character1', title: 'Character Design' },
    { name: 'strategy1', title: 'Brand Strategy' },
    { name: 'mobile1', title: 'Mobile UI' },
    { name: 'watercolor1', title: 'Watercolor Art' },
    { name: 'consulting1', title: 'Consulting' }
  ];

  console.log('Creating enhanced portfolio images...');
  portfolios.forEach((portfolio) => {
    const filepath = path.join(__dirname, '..', 'public', 'images', 'portfolio', `${portfolio.name}.svg`);
    const svg = createEnhancedSVGPlaceholder(600, 400, portfolio.title, 'portfolio');
    fs.writeFileSync(filepath, svg);
    console.log(`✓ Created enhanced ${portfolio.name}.svg`);
  });

  // Hero background
  console.log('Creating enhanced hero background...');
  const heroPath = path.join(__dirname, '..', 'public', 'images', 'hero', 'hero-bg.svg');
  const heroSvg = createEnhancedSVGPlaceholder(1920, 1080, 'Design Guild', 'hero');
  fs.writeFileSync(heroPath, heroSvg);
  console.log('✓ Created enhanced hero-bg.svg');

  // Event banner
  console.log('Creating enhanced event banner...');
  const eventPath = path.join(__dirname, '..', 'public', 'images', 'events', 'networking-event.svg');
  const eventSvg = createEnhancedSVGPlaceholder(800, 400, 'Creative Networking 2024', 'event');
  fs.writeFileSync(eventPath, eventSvg);
  console.log('✓ Created enhanced networking-event.svg');

  // General placeholder
  console.log('Creating enhanced general placeholder...');
  const placeholderPath = path.join(__dirname, '..', 'public', 'images', 'placeholder.svg');
  const placeholderSvg = createEnhancedSVGPlaceholder(400, 300, 'Image Placeholder', 'default');
  fs.writeFileSync(placeholderPath, placeholderSvg);
  console.log('✓ Created enhanced placeholder.svg');

  console.log('🎉 All enhanced placeholder images created successfully!');
}

if (require.main === module) {
  createBetterPlaceholders().catch(console.error);
}

module.exports = { createBetterPlaceholders };