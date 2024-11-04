import classNames from 'classnames';

interface ModalTabMenuProps {
  tabActive: string;
  setTabActive: React.Dispatch<React.SetStateAction<string>>;
  shiny: boolean;
  setShiny: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalTabMenu({ tabActive, setTabActive, shiny, setShiny }: ModalTabMenuProps) {
  return (
    <div className="flex justify-between items-center gap-3">
      <div>
        <button
          type="button"
          onClick={() => {
            setTabActive('info');
          }}
          className={classNames(
            'w-16 sm:w-24 h-8 text-sm sm:text-base rounded-t-lg',
            tabActive === 'info' ? 'bg-[#ffffff]' : 'bg-[#D9D9D9]',
          )}
        >
          정보
        </button>
        <button
          type="button"
          onClick={() => {
            setTabActive('evolution');
          }}
          className={classNames(
            'w-[70px] sm:w-24 h-8 text-sm sm:text-base rounded-t-lg',
            tabActive === 'evolution' ? 'bg-[#ffffff]' : 'bg-[#D9D9D9]',
          )}
        >
          진화트리
        </button>
        <button
          type="button"
          onClick={() => {
            setTabActive('ability');
          }}
          className={classNames(
            'w-16 sm:w-24 h-8 text-sm sm:text-base rounded-t-lg',
            tabActive === 'ability' ? 'bg-[#ffffff]' : 'bg-[#D9D9D9]',
          )}
        >
          특성
        </button>
      </div>
      <button
        type="button"
        className="flex justify-center items-center text-sm sm:text-base gap-2 sm:gap-3 mr-2 sm:mr-3 outline-text"
        onClick={() => {
          setShiny(!shiny);
        }}
      >
        <span className="relative inline-block w-10 h-5 bg-[#D9D9D9] rounded-xl">
          <span
            className={classNames(
              'absolute top-[2px] inline-block w-4 h-4 rounded-full transition-transform duration-300 ease-in-out',
              shiny ? 'bg-white translate-x-[0px]' : 'bg-[#e6e6e6] translate-x-[-16px]',
            )}
          />
        </span>
        이로치
      </button>
    </div>
  );
}
