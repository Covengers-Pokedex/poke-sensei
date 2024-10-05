export default function BackDrop({ onCloseModal }: { onCloseModal: () => void }) {
  return <div onClick={onCloseModal} className="backdrop bg-red-500 opacity-5 modal-backdrop-z-index" />;
}
