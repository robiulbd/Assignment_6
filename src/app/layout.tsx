import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PlanProvider } from '@/components/SafeMerge';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'FitLog — Dark Gym Companion',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="bg-[#0e1017] text-gray-200 min-h-screen flex flex-col font-sans">
        <PlanProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {children}
          </main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}