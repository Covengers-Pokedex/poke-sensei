import getQueryClient from '@/utils/getQueryClient';
import PokedexMain from '../_components/main/PokedexMain';
import { getLoadingPokemonImage, getPokemonAllList } from '@/lib/api/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Link from 'next/link';
import DraggableMenu from '../_components/draggableSearchMenu/DraggableMenu';
import { POKEMON_QUERY_KEY } from '@/constants/queryKeys';
export default async function MainPage() {
  const queryClient = getQueryClient();

  // 서버에서 데이터를 미리 가져옴
  await queryClient.prefetchInfiniteQuery({
    queryKey: [POKEMON_QUERY_KEY],
    queryFn: () => getPokemonAllList({ offset: undefined, limit: undefined }),
    initialPageParam: 0,
  });

  // 로딩시 보여줄 랜덤 포켓몬 이미지 prefetch
  await queryClient.prefetchQuery({ queryKey: ['loading'], queryFn: getLoadingPokemonImage });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-col justify-between relative items-center gap-8 m-auto mt-10 w-full min-h-[500px] sm:min-h-[700px] pb-6 sm:pb-10 max-w-[1200px] rounded-3xl bg-[#F2F4F6] border-4 border-[#ffffff] px-[10px]">
      <div className="w-full mt-[-20px] sm:mt-[-30px]">
        <h1 className="title-line text-2xl sm:text-5xl lg:text-6xl text-center text-[#F9DC42]">포켓몬 도감</h1>
      </div>
      <Link
        href="/"
        className="absolute top-12 sm:top-10 text-sm sm:text-[16px] right-3 translate-y-[-50%] px-3 rounded-lg bg-[#D9D9D9] shadow-[2px_4px_4px_rgba(0,0,0,0.2)] transition-all hover:bg-[#F9DC42] leading-[30px] h-[30px] sm:leading-[35px] sm:h-[35px]"
      >
        포켓몬 퀴즈
      </Link>
      <div className="flex flex-col w-full">
        <HydrationBoundary state={dehydratedState}>
          <PokedexMain />
          <DraggableMenu>
            <div>내부 컨텐츠</div>
          </DraggableMenu>
        </HydrationBoundary>
      </div>
    </div>
  );
}
