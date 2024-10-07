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
        {/* 드래그 가능한 몬스터볼 컴포넌트를 렌더링하는 포탈을 열기 위한 엘리먼트 */}
        <div id="draggable" />
        {/* 모달 컴포넌트를 렌더링하는 포탈을 열기 위한 엘리먼트 */}
        <div id="modal" />
        <div>{children}</div>
      </body>
    </html>
  );
}
