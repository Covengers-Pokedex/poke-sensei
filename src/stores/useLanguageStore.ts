import { create } from 'zustand';
import { LanguageStore } from '@/types/language';

export const useLanguageStore = create<LanguageStore>(set => ({
  language: 'ko',
  toggleLanguage: () => set(state => ({ language: state.language === 'ko' ? 'en' : 'ko' })),
}));
