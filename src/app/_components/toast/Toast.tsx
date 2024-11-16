import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import iconSuccess from '@/images/icons/icon-success.svg';
import iconWarn from '@/images/icons/icon-warn.svg';
import iconError from '@/images/icons/icon-error.svg';
import { Toast as ToastProps, ToastTypes } from '@/types/toast';
import classNames from 'classnames';
import { useToggle } from '@/hooks/useToggle';
import { useToastAction } from '@/stores/actions/useToastAction';

const DELAY = 4 * 1000; // 토스트 삭제 딜레이 4초
const EXIT_ANIMATION_DELAY = 500; // 자연스러운 삭제 애니메이션을 위한 유예 시간 0.5초

export default function Toast({ id, type, message }: ToastProps) {
  const { toggleValue: isExit, turnOnToggle } = useToggle();
  const { removeToast } = useToastAction();

  useEffect(() => {
    const timerId = setTimeout(() => {
      removeToast(id);
    }, DELAY);

    const exitTimerId = setTimeout(() => {
      turnOnToggle();
    }, DELAY - EXIT_ANIMATION_DELAY);

    return () => {
      clearTimeout(timerId);
      clearTimeout(exitTimerId);
    };
  }, []);

  return (
    <div
      className={classNames('w-fit max-w-[90dvw] px-4 py-3 shadow-md rounded-lg text-xs font-bold md:text-lg', {
        'border border-green-500 bg-green-50 text-green-500': type === 'success',
        'border border-yellow-500 bg-white text-yellow-500': type === 'warn',
        'border border-red-500 bg-red-50 text-red-500': type === 'error',
        'animate-fadeIn': !isExit,
        'animate-fadeOut': isExit,
      })}
    >
      <div className="flex items-center w-full gap-1.5">
        {ToastIcon[type]}
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{message}</div>
      </div>
    </div>
  );
}

const ToastIcon: Record<ToastTypes, ReactNode> = {
  success: (
    <Image
      src={iconSuccess}
      alt="성공 메시지 아이콘"
      height={25}
      width={25}
      className="h-5 w-5 md:h-[25px] md:w-[25px]"
      priority
    />
  ),
  warn: (
    <Image
      src={iconWarn}
      alt="경고 메시지 아이콘"
      height={25}
      width={25}
      className="filter-yellow h-5 w-5 md:h-[25px] md:w-[25px]"
      priority
    />
  ),
  error: (
    <Image
      src={iconError}
      alt="실패 메시지 아이콘"
      className="h-5 w-5 md:h-[25px] md:w-[25px]"
      height={25}
      width={25}
      priority
    />
  ),
};
