import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from './_components/Providers';

export const metadata: Metadata = {
  title: '포켓몬 도감',
  description: '세상의 모든 포켓몬이 여기에!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
