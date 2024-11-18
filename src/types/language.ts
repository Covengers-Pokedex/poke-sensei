export type LanguageTypes = 'ko' | 'en';

export interface LanguageStore {
  language: LanguageTypes;
  toggleLanguage: () => void;
}
