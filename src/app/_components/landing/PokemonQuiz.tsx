'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getPokemonRandomImage } from '../../../lib/api/api';
import { getRandomNumber } from '@/lib/api/utils/randomNumber';
import classNames from 'classnames';

export default function PokemonQuiz() {
  const [userInput, setUserInput] = useState<string>('');
  const [quizResult, setQuizResult] = useState<boolean>(false);
  const [quizResultText, setQuizResultText] = useState<string>('');
  const [randomNumber, setRandomNumber] = useState<number>(getRandomNumber(1, 151));
  const queryClient = useQueryClient();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['randomPokemon', randomNumber],
    queryFn: async () => {
      const { pokemonName, pokemonRandomImage, pokemonHint } = await getPokemonRandomImage(randomNumber);
      return { pokemonName, pokemonRandomImage, pokemonHint };
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput === data?.pokemonName) {
      setQuizResult(true);
      setUserInput('');
      setQuizResultText('정답입니다! 포켓몬 마스터인가요?');
    } else {
      setQuizResult(true);
      setUserInput('');
      setQuizResultText('틀렸습니다... 도감 보고 공부하세요!');
    }
  };

  const handleResetQuiz = () => {
    setQuizResult(false);
    const newRandomNumber = getRandomNumber(1, 151); // 랜덤 숫자 생성
    setRandomNumber(newRandomNumber);
    queryClient.invalidateQueries({ queryKey: ['randomPokemon', newRandomNumber] }); // 이전 쿼리 무효화
  };

  useEffect(() => {
    if (quizResult) {
      buttonRef.current?.focus();
    }
  }, [quizResult]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러입니다.</div>;
  }

  return (
    <>
      <Image
        className={classNames('mt-3 w-[130px] lg:w-[240px] filter', quizResult ? 'brightness-100' : 'brightness-0')}
        src={data?.pokemonRandomImage}
        width={250}
        height={250}
        alt="포켓몬 이미지"
      />
      <div className="flex flex-col justify-center items-center w-full gap-3 sm:gap-5">
        {quizResult && <p className="text-xl sm:text-2xl leading-9">{data?.pokemonName}</p>}
        <p className="text-l w-full text-center break-keep">{data?.pokemonHint}</p>
        {quizResult && <p className="text-center text-lg sm:text-xl leading-9 break-keep">{quizResultText}</p>}

        <div className="relative w-full text-center">
          <form
            onSubmit={quizResult ? handleResetQuiz : handleSubmit}
            className="flex justify-center items-center gap-3"
          >
            {quizResult || (
              <input
                type="text"
                placeholder="포켓몬을 맞춰보세요!"
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
              className="h-10 min-w-[56px] px-3 rounded-lg shadow-[2px_4px_4px_rgba(0,0,0,0.2)] bg-white focus-visible:outline-none"
            >
              {quizResult ? '다시 풀기 ⏎' : '제출'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
