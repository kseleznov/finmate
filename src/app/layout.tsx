import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finmate",
  description: "Проект без стандартного шаблонного контента",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
