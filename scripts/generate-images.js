const fs = require('fs');
const https = require('https');
const path = require('path');

// Create scripts directory if it doesn't exist
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Image configurations
const imageConfig = {
  creators: [
    { name: 'tanaka', filename: 'tanaka.jpg', query: 'professional-woman-designer' },
    { name: 'sato', filename: 'sato.jpg', query: 'professional-man-illustrator' },
    { name: 'yamada', filename: 'yamada.jpg', query: 'professional-woman-brand-designer' },
    { name: 'suzuki', filename: 'suzuki.jpg', query: 'professional-man-ui-designer' },
    { name: 'takahashi', filename: 'takahashi.jpg', query: 'professional-woman-artist' },
    { name: 'nakamura', filename: 'nakamura.jpg', query: 'professional-man-consultant' }
  ],
  portfolio: [
    { filename: 'brand1.jpg', query: 'branding-design-identity' },
    { filename: 'character1.jpg', query: 'character-design-illustration' },
    { filename: 'strategy1.jpg', query: 'brand-strategy-presentation' },
    { filename: 'mobile1.jpg', query: 'mobile-app-ui-design' },
    { filename: 'watercolor1.jpg', query: 'watercolor-illustration-art' },
    { filename: 'consulting1.jpg', query: 'business-consulting-presentation' }
  ],
  hero: [
    { filename: 'hero-bg.jpg', query: 'creative-workspace-design-studio' }
  ],
  events: [
    { filename: 'networking-event.jpg', query: 'creative-networking-event-meetup' }
  ]
};

// Function to create SVG placeholder
function createSVGPlaceholder(width, height, text, bgColor = '#f3f4f6', textColor = '#6b7280') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="${textColor}" text-anchor="middle" dy=".3em">${text}</text>
  </svg>`;
}

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to generate placeholder images
async function generatePlaceholders() {
  console.log('🎨 Generating placeholder images...');

  // Create creators profile images (400x400)
  console.log('Creating creator profile images...');
  for (const creator of imageConfig.creators) {
    const filepath = path.join(__dirname, '..', 'public', 'images', 'creators', creator.filename);
    const svg = createSVGPlaceholder(400, 400, creator.name, '#e5e7eb', '#374151');
    fs.writeFileSync(filepath.replace('.jpg', '.svg'), svg);
    console.log(`✓ Created ${creator.filename.replace('.jpg', '.svg')}`);
  }

  // Create portfolio preview images (600x400)
  console.log('Creating portfolio preview images...');
  for (let i = 0; i < imageConfig.portfolio.length; i++) {
    const item = imageConfig.portfolio[i];
    const filepath = path.join(__dirname, '..', 'public', 'images', 'portfolio', item.filename);
    const svg = createSVGPlaceholder(600, 400, `Portfolio ${i + 1}`, '#ddd6fe', '#5b21b6');
    fs.writeFileSync(filepath.replace('.jpg', '.svg'), svg);
    console.log(`✓ Created ${item.filename.replace('.jpg', '.svg')}`);
  }

  // Create hero background (1920x1080)
  console.log('Creating hero background...');
  const heroPath = path.join(__dirname, '..', 'public', 'images', 'hero', 'hero-bg.svg');
  const heroSvg = createSVGPlaceholder(1920, 1080, 'Design Guild Hero', '#3b82f6', '#ffffff');
  fs.writeFileSync(heroPath, heroSvg);
  console.log('✓ Created hero-bg.svg');

  // Create event banner (800x400)
  console.log('Creating event banner...');
  const eventPath = path.join(__dirname, '..', 'public', 'images', 'events', 'networking-event.svg');
  const eventSvg = createSVGPlaceholder(800, 400, 'Creative Networking 2024', '#7c3aed', '#ffffff');
  fs.writeFileSync(eventPath, eventSvg);
  console.log('✓ Created networking-event.svg');

  // Create general placeholder
  console.log('Creating general placeholder...');
  const placeholderPath = path.join(__dirname, '..', 'public', 'images', 'placeholder.svg');
  const placeholderSvg = createSVGPlaceholder(400, 300, 'Image Placeholder', '#f3f4f6', '#6b7280');
  fs.writeFileSync(placeholderPath, placeholderSvg);
  console.log('✓ Created placeholder.svg');

  console.log('🎉 All placeholder images generated successfully!');
}

// Alternative function using Picsum for actual photos
async function downloadSampleImages() {
  console.log('📸 Downloading sample images from Picsum...');

  try {
    // Download creator profile images
    console.log('Downloading creator profile images...');
    for (let i = 0; i < imageConfig.creators.length; i++) {
      const creator = imageConfig.creators[i];
      const url = `https://picsum.photos/400/400?random=${i + 1}`;
      const filepath = path.join(__dirname, '..', 'public', 'images', 'creators', creator.filename);
      await downloadImage(url, filepath);
      console.log(`✓ Downloaded ${creator.filename}`);
    }

    // Download portfolio images
    console.log('Downloading portfolio images...');
    for (let i = 0; i < imageConfig.portfolio.length; i++) {
      const item = imageConfig.portfolio[i];
      const url = `https://picsum.photos/600/400?random=${i + 10}`;
      const filepath = path.join(__dirname, '..', 'public', 'images', 'portfolio', item.filename);
      await downloadImage(url, filepath);
      console.log(`✓ Downloaded ${item.filename}`);
    }

    // Download hero background
    console.log('Downloading hero background...');
    const heroUrl = 'https://picsum.photos/1920/1080?random=20';
    const heroPath = path.join(__dirname, '..', 'public', 'images', 'hero', 'hero-bg.jpg');
    await downloadImage(heroUrl, heroPath);
    console.log('✓ Downloaded hero-bg.jpg');

    // Download event banner
    console.log('Downloading event banner...');
    const eventUrl = 'https://picsum.photos/800/400?random=21';
    const eventPath = path.join(__dirname, '..', 'public', 'images', 'events', 'networking-event.jpg');
    await downloadImage(eventUrl, eventPath);
    console.log('✓ Downloaded networking-event.jpg');

    console.log('🎉 All sample images downloaded successfully!');
  } catch (error) {
    console.error('❌ Error downloading images:', error.message);
    console.log('🔄 Falling back to SVG placeholders...');
    await generatePlaceholders();
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const usePhotos = args.includes('--photos');

  if (usePhotos) {
    await downloadSampleImages();
  } else {
    await generatePlaceholders();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generatePlaceholders, downloadSampleImages };