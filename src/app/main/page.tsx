import getQueryClient from '@/utils/getQueryClient';
import PokemonList from '../_components/main/PokemonList';
import { getPokemonAllList } from '@/lib/api/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
export default async function MainPage() {
  const queryClient = getQueryClient();

  // 서버에서 데이터를 미리 가져옴
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: () => getPokemonAllList({ offset: undefined, limit: undefined }),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <div className="max-w-[1200px] m-10 xl:m-auto mt-20 rounded-xl px-5 xl:px-10 min-h-[100vh] bg-gray-200">
          <PokemonList />
        </div>
      </HydrationBoundary>
    </>
  );
}
