interface BackDropProps {
  closeModal: () => void;
  backdropBgColor?: string;
}

export default function BackDrop({ closeModal, backdropBgColor }: BackDropProps) {
  return (
    <div
      onClick={closeModal}
      className="backdrop opacity-30 modal-backdrop-z-index"
      style={{ backgroundColor: backdropBgColor }}
    />
  );
}
