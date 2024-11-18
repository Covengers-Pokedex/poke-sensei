import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PokemonQuiz from './_components/landing/PokemonQuiz';
import { getLoadingPokemonImage } from '@/lib/api/api';
import { LOADING_QUERY_KEY } from '@/constants/queryKeys';
import LandingTitle from './_components/landing/LandingTitle';

export default async function Landing() {
  const queryClient = new QueryClient();
  // 랜덤 포켓몬을 네트워크 요청으로 받아 표출할 로딩용 컴포넌트를 위한 prefetchQuery
  await queryClient.prefetchQuery({ queryKey: [LOADING_QUERY_KEY], queryFn: getLoadingPokemonImage });

  return (
    <div className="flex justify-center items-center w-screen h-screen px-3 sm:px-5">
      <div className="relative flex flex-col justify-between items-center gap-8 w-full min-h-[500px] sm:min-h-[700px] pb-6 sm:pb-10 max-w-[1200px] rounded-3xl bg-[#F2F4F6] border-4 border-[#ffffff] px-[10px]">
        <LandingTitle />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PokemonQuiz />
        </HydrationBoundary>
      </div>
    </div>
  );
}
