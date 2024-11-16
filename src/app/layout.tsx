import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from './_components/Providers';

export const metadata: Metadata = {
  title: 'Poke-Sensei',
  description: '이 포켓몬 몰라요? 도감 보고 공부하세요!',
  icons: {
    icon: '/favicon.ico', // 파비콘 경로
  },
  metadataBase: new URL('https://poke-sensei.vercel.app'),

  openGraph: {
    title: 'Poke-Sensei!',
    description: '이 포켓몬 몰라요? 도감 보고 공부하세요!',
    url: 'https://poke-sensei.vercel.app',
    siteName: 'Poke-Sensei',
    locale: 'ko-KR',
    type: 'website',
    images: '/ogImage.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#A8D8A8]">
        <Providers>
          {/* 드래그 가능한 몬스터볼 컴포넌트를 렌더링하는 포탈을 열기 위한 엘리먼트 */}
          <div id="draggable" />
          {/* 모달 컴포넌트를 렌더링하는 포탈을 열기 위한 엘리먼트 */}
          <div id="modal" />
          {/* 전역에서 사용 가능한 토스트를 렌더링하는 포탈을 열기 위한 엘리먼트 */}
          <div id="toast" />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
