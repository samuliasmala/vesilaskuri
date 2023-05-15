import { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { VersionLogger } from '~/components/VersionLogger';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vesilaskuri',
  description: 'Pinsiön alueen vesiosuuskunnan Vesilaskuri',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fi">
      <body className={`${inter.className} bg-gray-200 print:bg-white`}>
        <VersionLogger>{children}</VersionLogger>
      </body>
    </html>
  );
}
