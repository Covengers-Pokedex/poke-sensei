import { ToastStore } from '@/types/toast';
import { create } from 'zustand';

export const useToastStore = create<ToastStore>(set => ({
  toastList: [],
  action: {
    addToast: newToast => {
      set(prevState => {
        // 토스트 개수 3개 이하로 제한
        if (prevState.toastList.length >= 3) {
          return { toastList: [...prevState.toastList] };
        }
        return { toastList: [{ ...newToast, id: Date.now().toString() }, ...prevState.toastList] };
      });
    },
    removeToast: id => {
      set(prevState => {
        return { toastList: prevState.toastList.filter(toast => toast.id !== id) };
      });
    },
  },
}));
