import { cookies } from 'next/headers';
import { HtmlLangSync } from '@/entities/locale';
import { parseUserCookie } from '@/shared/api/session';
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('finmate_user')?.value;
  const initialUser = parseUserCookie(cookieValue);

  return (
    <html lang="ru">
      <body>
        <HtmlLangSync />
        <Providers initialUser={initialUser}>{children}</Providers>
      </body>
    </html>
  );
}
