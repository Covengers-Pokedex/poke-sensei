'use client';
import convertHexToRGBA from '@/utils/convertHexToRGBA';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useToggle } from '@/hooks/useToggle';
import { TYPE_BY_COLOR } from '@/constants/mappingTypeColor';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { FilteredPokemonArr } from '@/types/filteredPokemon';
import { localeText } from '@/constants/localeText';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 150, opacity: 0, transition: { duration: 0.3 } },
  show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

interface SearchSectionProps {
  activedTypeNum: number | null;
  handleTypeButton: (type: number) => void;
  handleResetButton: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleResetSearchedPokemon: () => void;
  searchValue: string;
  filteredPokemon?: FilteredPokemonArr[];
  isModal?: boolean;
  handleClickFilteredPokemon?: (value: FilteredPokemonArr) => void;
}

export default function SearchSection({
  handleSubmit,
  activedTypeNum,
  handleTypeButton,
  handleResetButton,
  handleInputChange,
  filteredPokemon = [],
  searchValue,
  handleResetSearchedPokemon,
  handleClickFilteredPokemon = () => {},
  isModal = false,
}: SearchSectionProps) {
  const { language } = useLanguageStore();
  const [hoverIndex, setHoverIndex] = useState(0);
  const { toggleValue, switchToggle } = useToggle();

  const typeOpen = language === 'ko' ? '타입 열기' : 'type open';
  const typeClose = language === 'ko' ? '타입 접기' : 'type close';
  const showButton = isModal || (!isModal && toggleValue);
  const visibleFiltered = filteredPokemon.slice(0, 5);

  const handleHoverIndex = () => {};
  return (
    <div>
      <form
        onSubmit={e => {
          handleResetSearchedPokemon();
          handleResetButton();
          handleSubmit(e);
        }}
        className={classNames('relative flex w-full justify-center  gap-1', isModal ? 'pb-5' : 'pb-10')}
      >
        <div className="flex h-12 w-full max-w-[500px] shadow-xl justify-between px-5 py-3 items-center rounded-xl bg-gray-50">
          <input
            onChange={handleInputChange}
            value={searchValue}
            name="pokemonName"
            placeholder={
              isModal ? localeText[language].modalSearchInputPlaceholder : localeText[language].searchInputPlaceholder
            }
            className=" w-full bg-transparent px-3 py-1 outline-none"
          />
          <button type="submit" className="w-20 h-full rounded-md bg-gray-200 shadow-xl">
            {language === 'ko' ? '검색' : 'search'}
          </button>
        </div>
        {filteredPokemon.length > 0 && searchValue && (
          <div className="flex bg-gray-50 opacity-90 border-gray-300 border  rounded-xl overflow-hidden flex-col z-[2] w-full absolute top-[60px] left-1/2 -translate-x-1/2  max-w-[500px] ">
            {visibleFiltered.map((pokemonName, index) => (
              <button
                type="button"
                onClick={() => {
                  handleClickFilteredPokemon(pokemonName);
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(0)}
                className={classNames(
                  'w-full border-b border-gray-400 last:border-none flex items-center  py-3 px-10',
                  hoverIndex === index ? 'bg-gray-200' : 'bg-gray-50',
                )}
                key={pokemonName.en}
              >
                {pokemonName[language].split('').map((word, index) => {
                  //포켓몬 이름과 input value를 한글자씩 쪼개서 글자가 포함되어있는지 확인
                  const isHighlighted = searchValue.split('').some(searchWord => {
                    const lowerWord = word.toLowerCase();
                    const lowerValue = searchWord.toLowerCase();
                    return lowerWord === lowerValue;
                  });
                  return isHighlighted ? (
                    <span className="text-blue-600" key={`${pokemonName['en']}-${index}`}>
                      {word}
                    </span>
                  ) : (
                    <span key={`${pokemonName['en']}-${index}`}>{word}</span>
                  );
                })}
              </button>
            ))}
          </div>
        )}
      </form>
      {!isModal && (
        <div className="flex gap-3">
          <button
            className={classNames(
              toggleValue ? 'bg-gray-200 shadow-none top-1' : 'bg-white shadow-xl',
              ' px-5 py-3 flex hover:bg-gray-200 active:shadow-none active:top-1 justify-center relative rounded-xl items-center ',
            )}
            onClick={switchToggle}
          >
            {toggleValue ? typeClose : typeOpen}
          </button>
          <button
            onClick={() => {
              handleResetButton();
              handleResetSearchedPokemon();
            }}
            className="bg-white active:shadow-none active:top-1 relative hover:bg-gray-200 px-5 py-3 flex justify-center rounded-xl items-center shadow-xl"
          >
            {language === 'ko' ? '초기화' : 'reset'}
          </button>
        </div>
      )}
      {showButton && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className={classNames('grid gap-3 pt-5', isModal ? 'grid-cols-3' : 'grid-cols-6')}
        >
          {Object.entries(TYPE_BY_COLOR).map(([typeKey, typeInfo]) => (
            <motion.div variants={item} key={typeKey} className="relative h-[40px] w-full">
              <motion.button
                initial={{
                  top: '0',
                  boxShadow: `0px 7px 2px ${convertHexToRGBA(typeInfo.color, 0.6)}`,
                  opacity: '0.5',
                }}
                animate={
                  activedTypeNum === typeInfo.num
                    ? { top: '7px', boxShadow: `0px 0px 2px ${convertHexToRGBA(typeInfo.color, 0.6)}`, opacity: '1' }
                    : { top: '0', boxShadow: `0px 7px 2px ${convertHexToRGBA(typeInfo.color, 0.6)}`, opacity: '0.5' }
                }
                whileHover={{ opacity: '1' }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  handleResetSearchedPokemon();
                  handleTypeButton(typeInfo.num);
                }}
                className={classNames('rounded-md w-full flex absolute justify-center py-1.5 text-white')}
                style={{ backgroundColor: typeInfo.color }}
                key={typeKey}
              >
                {typeInfo[language]}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
