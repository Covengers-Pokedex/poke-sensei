'use client';
import { PokemonTypeWithColor } from '@/lib/api/type';
import convertHexToRGBA from '@/utils/convertHexToRGBA';
import classNames from 'classnames';
import { useState } from 'react';

export default function SearchSection() {
  const [activedTypes, setActivedTypes] = useState<string[]>([]);
  const handleTypeButton = (type: string) => {
    if (activedTypes.includes(type)) {
      setActivedTypes(prev => prev.filter(prevType => prevType !== type));
      return;
    }
    setActivedTypes(prev => [...prev, type]);
  };
  console.log(activedTypes);
  return (
    <div className="pt-20">
      <form className="flex w-full justify-center  gap-1 pb-10">
        <div className="flex h-10 w-[60%] shadow-xl justify-between px-3 py-1 items-center rounded-xl bg-gray-50">
          <input placeholder="찾으실 포켓몬 이름을 입력하세요." className=" w-full px-3 py-1 outline-none" />
          <button className="w-16 h-full  rounded-xl bg-gray-200">검색</button>
        </div>
      </form>
      <div className="grid gap-3 grid-cols-6">
        {Object.entries(PokemonTypeWithColor).map(([type, color]) => (
          <div className="relative h-[40px] w-full">
            <button
              onClick={() => {
                handleTypeButton(type);
              }}
              className={classNames(
                'rounded-xl w-full flex opacity-50 hover:opacity-100 transition-all absolute justify-center py-1.5 text-white',
              )}
              style={
                activedTypes.includes(type)
                  ? {
                      backgroundColor: color,
                      boxShadow: `none`,
                      top: '5px',
                      left: '2px',
                      transition: 'top 1s ease, left 1s ease',
                      opacity: '1',
                    }
                  : {
                      backgroundColor: color,
                      boxShadow: `2px 5px 0 ${convertHexToRGBA(color, 0.6)}`,
                      transition: 'top 1s ease, left 1s ease',
                    }
              }
              key={type}
            >
              {type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
