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
      { title: 'ブランドアイデンティティ', image: '/images/portfolio/brand1.svg', description: 'スタートアップ企業のブランドアイデンティティを一から構築。ロゴデザイン、カラーパレット、タイポグラフィの選定から、名刺、封筒、ウェブサイトまでトータルでブランディングを実施。' },
      { title: 'パッケージデザイン', image: '/images/portfolio/package1.svg', description: '有機食品ブランドのパッケージデザイン。環境に配慮した素材選択と、ナチュラルで温かみのあるビジュアルで商品の魅力を表現。' },
      { title: 'Webサイトデザイン', image: '/images/portfolio/web1.svg', description: 'クリエイティブエージェンシーのコーポレートサイト。モダンで洗練されたデザインと直感的なユーザーエクスペリエンスを実現。' }
    ],
    social: { 
      twitter: 'tanaka_design', 
      instagram: 'tanaka.design',
      website: 'https://tanaka-design.com'
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
      { title: 'キャラクターデザイン', image: '/images/portfolio/character1.svg', description: 'モバイルゲーム用のオリジナルキャラクター。個性豊かな表情と動きのあるポーズで、プレイヤーに愛されるキャラクターを制作。' },
      { title: '絵本イラスト', image: '/images/portfolio/book1.svg', description: '子供向け絵本の挿絵を担当。温かみのあるタッチで、物語の世界観を視覚的に表現し、読者の想像力を掻き立てる作品。' },
      { title: 'コンセプトアート', image: '/images/portfolio/concept1.svg', description: 'アニメーション作品のコンセプトアート。世界観設定からキャラクター設計まで、作品の核となるビジュアルを提供。' }
    ],
    social: { 
      instagram: 'sato.illust', 
      website: 'https://sato-illust.com',
      twitter: 'sato_illustrator'
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
      { title: 'ブランド戦略', image: '/images/portfolio/strategy1.svg', description: 'テクノロジー企業のブランドリニューアル戦略。市場分析から競合調査、ブランドポジショニングまで包括的に実施。' },
      { title: 'ロゴデザイン', image: '/images/portfolio/logo1.svg', description: 'スタートアップ企業のロゴデザイン。シンプルでモダンな design で、企業の革新性と信頼性を表現。' },
      { title: 'ブランドガイドライン', image: '/images/portfolio/guideline1.svg', description: '統一されたブランド体験を実現するための詳細なガイドライン。全てのタッチポイントでの一貫性を確保。' }
    ],
    social: { 
      linkedin: 'yamada-akari', 
      website: 'https://yamada-brand.com',
      twitter: 'yamada_branding'
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
      { title: 'モバイルアプリUI', image: '/images/portfolio/mobile1.svg', description: 'ECアプリのUI/UXデザイン。ユーザビリティテストを重ねて、直感的で使いやすいショッピング体験を実現。' },
      { title: 'Webアプリケーション', image: '/images/portfolio/webapp1.svg', description: 'SaaS プラットフォームのインターフェースデザイン。複雑な機能をシンプルに整理し、効率的なワークフローを提供。' },
      { title: 'デザインシステム', image: '/images/portfolio/design-system1.svg', description: '一貫性のあるユーザー体験を提供するためのデザインシステム構築。再利用可能なコンポーネントライブラリを設計。' }
    ],
    social: { 
      twitter: 'suzuki_ui', 
      linkedin: 'suzuki-shota',
      website: 'https://suzuki-ui.com'
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
      { title: '水彩イラスト', image: '/images/portfolio/watercolor1.svg', description: '詩集の挿絵として制作した水彩イラストレーション。詩の世界観を視覚的に表現し、読者の感性に訴える作品。' },
      { title: '自然をテーマにした作品', image: '/images/portfolio/nature1.svg', description: '四季の移ろいを表現したイラストシリーズ。水彩の透明感を活かして、自然の美しさと儚さを描写。' },
      { title: '商品パッケージ', image: '/images/portfolio/tea-package1.svg', description: 'オーガニックティーのパッケージイラスト。ハーブの持つ自然の力を水彩で表現し、商品の魅力を伝える。' }
    ],
    social: { 
      instagram: 'takahashi.art', 
      website: 'https://takahashi-art.com',
      twitter: 'takahashi_watercolor'
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
      { title: 'ブランドコンサルティング', image: '/images/portfolio/consulting1.svg', description: '老舗企業のブランド再構築プロジェクト。伝統を活かしながら現代的な魅力を加えた総合的なブランディング戦略を実施。' },
      { title: '企業アイデンティティ', image: '/images/portfolio/corporate1.svg', description: 'M&A後の企業統合におけるブランドアイデンティティ構築。異なる企業文化を融合し、新しい価値を創造。' },
      { title: 'ブランド戦略立案', image: '/images/portfolio/strategy2.svg', description: 'グローバル展開を目指す企業のブランド戦略。市場分析から競合分析、ポジショニング戦略まで包括的にサポート。' }
    ],
    social: { 
      linkedin: 'nakamura-daisuke', 
      twitter: 'nakamura_brand',
      website: 'https://nakamura-consulting.com'
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