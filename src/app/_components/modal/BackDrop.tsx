import classNames from 'classnames';

interface BackDropProps {
  closeModal: () => void;
  backdropBgColor?: string;
  className?: string;
}

export default function BackDrop({ closeModal, backdropBgColor, className }: BackDropProps) {
  return (
    <div
      onClick={closeModal}
      className={classNames('backdrop opacity-30 modal-backdrop-z-index', className)}
      style={{ backgroundColor: backdropBgColor }}
    />
  );
}
