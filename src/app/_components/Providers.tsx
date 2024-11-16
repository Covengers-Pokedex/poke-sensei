'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import Portal from './modal/Portal';
import ToastList from './toast/ToastList';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Portal elementId="toast">
        <ToastList />
      </Portal>
      {children}
    </QueryClientProvider>
  );
}
