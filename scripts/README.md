# Image Generation Scripts

This directory contains scripts for generating placeholder images for the Design Guild project.

## Available Scripts

### 1. `generate-images.js`
Generates SVG placeholders or downloads sample images from Picsum.

**Usage:**
```bash
# Generate SVG placeholders
npm run generate-images

# Download sample photos (may not work due to CORS/redirect issues)
npm run generate-images:photos
```

### 2. `create-better-placeholders.js`
Creates enhanced SVG placeholders with gradients and better design.

**Usage:**
```bash
npm run generate-placeholders
```

## Generated Images

### Creator Profile Images (400x400)
- `tanaka.svg` - 田中 美咲
- `sato.svg` - 佐藤 健太  
- `yamada.svg` - 山田 あかり
- `suzuki.svg` - 鈴木 翔太
- `takahashi.svg` - 高橋 みゆき
- `nakamura.svg` - 中村 大輔

### Portfolio Images (600x400)
- `brand1.svg` - Brand Identity
- `character1.svg` - Character Design
- `strategy1.svg` - Brand Strategy
- `mobile1.svg` - Mobile UI
- `watercolor1.svg` - Watercolor Art
- `consulting1.svg` - Consulting

### Other Images
- `hero/hero-bg.svg` - Hero background (1920x1080)
- `events/networking-event.svg` - Event banner (800x400)
- `placeholder.svg` - General placeholder (400x300)

## Image Structure

```
public/images/
├── creators/          # Creator profile images
├── portfolio/         # Portfolio preview images  
├── events/           # Event images
├── hero/             # Hero section backgrounds
└── placeholder.svg   # General fallback image
```

## Customization

To customize the placeholder images:

1. Edit the gradient colors in `create-better-placeholders.js`
2. Modify the SVG template to add different shapes or patterns
3. Change the text content or positioning
4. Adjust image dimensions as needed

## Notes

- SVG images are lightweight and scale perfectly
- Images use gradient backgrounds for visual appeal
- All images follow the naming convention used in `src/app/page.tsx`
- Images are optimized for Next.js Image component