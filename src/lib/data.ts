import { Creator } from './types';

export const creators: Creator[] = [
  {
    id: '1',
    name: '田中 美咲',
    profileImage: '/images/creators/tanaka.svg',
    profession: 'グラフィックデザイナー',
    bio: 'ブランディングとグラフィックデザインを専門とし、10年以上の経験を持つデザイナーです。東京藝術大学卒業後、大手広告代理店で経験を積み、現在は独立してフリーランスとして活動しています。企業のビジュアルアイデンティティ制作から、パッケージデザイン、Webデザインまで幅広く手がけています。',
    skills: ['graphic', 'branding'],
    portfolio: [
      { 
        title: 'ブランドアイデンティティ', 
        type: 'pdf',
        url: '/portfolio/brand-identity-guideline.pdf',
        thumbnail: '/images/portfolio/brand1.svg',
        description: 'スタートアップ企業のブランドアイデンティティを一から構築。ロゴデザイン、カラーパレット、タイポグラフィの選定から、名刺、封筒、ウェブサイトまでトータルでブランディングを実施。'
      },
      { 
        title: 'パッケージデザイン', 
        type: 'image',
        url: '/images/portfolio/package1.jpg',
        dimensions: { width: 1920, height: 1080 },
        description: '有機食品ブランドのパッケージデザイン。環境に配慮した素材選択と、ナチュラルで温かみのあるビジュアルで商品の魅力を表現。' 
      },
      { 
        title: 'Webサイトデザイン紹介動画', 
        type: 'video',
        url: '',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: '/images/portfolio/web1.svg',
        duration: '2:45',
        description: 'クリエイティブエージェンシーのコーポレートサイト。モダンで洗練されたデザインと直感的なユーザーエクスペリエンスを実現。' 
      }
    ],
    social: { 
      twitter: 'dguild_tanaka_m', 
      instagram: 'designguild.tanaka',
      website: 'https://example.com/tanaka'
    },
    email: 'tanaka@example.com'
  },
  {
    id: '2',
    name: '佐藤 健太',
    profileImage: '/images/creators/sato.svg',
    profession: 'イラストレーター',
    bio: 'キャラクターデザインとイラストレーションを得意とするイラストレーターです。ゲーム業界での経験を活かし、魅力的なキャラクター制作から絵本の挿絵まで幅広く手がけています。デジタルとアナログ両方の技法を駆使して、表情豊かな作品を生み出しています。',
    skills: ['illustration'],
    portfolio: [
      { 
        title: 'キャラクターデザイン', 
        type: 'image',
        url: '/images/portfolio/character1.jpg',
        dimensions: { width: 2048, height: 2048 },
        description: 'モバイルゲーム用のオリジナルキャラクター。個性豊かな表情と動きのあるポーズで、プレイヤーに愛されるキャラクターを制作。' 
      },
      { 
        title: '絵本イラスト制作過程', 
        type: 'video',
        url: '',
        embedUrl: 'https://player.vimeo.com/video/123456789',
        thumbnail: '/images/portfolio/book1.svg',
        duration: '5:30',
        description: '子供向け絵本の挿絵を担当。温かみのあるタッチで、物語の世界観を視覚的に表現し、読者の想像力を掻き立てる作品。' 
      },
      { 
        title: 'コンセプトアート', 
        type: '3d',
        url: '/portfolio/concept-art.glb',
        embedUrl: 'https://sketchfab.com/models/example123/embed',
        thumbnail: '/images/portfolio/concept1.svg',
        description: 'アニメーション作品のコンセプトアート。世界観設定からキャラクター設計まで、作品の核となるビジュアルを提供。' 
      }
    ],
    social: { 
      instagram: 'dguild.sato.k', 
      website: 'https://example.com/sato',
      twitter: 'dguild_sato_k'
    },
    email: 'sato@example.com'
  },
  {
    id: '3',
    name: '山田 あかり',
    profileImage: '/images/creators/yamada.svg',
    profession: 'ブランドデザイナー',
    bio: 'ブランド戦略とビジュアルアイデンティティの専門家として、企業のブランド価値向上に貢献しています。マーケティング戦略とデザインの知識を組み合わせ、ビジネス成果につながるブランディングを提供。国内外のクライアントとの実績を持ちます。',
    skills: ['branding', 'graphic'],
    portfolio: [
      { 
        title: 'ブランド戦略プレゼンテーション', 
        type: 'pdf',
        url: '/portfolio/brand-strategy.pdf',
        thumbnail: '/images/portfolio/strategy1.svg',
        description: 'テクノロジー企業のブランドリニューアル戦略。市場分析から競合調査、ブランドポジショニングまで包括的に実施。' 
      },
      { 
        title: 'ロゴデザインプロセス', 
        type: 'video',
        url: '/portfolio/logo-design-process.mp4',
        thumbnail: '/images/portfolio/logo1.svg',
        duration: '3:15',
        description: 'スタートアップ企業のロゴデザイン。シンプルでモダンな design で、企業の革新性と信頼性を表現。' 
      },
      { 
        title: 'ブランドガイドライン', 
        type: 'pdf',
        url: '/portfolio/brand-guideline.pdf',
        thumbnail: '/images/portfolio/guideline1.svg',
        description: '統一されたブランド体験を実現するための詳細なガイドライン。全てのタッチポイントでの一貫性を確保。' 
      }
    ],
    social: { 
      linkedin: 'dguild-yamada-a', 
      website: 'https://example.com/yamada',
      twitter: 'dguild_yamada_a'
    },
    email: 'yamada@example.com'
  },
  {
    id: '4',
    name: '鈴木 翔太',
    profileImage: '/images/creators/suzuki.svg',
    profession: 'UIデザイナー',
    bio: 'ユーザーエクスペリエンスを重視したUIデザインを手がけるデザイナーです。人間中心設計の考えに基づき、使いやすく美しいインターフェースを制作しています。モバイルアプリからWebアプリケーションまで、様々なプラットフォームでの実績があります。',
    skills: ['graphic'],
    portfolio: [
      { 
        title: 'モバイルアプリUIプロトタイプ', 
        type: 'video',
        url: '',
        embedUrl: 'https://www.youtube.com/embed/abcdef12345',
        thumbnail: '/images/portfolio/mobile1.svg',
        duration: '1:30',
        description: 'ECアプリのUI/UXデザイン。ユーザビリティテストを重ねて、直感的で使いやすいショッピング体験を実現。' 
      },
      { 
        title: 'Webアプリケーション', 
        type: 'image',
        url: '/images/portfolio/webapp1.png',
        dimensions: { width: 2560, height: 1440 },
        description: 'SaaS プラットフォームのインターフェースデザイン。複雑な機能をシンプルに整理し、効率的なワークフローを提供。' 
      },
      { 
        title: 'デザインシステムドキュメント', 
        type: 'pdf',
        url: '/portfolio/design-system.pdf',
        thumbnail: '/images/portfolio/design-system1.svg',
        description: '一貫性のあるユーザー体験を提供するためのデザインシステム構築。再利用可能なコンポーネントライブラリを設計。' 
      }
    ],
    social: { 
      twitter: 'dguild_suzuki_s', 
      linkedin: 'dguild-suzuki-s',
      website: 'https://example.com/suzuki'
    },
    email: 'suzuki@example.com'
  },
  {
    id: '5',
    name: '高橋 みゆき',
    profileImage: '/images/creators/takahashi.svg',
    profession: 'イラストレーター',
    bio: '水彩画タッチのイラストレーションを専門とするアーティストです。自然をモチーフにした作品を中心に、書籍の挿絵、雑誌のカット、商品パッケージなど幅広い分野で活動しています。繊細で温かみのある表現で、見る人の心に寄り添う作品作りを心がけています。',
    skills: ['illustration'],
    portfolio: [
      { 
        title: '水彩イラスト', 
        type: 'image',
        url: '/images/portfolio/watercolor1.jpg',
        dimensions: { width: 3000, height: 2000 },
        description: '詩集の挿絵として制作した水彩イラストレーション。詩の世界観を視覚的に表現し、読者の感性に訴える作品。' 
      },
      { 
        title: '自然をテーマにした作品BGM', 
        type: 'audio',
        url: '/portfolio/nature-bgm.mp3',
        thumbnail: '/images/portfolio/nature1.svg',
        duration: '3:45',
        description: '四季の移ろいを表現したイラストシリーズ。水彩の透明感を活かして、自然の美しさと儚さを描写。' 
      },
      { 
        title: '商品パッケージ', 
        type: 'image',
        url: '/images/portfolio/tea-package1.jpg',
        dimensions: { width: 2400, height: 1800 },
        description: 'オーガニックティーのパッケージイラスト。ハーブの持つ自然の力を水彩で表現し、商品の魅力を伝える。' 
      }
    ],
    social: { 
      instagram: 'dguild.takahashi.m', 
      website: 'https://example.com/takahashi',
      twitter: 'dguild_takahashi_m'
    },
    email: 'takahashi@example.com'
  },
  {
    id: '6',
    name: '中村 大輔',
    profileImage: '/images/creators/nakamura.svg',
    profession: 'ブランドコンサルタント',
    bio: 'ブランド戦略からビジュアルまで一貫したブランディングサービスを提供するコンサルタントです。経営コンサルティングファームでの経験を活かし、ビジネス戦略とブランド戦略を統合したアプローチで、持続可能な企業成長を支援しています。',
    skills: ['branding', 'graphic'],
    portfolio: [
      { 
        title: 'ブランドコンサルティング事例', 
        type: 'pdf',
        url: '/portfolio/consulting-case.pdf',
        thumbnail: '/images/portfolio/consulting1.svg',
        description: '老舗企業のブランド再構築プロジェクト。伝統を活かしながら現代的な魅力を加えた総合的なブランディング戦略を実施。' 
      },
      { 
        title: '企業アイデンティティ解説動画', 
        type: 'video',
        url: '',
        embedUrl: 'https://www.youtube.com/embed/xyz789abc',
        thumbnail: '/images/portfolio/corporate1.svg',
        duration: '8:20',
        description: 'M&A後の企業統合におけるブランドアイデンティティ構築。異なる企業文化を融合し、新しい価値を創造。' 
      },
      { 
        title: 'ブランド戦略立案資料', 
        type: 'pdf',
        url: '/portfolio/global-strategy.pdf',
        thumbnail: '/images/portfolio/strategy2.svg',
        description: 'グローバル展開を目指す企業のブランド戦略。市場分析から競合分析、ポジショニング戦略まで包括的にサポート。' 
      }
    ],
    social: { 
      linkedin: 'dguild-nakamura-d', 
      twitter: 'dguild_nakamura_d',
      website: 'https://example.com/nakamura'
    },
    email: 'nakamura@example.com'
  }
];

export function getCreatorById(id: string): Creator | undefined {
  return creators.find(creator => creator.id === id);
}

export function getAllCreators(): Creator[] {
  return creators;
}