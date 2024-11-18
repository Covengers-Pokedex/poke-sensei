'use client';

import { useToastStore } from '@/stores/useToastStore';
import Toast from './Toast';

export default function ToastList() {
  const toastList = useToastStore(state => state.toastList);

  return (
    <div className="fixed top-[200px] left-1/2 -translate-x-1/2 toast-z-index flex flex-col items-center gap-5 w-full">
      {toastList.map(toast => (
        <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} />
      ))}
    </div>
  );
}
