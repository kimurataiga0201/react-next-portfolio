'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Hamburger Menu Button - Left side */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo - Center */}
        <Link href="/" className="text-xl font-bold text-slate-50 hover:text-white transition-colors">
          Portfolio
        </Link>

        {/* Spacer for balance */}
        <div className="w-10"></div>
      </div>

      {/* Slide-in Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-slate-50">メニュー</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-2">
                <Link 
                  href="/blog" 
                  className="px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ブログ
                </Link>
                <Link 
                  href="/portfolio" 
                  className="px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ポートフォリオ
                </Link>
                <Link 
                  href="/hobby" 
                  className="px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  趣味
                </Link>
                <Link 
                  href="/contact" 
                  className="px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  お問い合わせ
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
