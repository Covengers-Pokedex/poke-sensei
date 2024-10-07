import { ReactNode } from 'react';
import BackDrop from './BackDrop';
import Portal from './Portal';
import classNames from 'classnames';
import { useHidden } from '@/hooks/useHidden';

interface ModalFrameProps {
  isOpenModal: boolean;
  closeModal: () => void;
  children: ReactNode;
  backdropBgColor?: string;
}

export default function ModalFrame({ isOpenModal, closeModal, children, backdropBgColor }: ModalFrameProps) {
  const { isHidden } = useHidden(isOpenModal);
  return (
    <>
      {!isHidden && (
        <Portal elementId="modal">
          <BackDrop closeModal={closeModal} backdropBgColor={backdropBgColor} />
          <div className="fixed modal-z-index viewport-center">
            <div className={classNames(isOpenModal ? 'animate-fadeInBottom' : 'animate-fadeOutBottom')}>{children}</div>
          </div>
        </Portal>
      )}
    </>
  );
}
