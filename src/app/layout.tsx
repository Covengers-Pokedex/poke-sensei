import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from './_components/Providers';

export const metadata: Metadata = {
  title: 'Poke-Sensei',
  description: '이 포켓몬 몰라? 도감 보고 공부해!',
  icons: {
    icon: '/favicon.ico', // 파비콘 경로
  },
  openGraph: {
    title: 'Poke-Sensei',
    description: '이 포켓몬 몰라? 도감 보고 공부해!',
    url: 'https://poke-sensei.vercel.app/', // 페이지 URL
    type: 'website',
    images: [
      {
        url: '/og-image.png', // OG 이미지 경로
        width: 1200,
        height: 630,
        alt: 'og-image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image', // 트위터 카드 유형
    title: 'Poke-Sensei',
    description: '이 포켓몬 몰라? 도감 보고 공부해!',
    images: ['/og-image.png'], // 트위터 공유 이미지
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
