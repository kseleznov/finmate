import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/entities/user';
import { HtmlLangSync } from '@/entities/locale';
import './globals.css';

export const metadata: Metadata = {
  title: 'Finmate',
  description: 'Отслеживание расходов и бюджета',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Finmate',
    statusBarStyle: 'default',
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <HtmlLangSync />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
