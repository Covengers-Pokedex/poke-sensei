import getQueryClient from '@/utils/getQueryClient';
import PokemonList from '../_components/main/PokemonList';
import { getLoadingPokemonImage, getPokemonAllList } from '@/lib/api/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import SearchSection from '../_components/main/SearchSection';
import DraggableMenu from '../_components/draggableSearchMenu/DraggableMenu';
export default async function MainPage() {
  const queryClient = getQueryClient();

  // 서버에서 데이터를 미리 가져옴
  // TODO: 쿼리키 상수화
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: () => getPokemonAllList({ offset: undefined, limit: undefined }),
    initialPageParam: 0,
  });

  // 로딩시 보여줄 랜덤 포켓몬 이미지 prefetch
  await queryClient.prefetchQuery({ queryKey: ['loading'], queryFn: getLoadingPokemonImage });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="max-w-[1200px]  mb-0 xl:mx-auto mt-20 rounded-xl px-5 xl:px-10 h-full bg-[#F2F4F6]">
      <SearchSection />
      <HydrationBoundary state={dehydratedState}>
        <PokemonList />
        <DraggableMenu>
          <div>내부 컨텐츠</div>
        </DraggableMenu>
      </HydrationBoundary>
    </div>
  );
}
