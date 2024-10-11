'use client';
import convertHexToRGBA from '@/utils/convertHexToRGBA';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useToggle } from '@/hooks/useToggle';
import { TYPE_BY_COLOR } from '@/lib/constant';
import { FormEvent, RefObject } from 'react';

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
  handleSearchValue: (event: FormEvent<HTMLFormElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  handleResetSearchedPokemon: () => void;
}

export default function SearchSection({
  handleSearchValue,
  activedTypeNum,
  handleTypeButton,
  handleResetButton,
  inputRef,
  handleResetSearchedPokemon,
}: SearchSectionProps) {
  const { toggleValue, switchToggle } = useToggle();

  return (
    <div className="pt-20">
      <form
        onSubmit={e => {
          handleResetSearchedPokemon();
          handleResetButton();
          handleSearchValue(e);
        }}
        className="flex w-full justify-center  gap-1 pb-10"
      >
        <div className="flex h-12 w-[60%] shadow-xl justify-between px-5 py-3 items-center rounded-xl bg-gray-50">
          <input
            ref={inputRef}
            name="pokemonName"
            placeholder="찾으실 포켓몬 이름을 입력하세요."
            className=" w-full px-3 py-1 outline-none"
          />
          <button type="submit" className="w-16 h-full  rounded-md bg-gray-200 shadow-xl">
            검색
          </button>
        </div>
      </form>
      <div className="flex gap-3">
        <button
          className={classNames(
            toggleValue ? 'bg-gray-200 shadow-none top-1' : 'bg-white shadow-xl',
            ' px-5 py-3 flex hover:bg-gray-200 active:shadow-none active:top-1 justify-center relative rounded-xl items-center ',
          )}
          onClick={switchToggle}
        >
          {toggleValue ? '타입 접기' : '타입 열기'}
        </button>
        <button
          onClick={() => {
            handleResetButton();
            handleResetSearchedPokemon();
          }}
          className="bg-white active:shadow-none active:top-1 relative hover:bg-gray-200 px-5 py-3 flex justify-center rounded-xl items-center shadow-xl"
        >
          초기화
        </button>
      </div>
      {toggleValue && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-3 pt-5 grid-cols-6 "
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
                {typeInfo['ko']}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
