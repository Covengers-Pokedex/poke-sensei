'use client';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// export const metadata: Metadata = {
//   title: '포켓몬 도감',
//   description: '세상의 모든 포켓몬이 여기에!',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
