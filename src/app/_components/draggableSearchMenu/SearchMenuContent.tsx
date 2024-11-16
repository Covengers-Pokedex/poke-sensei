import { ReactNode } from 'react';

export default function SearchMenuContent({ children }: { children: ReactNode }) {
  return (
    <div className="border rounded-md p-3 bg-white">
      <>{children}</>
    </div>
  );
}
