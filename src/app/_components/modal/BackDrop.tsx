export default function BackDrop({ onCloseModal }: { onCloseModal: () => void }) {
  // TODO: 백그라운드 컬러 추가할 수 있게 하기
  return <div onClick={onCloseModal} className="backdrop bg-red-500 opacity-5 modal-backdrop-z-index" />;
}
