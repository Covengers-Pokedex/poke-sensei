'use client';

import { useLanguageStore } from '@/stores/useLanguageStore';

export default function MainTitle() {
  const { language } = useLanguageStore();
  return (
    <div className="w-full mt-[-20px] sm:mt-[-30px]">
      <h1 className="title-line text-2xl sm:text-5xl lg:text-6xl text-center text-[#F9DC42]">
        {language === 'ko' ? '포켓몬 도감' : 'Pokedex'}
      </h1>
    </div>
  );
}
