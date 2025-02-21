import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BudGood - Profesjonalne remonty w Polsce',
  description: 'Kompleksowe usługi remontowe z gwarancją jakości. Zaufaj profesjonalistom z wieloletnim doświadczeniem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}