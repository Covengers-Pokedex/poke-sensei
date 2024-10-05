'use client';

import { useToggle } from '@/hooks/useToggle';
import ModalFrame from './_components/modal/ModalFrame';

export default function Landing() {
  const { toggleValue, switchToggle, turnOffToggle } = useToggle();
  return (
    <div>
      <button onClick={switchToggle}>test button</button>
      <ModalFrame isOpenModal={toggleValue} closeModal={turnOffToggle}>
        <div className="h-96 w-96 bg-slate-600">모달 내부 테스트</div>
      </ModalFrame>
      Landing
    </div>
  );
}
