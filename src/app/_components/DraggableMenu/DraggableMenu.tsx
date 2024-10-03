'use client';

import { motion, useDragControls } from 'framer-motion';
import MonsterBall from './MonsterBall';
import { useRef, useState } from 'react';
import SearchMenu from './SearchMenu';
import classNames from 'classnames';

export default function DraggableMenu() {
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  const handleMonsterBallClick = () => {
    // 드래그가 아니라 클릭이 일어날 경우에만 메뉴가 열리도록 분기 처리
    if (!isDragging) {
      setIsOpen(prevState => !prevState);
    }
  };

  return (
    <div className={'relative'}>
      <div ref={constraintsRef} className={'absolute h-[100dvh] w-[100dvw] -z-10'}>
        <motion.div
          dragControls={dragControls}
          drag
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileDrag={{ cursor: 'grabbing' }}
          className={'absolute'}
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
          dragElastic={0.5}
          style={{ touchAction: 'none' }}
        >
          <div className={'flex gap-5'}>
            <article
              onClick={handleMonsterBallClick}
              className={classNames('hover:cursor-pointer', isDragging && 'hover:cursor-grab')}
            >
              <MonsterBall />
            </article>
            <SearchMenu isOpenMenu={isOpen} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
