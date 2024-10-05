import { ReactNode } from 'react';
import BackDrop from './BackDrop';
import Portal from './Portal';

interface ModalFrameProps {
  isOpenModal: boolean;
  toggleModal: () => void;
  children: ReactNode;
}

export default function ModalFrame({ isOpenModal, toggleModal, children }: ModalFrameProps) {
  return (
    <>
      {isOpenModal && (
        <Portal>
          <BackDrop onCloseModal={toggleModal} />
          <div className="fixed modal-z-index viewport-center">{children}</div>
        </Portal>
      )}
    </>
  );
}
