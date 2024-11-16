import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PokemonQuiz from './_components/landing/PokemonQuiz';
import Link from 'next/link';
import { getLoadingPokemonImage } from '@/lib/api/api';
import pokemonDex from '@/images/items/pokemon-dex.png';
import Image from 'next/image';
import { LOADING_QUERY_KEY } from '@/constants/queryKeys';

export default async function Landing() {
  const queryClient = new QueryClient();
  // 랜덤 포켓몬을 네트워크 요청으로 받아 표출할 로딩용 컴포넌트를 위한 prefetchQuery
  await queryClient.prefetchQuery({ queryKey: [LOADING_QUERY_KEY], queryFn: getLoadingPokemonImage });

  return (
    <div className="flex justify-center items-center w-screen h-screen px-3 sm:px-5">
      <div className="relative flex flex-col justify-between items-center gap-8 w-full min-h-[500px] sm:min-h-[700px] pb-6 sm:pb-10 max-w-[1200px] rounded-3xl bg-[#F2F4F6] border-4 border-[#ffffff] px-[10px]">
        <div className="w-full mt-[-20px] sm:mt-[-30px]">
          <h1 className="title-line text-2xl sm:text-5xl lg:text-6xl text-center text-[#F9DC42]">
            오늘의 포켓몬은 뭘까요?
          </h1>
        </div>

        <Link
          href="/main"
          className="flex items-center absolute top-11 sm:top-12 text-sm sm:text-[16px] right-3 translate-y-[-50%] px-3 rounded-lg bg-[#d0e8d0] shadow-[3px_5px_4px_rgba(0,0,0,0.15)] transition-all hover:bg-[#A8D8A8] leading-[35px] h-[35px] sm:leading-[40px] sm:h-[40px]"
        >
          <Image src={pokemonDex} className="mr-2" width={20} height={20} alt="도감 이미지" />
          포켓몬 도감
        </Link>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PokemonQuiz />
        </HydrationBoundary>
      </div>
    </div>
  );
}
