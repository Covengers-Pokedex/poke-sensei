import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PokemonQuiz from './_components/landing/PokemonQuiz';
import Link from 'next/link';
import { getLoadingPokemonImage } from '@/lib/api/api';

export default async function Landing() {
  const queryClient = new QueryClient();
  // 랜덤 포켓몬을 네트워크 요청으로 받아 표출할 로딩용 컴포넌트를 위한 prefetchQuery
  await queryClient.prefetchQuery({ queryKey: ['loading'], queryFn: getLoadingPokemonImage });

  return (
    <div>
      <div className="flex flex-col justify-between items-center gap-8 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full min-h-[500px] sm:min-h-[700px] pb-6 sm:pb-10 max-w-[1200px] rounded-3xl bg-[#F2F4F6] border-4 border-[#ffffff] px-[10px]">
        <div className="w-full mt-[-20px] sm:mt-[-30px]">
          <h1 className="title-line text-2xl sm:text-5xl lg:text-6xl text-center text-[#F9DC42]">
            오늘의 포켓몬은 뭘까요?
          </h1>
        </div>

        <Link
          href="/main"
          className="absolute top-12 sm:top-10 text-sm sm:text-[16px] right-3 translate-y-[-50%] px-3 rounded-lg bg-[#D9D9D9] shadow-[2px_4px_4px_rgba(0,0,0,0.2)] transition-all hover:bg-[#F9DC42] leading-[30px] h-[30px] sm:leading-[35px] sm:h-[35px]"
        >
          포켓몬 도감
        </Link>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PokemonQuiz />
        </HydrationBoundary>
      </div>
    </div>
  );
}
