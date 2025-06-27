import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { PortfolioGallery } from '@/components/ui/PortfolioGallery';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { getCreatorById } from '@/lib/data';

interface CreatorDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CreatorDetailPage({ params }: CreatorDetailPageProps) {
  const { id } = await params;
  const creator = getCreatorById(id);

  if (!creator) {
    notFound();
  }

  const skillColors = {
    graphic: 'bg-green-100 text-green-800 border-green-200',
    illustration: 'bg-purple-100 text-purple-800 border-purple-200',
    branding: 'bg-amber-100 text-amber-800 border-amber-200'
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/creators">
            <Button variant="outline" className="inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              クリエイター一覧に戻る
            </Button>
          </Link>
        </div>

        {/* Creator Profile Header */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <PlaceholderImage
                    width={192}
                    height={192}
                    text={creator.name.split(' ')[0]}
                    type="profile"
                  />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="md:col-span-2 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{creator.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{creator.profession}</p>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {creator.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${skillColors[skill]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start">
                <SocialLinks social={creator.social} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Bio Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">プロフィール</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{creator.bio}</p>
              </div>
            </section>

            {/* Portfolio Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ポートフォリオ</h2>
              <PortfolioGallery portfolio={creator.portfolio} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">お問い合わせ</h3>
              
              {/* Email */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">メールアドレス</span>
                </div>
                <a 
                  href={`mailto:${creator.email}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {creator.email}
                </a>
              </div>

              {/* Contact Button */}
              <a href={`mailto:${creator.email}?subject=お仕事のご相談&body=お疲れ様です。${creator.name}さんにお仕事のご相談があります。`}>
                <Button className="w-full">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  お仕事を依頼する
                </Button>
              </a>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">専門分野</h4>
                <div className="space-y-2">
                  {creator.skills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600 capitalize">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">実績</h4>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {creator.portfolio.length}件のプロジェクト
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  // This would typically fetch from an API or database
  // For now, we'll use the hardcoded creator IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}