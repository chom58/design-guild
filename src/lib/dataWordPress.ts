/**
 * WordPressから取得したクリエイターデータを既存の型に変換するユーティリティ
 */

import { Creator } from './types';
import { 
  WordPressPost, 
  getCreatorsFromWordPress, 
  getCreatorFromWordPress,
  checkWordPressConnection 
} from './wordpress';

// 既存のハードコードされたデータ（フォールバック用）
import { creators as fallbackCreators, getCreatorById as getFallbackCreatorById } from './data';

/**
 * WordPressのクリエイター投稿を既存のCreator型に変換
 */
function transformWordPressCreatorToCreator(wpCreator: WordPressPost): Creator {
  const acf = wpCreator.acf || {};
  
  return {
    id: wpCreator.id.toString(),
    name: wpCreator.title.rendered,
    profileImage: (acf.profile_image as string) || '/images/creators/default.svg',
    profession: (acf.profession as string) || 'デザイナー',
    bio: (acf.bio as string) || wpCreator.content.rendered.replace(/<[^>]*>/g, ''),
    skills: parseSkills(acf.skills),
    portfolio: parsePortfolio(acf.portfolio),
    social: parseSocialLinks(acf),
    email: (acf.email as string) || 'contact@example.com'
  };
}

/**
 * スキル文字列を配列に変換
 */
function parseSkills(skillsData: unknown): Creator['skills'] {
  if (!skillsData) return ['graphic'];
  
  if (typeof skillsData === 'string') {
    return skillsData.split(',').map(skill => skill.trim()) as Creator['skills'];
  }
  
  if (Array.isArray(skillsData)) {
    return skillsData as Creator['skills'];
  }
  
  return ['graphic'];
}

/**
 * ポートフォリオデータを変換
 */
function parsePortfolio(portfolioData: unknown): Creator['portfolio'] {
  if (!portfolioData) return [];
  
  try {
    if (typeof portfolioData === 'string') {
      return JSON.parse(portfolioData);
    }
    
    if (Array.isArray(portfolioData)) {
      return portfolioData.map(item => ({
        title: item.title || 'Untitled',
        type: item.type || 'image',
        url: item.url || '',
        thumbnail: item.thumbnail,
        description: item.description || '',
        dimensions: item.dimensions,
        duration: item.duration,
        embedUrl: item.embedUrl
      }));
    }
  } catch (error) {
    console.error('Error parsing portfolio data:', error);
  }
  
  return [];
}

/**
 * ソーシャルリンクを変換
 */
function parseSocialLinks(acf: Record<string, unknown>): Creator['social'] {
  return {
    twitter: (acf.twitter as string) || undefined,
    instagram: (acf.instagram as string) || undefined,
    linkedin: (acf.linkedin as string) || undefined,
    website: (acf.website as string) || undefined
  };
}

/**
 * すべてのクリエイターを取得（WordPress優先、フォールバック対応）
 */
export async function getAllCreators(): Promise<Creator[]> {
  try {
    // WordPress接続チェック
    const isConnected = await checkWordPressConnection();
    
    if (!isConnected) {
      console.log('WordPress not available, using fallback creator data');
      return fallbackCreators;
    }

    // WordPressからクリエイターデータを取得
    const wpCreators = await getCreatorsFromWordPress();
    
    if (!wpCreators || wpCreators.length === 0) {
      console.log('No WordPress creators found, using fallback data');
      return fallbackCreators;
    }

    // WordPressデータを変換
    const creators = wpCreators.map(transformWordPressCreatorToCreator);
    
    console.log(`Found ${creators.length} creators from WordPress`);
    return creators;
    
  } catch (error) {
    console.error('Error fetching creators from WordPress:', error);
    console.log('Falling back to static creator data');
    return fallbackCreators;
  }
}

/**
 * 特定のクリエイターを取得（WordPress優先、フォールバック対応）
 */
export async function getCreatorById(id: string): Promise<Creator | undefined> {
  try {
    // WordPress接続チェック
    const isConnected = await checkWordPressConnection();
    
    if (!isConnected) {
      console.log('WordPress not available, using fallback data');
      return getFallbackCreatorById(id);
    }

    // WordPressから特定のクリエイターを取得
    const wpCreator = await getCreatorFromWordPress(id);
    
    if (!wpCreator) {
      console.log(`WordPress creator ${id} not found, using fallback data`);
      return getFallbackCreatorById(id);
    }

    // WordPressデータを変換
    const creator = transformWordPressCreatorToCreator(wpCreator);
    
    console.log(`Found creator ${id} from WordPress`);
    return creator;
    
  } catch (error) {
    console.error(`Error fetching creator ${id} from WordPress:`, error);
    console.log('Falling back to static data');
    return getFallbackCreatorById(id);
  }
}

/**
 * スキル別のクリエイターを取得
 */
export async function getCreatorsBySkill(skill: Creator['skills'][0]): Promise<Creator[]> {
  try {
    const allCreators = await getAllCreators();
    return allCreators.filter(creator => creator.skills.includes(skill));
  } catch (error) {
    console.error(`Error fetching creators by skill ${skill}:`, error);
    return fallbackCreators.filter(creator => creator.skills.includes(skill));
  }
}