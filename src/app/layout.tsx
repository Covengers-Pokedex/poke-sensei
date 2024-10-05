import type { Metadata } from 'next';
import '@/styles/globals.css';

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
        <div id="portal" />
        <div>{children}</div>
      </body>
    </html>
  );
}
