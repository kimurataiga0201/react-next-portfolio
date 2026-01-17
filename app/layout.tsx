import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './_components/Header';
import Footer from './_components/Footer';
import ClientLayout from './_components/ClientLayout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    template: '%s | Full Stack Developer',
    default: 'Portfolio | Full Stack Developer',
  },
  description:
    'Modern portfolio showcasing full-stack development projects and expertise.',
  openGraph: {
    title: 'Portfolio | Full Stack Developer',
    description:
      'Modern portfolio showcasing full-stack development projects and expertise.',
    images: ['/ogp.png'],
  },
  alternates: {
    canonical: 'http://localhost:3000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <ClientLayout>
          <Header />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
