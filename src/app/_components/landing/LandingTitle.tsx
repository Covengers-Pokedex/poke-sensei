'use client';

import Link from 'next/link';
import pokemonDex from '@/images/items/pokemon-dex.png';
import Image from 'next/image';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { localeText } from '@/constants/localeText';

export default function LandingTitle() {
  const { language } = useLanguageStore();
  return (
    <>
      <div className="w-full mt-[-20px] sm:mt-[-30px]">
        <h1 className="title-line text-2xl sm:text-5xl lg:text-6xl text-center text-[#F9DC42]">
          {localeText[language].landingTitle}
        </h1>
      </div>

      <Link
        href="/main"
        className="flex items-center absolute top-11 sm:top-12 text-sm sm:text-[16px] right-3 translate-y-[-50%] px-3 rounded-lg bg-[#d0e8d0] shadow-[3px_5px_4px_rgba(0,0,0,0.15)] transition-all hover:bg-[#A8D8A8] leading-[35px] h-[35px] sm:leading-[40px] sm:h-[40px]"
      >
        <Image src={pokemonDex} className="mr-2" width={20} height={20} alt={localeText[language].dexIcon} />
        {localeText[language].pokeDex}
      </Link>
    </>
  );
}
