'use client';

import { motion, useDragControls } from 'framer-motion';
import MonsterBall from './MonsterBall';
import { useRef, useState } from 'react';
import SearchMenuContainer from './SearchMenuContainer';
import classNames from 'classnames';
import Portal from '../modal/Portal';
import { useToggle } from '@/hooks/useToggle';

export default function DraggableMenuTrigger() {
  const [isDragging, setIsDragging] = useState(false);
  const { toggleValue, switchToggle, turnOffToggle } = useToggle();
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  const menuContainer = useRef(null);

  const handleMenuDisplayClick = () => {
    // 드래그가 아니라 클릭이 일어날 경우에만 메뉴가 열리도록 분기 처리
    if (!isDragging) {
      switchToggle();
    }
  };

  return (
    <Portal elementId="draggable">
      <div ref={constraintsRef} className="backdrop pointer-events-none draggable-z-index">
        <SearchMenuContainer isOpenMenu={toggleValue} onCloseMenuClick={turnOffToggle} />
        <motion.div
          ref={menuContainer}
          dragControls={dragControls}
          drag
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileDrag={{ cursor: 'grabbing' }}
          className="absolute pointer-events-auto "
          dragConstraints={constraintsRef} // 드래그 요소가 넘어가지 못하는 경계 설정
          dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }} // 드래그 요소가 경계를 벗어날 때 튕겨서 돌아오는 효과
          dragElastic={0.5} // 경계 구간에 얼마나 들어갈 수 있는 지 설정
          style={{ touchAction: 'none' }} // 모바일에서 터치 가능하려면 넣어야 하는 설정
        >
          <div className="flex gap-5">
            <article
              onClick={handleMenuDisplayClick}
              className={classNames('hover:cursor-pointer', isDragging && 'hover:cursor-grab')}
            >
              <MonsterBall />
            </article>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}
