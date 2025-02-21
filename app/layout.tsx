import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BudGood - Profesjonalne Usługi Budowlane',
  description: 'Oferujemy kompleksowe usługi budowlane, remonty i wykończenia wnętrz w Warszawie i okolicach. Sprawdź naszą ofertę!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster />
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}