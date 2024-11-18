import getQueryClient from '@/utils/getQueryClient';
import PokedexMain from '../_components/main/PokedexMain';
import { getLoadingPokemonImage, getPokemonAllList } from '@/lib/api/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { POKEMON_QUERY_KEY } from '@/constants/queryKeys';
import QuizButton from '../_components/button/QuizButton';
import MainTitle from '../_components/main/MainTitle';

export default async function MainPage() {
  const queryClient = getQueryClient();

  // 서버에서 데이터를 미리 가져옴
  await queryClient.prefetchInfiniteQuery({
    queryKey: [POKEMON_QUERY_KEY],
    queryFn: () => getPokemonAllList({ offset: undefined, limit: undefined, language: 'ko' }),
    initialPageParam: 0,
  });

  // 로딩시 보여줄 랜덤 포켓몬 이미지 prefetch
  await queryClient.prefetchQuery({ queryKey: ['loading'], queryFn: getLoadingPokemonImage });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-col justify-between relative items-center gap-8 m-auto mt-10 w-full min-h-[500px] sm:min-h-[700px] pb-6 sm:pb-10 max-w-[1200px] rounded-3xl bg-[#F2F4F6] border-4 border-[#ffffff] px-[10px]">
      <MainTitle />
      <QuizButton />
      <div className="flex flex-col w-full">
        <HydrationBoundary state={dehydratedState}>
          <PokedexMain />
        </HydrationBoundary>
      </div>
    </div>
  );
}
