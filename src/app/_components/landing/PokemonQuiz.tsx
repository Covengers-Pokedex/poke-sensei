'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getPokemonRandomImage } from '../../../lib/api/api';
import { getRandomNumber } from '@/utils/randomNumber';
import classNames from 'classnames';
import RandomPokemonLoading from '../loading/RandomPokemonLoading';
import Link from 'next/link';
import { RANDOM_QUERY_KEY } from '@/constants/queryKeys';
import { MAX_4TH_GEN_POKEMON_ID } from '@/constants/pokemonMaxId';
import LanguageToggleButton from '../button/LanguageToggleButton';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { localeText } from '@/constants/localeText';

export default function PokemonQuiz() {
  const { language } = useLanguageStore();
  const [userInput, setUserInput] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<boolean>(false);
  const [quizResultText, setQuizResultText] = useState<string>('');
  const [randomNumber, setRandomNumber] = useState<number>(getRandomNumber(1, MAX_4TH_GEN_POKEMON_ID));
  const queryClient = useQueryClient();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: [RANDOM_QUERY_KEY, randomNumber, language],
    queryFn: async () => {
      const { pokemonName, pokemonRandomImage, pokemonHint } = await getPokemonRandomImage(randomNumber, language);
      return { pokemonName, pokemonRandomImage, pokemonHint };
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const retryText = localeText[language].quizRetry;
  const submitText = localeText[language].quizSubmit;
  const successText = localeText[language].quizSuccessText;
  const failText = localeText[language].quizFailText;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInput === data?.pokemonName) {
      setQuizResult(true);
      setQuizResultText(successText);
    } else {
      setQuizResult(false);
      setQuizResultText(failText);
    }
    setIsSubmit(true);
    setUserInput('');
  };

  const handleResetQuiz = () => {
    setQuizResult(false);
    setIsSubmit(false);
    const newRandomNumber = getRandomNumber(1, MAX_4TH_GEN_POKEMON_ID); // 랜덤 숫자 생성
    setRandomNumber(newRandomNumber);
    queryClient.invalidateQueries({ queryKey: [RANDOM_QUERY_KEY, newRandomNumber] }); // 이전 쿼리 무효화
  };

  useEffect(() => {
    if (quizResult) {
      buttonRef.current?.focus();
    }
  }, [quizResult]);

  useEffect(() => {
    if (quizResult) {
      setQuizResultText(successText);
    } else {
      setQuizResultText(failText);
    }
  }, [language]);

  if (isLoading) {
    return <RandomPokemonLoading />;
  }

  if (isError) {
    return <div>에러입니다.</div>;
  }

  return (
    <>
      <LanguageToggleButton />
      <Image
        className={classNames(
          'mt-3 w-auto h-40 sm:h-48 md:h-56 lg:h-64 filter object-contain',
          isSubmit ? 'brightness-100' : 'brightness-0',
        )}
        src={data?.pokemonRandomImage}
        width={250}
        height={250}
        draggable={false}
        alt={localeText[language].quizPokemonImage}
        priority
      />
      <div className="flex flex-col justify-center items-center w-full gap-3 sm:gap-5">
        {isSubmit && <p className="text-xl sm:text-2xl leading-9">{data?.pokemonName}</p>}
        <p className="text-l w-full text-center break-keep">{data?.pokemonHint}</p>
        {isSubmit && <p className="text-center text-lg sm:text-xl leading-9 break-keep">{quizResultText}</p>}

        <div className="relative w-full text-center">
          <form onSubmit={isSubmit ? handleResetQuiz : handleSubmit} className="flex justify-center items-center gap-3">
            {isSubmit || (
              <input
                type="text"
                placeholder={localeText[language].quizPlaceholder}
                value={userInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserInput(e.target.value);
                }}
                className="w-full max-w-80 h-10 p-3 rounded-lg shadow-[2px_4px_4px_rgba(0,0,0,0.2)] bg-white"
              />
            )}

            <button
              type="submit"
              ref={buttonRef}
              className="h-10 px-3 rounded-lg shadow-[2px_4px_4px_rgba(0,0,0,0.2)] bg-white focus-visible:outline-none hover:bg-gray-200"
            >
              {isSubmit ? retryText : submitText}
            </button>

            {isSubmit && (
              <Link
                href="/main"
                className="h-10 leading-10 px-3 rounded-lg shadow-[2px_4px_4px_rgba(0,0,0,0.2)] bg-white focus-visible:outline-none hover:bg-gray-200"
              >
                {localeText[language].pokeDex}
              </Link>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
