'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Creators', href: '/creators' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
              デザインギルド
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            ))}
            
            {status === 'loading' ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {session.user?.name || session.user?.email}
                </span>
                <AnimatedButton
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  ログアウト
                </AnimatedButton>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <AnimatedButton variant="outline" size="sm">
                    ログイン
                  </AnimatedButton>
                </Link>
                <Link href="/auth/signup">
                  <AnimatedButton size="sm">
                    新規登録
                  </AnimatedButton>
                </Link>
              </div>
            )}
          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`h-6 w-6 transform transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm rounded-lg mt-2 border border-gray-200">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 text-base font-medium rounded-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              {session ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600">
                    {session.user?.name || session.user?.email}
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-200"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 text-base font-medium rounded-md transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 text-base font-medium rounded-md transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    新規登録
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};