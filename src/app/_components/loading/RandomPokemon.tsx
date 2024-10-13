import Image from 'next/image';

export default function RandomPokemon({ pokemonImgSrc }: { pokemonImgSrc: any }) {
  return (
    // 서버 컴포넌트와 클라이언트 컴포넌트 양측에서 모두 사용하기 위해 absolute 속성 사용
    // 상위에 static 이외의 요소가 없다면 최상위 html 태그가 기준이 됨
    <div className="absolute flex flex-col h-full w-full justify-center items-center gap-2">
      {/* 이미지가 없을 때 레이아웃 시프트를 없애기 위함 */}
      <div className="h-[80px]">
        {pokemonImgSrc && (
          <Image
            className="h-[80px] w-auto"
            src={pokemonImgSrc}
            alt="로딩중 포켓몬 이미지"
            height={80}
            width={80}
            unoptimized
          />
        )}
      </div>
      <p className="text-xl font-black">loading...</p>
    </div>
  );
}
