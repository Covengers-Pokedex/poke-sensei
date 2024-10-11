import { getLoadingImage, getRandomNumber } from '@/lib/api/api';
import Image from 'next/image';

// SSR 과정의 로딩중에 표출되는 로딩 컴포넌트
export default async function Loading() {
  const randomNumber = getRandomNumber(1, 649); // 2d live gif가 존재하는 BW 버전 포켓몬까지만 불러옴
  // 단순 조회용, 매번 랜덤 이미지를 불러오는 것이 목적이므로 쿼리키에 의한 캐시가 의미 없고,
  // 오히려 prefetchQuery나 useQuery를 사용하는 것이 코드를 복잡하게 만들 수 있기 때문에 사용하지 않음
  const pokemonImgSrc = await getLoadingImage(randomNumber);

  return (
    // 서버 컴포넌트와 클라이언트 컴포넌트 양측에서 모두 사용하기 위해 absolute 속성 사용
    // 상위에 static 이외의 요소가 없다면 최상위 html 태그가 기준이 됨
    <div className="absolute flex flex-col h-full w-full justify-center items-center gap-2">
      {/* 이미지가 없을 때 레이아웃 시프트를 없애기 위함 */}
      <div className="h-[80px]">
        {pokemonImgSrc && (
          <Image className="h-[80px] w-auto" src={pokemonImgSrc} alt="로딩중 포켓몬 이미지" height={80} width={80} />
        )}
      </div>
      <p className="text-xl font-black">loading...</p>
    </div>
  );
}
