'use client';

import { motion, useDragControls } from 'framer-motion';
import MonsterBall from './MonsterBall';
import { useRef, useState } from 'react';

export default function DraggableMenu() {
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  return (
    <div className={'relative'}>
      <div ref={constraintsRef} className={'absolute h-[100dvh] w-[100dvw] -z-10'}>
        <motion.div
          dragControls={dragControls}
          drag
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileTap={{ cursor: 'grabbing' }}
          className={'absolute'}
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
          dragElastic={0.5}
          dragMomentum={true}
          style={{ touchAction: 'none' }}
        >
          <MonsterBall />
        </motion.div>
      </div>
    </div>
  );
}
