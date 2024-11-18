import { useLanguageStore } from '@/stores/useLanguageStore';

export default function LanguageToggleButton() {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <button
      type="button"
      className="absolute top-12 sm:top-11 left-5 translate-y-[-50%] text-lg font-Galmuri7"
      onClick={toggleLanguage}
    >
      {language === 'ko' ? 'KOR' : 'ENG'}
    </button>
  );
}
