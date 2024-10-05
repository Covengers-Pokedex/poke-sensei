export default function BackDrop({ onCloseModal }: { onCloseModal: () => void }) {
  return <div onClick={onCloseModal} className="backdrop modal-z-index" />;
}
