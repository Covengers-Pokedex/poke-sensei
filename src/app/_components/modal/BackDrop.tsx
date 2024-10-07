import classNames from 'classnames';

interface BackDropProps {
  closeModal: () => void;
  backdropBgColor?: string;
}

export default function BackDrop({ closeModal, backdropBgColor }: BackDropProps) {
  return (
    <div
      onClick={closeModal}
      className={classNames('backdrop opacity-30 modal-backdrop-z-index', backdropBgColor && `bg-[${backdropBgColor}]`)}
    />
  );
}
