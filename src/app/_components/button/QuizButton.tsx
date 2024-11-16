'use client';

import { useLanguageStore } from '@/stores/useLanguageStore';
import Link from 'next/link';

export default function QuizButton() {
  const { language } = useLanguageStore();
  return (
    <Link
      href="/"
      className="absolute top-12 sm:top-11 right-28 sm:right-[120px] translate-y-[-50%] text-sm sm:text-[16px] px-3 rounded-lg bg-[#D9D9D9] shadow-[2px_4px_4px_rgba(0,0,0,0.2)] transition-all hover:bg-[#F9DC42] leading-[30px] h-[30px] sm:leading-[35px] sm:h-[35px]"
    >
      {language === 'ko' ? '포켓몬 퀴즈' : 'Quiz'}
    </Link>
  );
}
