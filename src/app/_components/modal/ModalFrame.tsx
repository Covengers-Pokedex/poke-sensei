import { ReactNode } from 'react';
import BackDrop from './BackDrop';
import Portal from './Portal';
import classNames from 'classnames';
import { useHidden } from '@/hooks/useHidden';

interface ModalFrameProps {
  isOpenModal: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export default function ModalFrame({ isOpenModal, closeModal, children }: ModalFrameProps) {
  //TODO: toggleModal 하면 닫힘 애니메이션 나오는 순간에 클릭하면 닫히다가 다시 열림
  const { isHidden } = useHidden(isOpenModal);
  return (
    <>
      {!isHidden && (
        <Portal>
          <BackDrop onCloseModal={closeModal} />
          <div className="fixed modal-z-index viewport-center">
            <div className={classNames(isOpenModal ? 'animate-fadeInBottom' : 'animate-fadeOutBottom')}>{children}</div>
          </div>
        </Portal>
      )}
    </>
  );
}
