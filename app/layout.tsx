import '@/app/ui/global.css';
import {inter} from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template:'%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'Leito aplicando el curso de Next.js construyó una plataforma de Acme',
  metadataBase: new URL('https://next-learn-dasboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
