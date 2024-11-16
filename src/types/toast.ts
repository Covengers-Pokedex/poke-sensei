export type ToastTypes = 'success' | 'warn' | 'error';

export interface Toast {
  id: string;
  type: ToastTypes;
  message: string;
}

export interface ToastStore {
  toastList: Toast[];
  action: {
    addToast: ({ type, message }: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
  };
}
