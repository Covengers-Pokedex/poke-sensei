import { useToggle } from '@/hooks/useToggle';
import ModalFrame from '../modal/ModalFrame';
import FavoriteModal from '../pokemonModal/FavoriteModal';
import { useLanguageStore } from '@/stores/useLanguageStore';

export default function MyFavoriteButton() {
  const { language } = useLanguageStore();
  const { toggleValue, switchToggle, turnOffToggle } = useToggle();
  return (
    <>
      <ModalFrame isOpenModal={toggleValue} closeModal={turnOffToggle} backdropBgColor="#000000">
        <FavoriteModal turnOffToggle={turnOffToggle} />
      </ModalFrame>

      <button
        type="button"
        className="absolute top-12 sm:top-11 right-3 translate-y-[-50%] text-sm sm:text-[16px] px-3 rounded-lg bg-[#D9D9D9] shadow-[2px_4px_4px_rgba(0,0,0,0.2)] transition-all hover:bg-[#F9DC42] leading-[30px] h-[30px] sm:leading-[35px] sm:h-[35px]"
        onClick={switchToggle}
      >
        {language === 'ko' ? '내 포켓몬' : 'Favorite'}
      </button>
    </>
  );
}
