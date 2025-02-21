'use client';

import Person from '@/assets/icon/person.svg';
import { cn } from '@/util/cn';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

/**
 * 기본적인 프로그래스바 컴포넌트입니다.
 * @example
 * // 기본 사용법
 * <Progress total={50} value={33} />
 *
 * @param {object} props
 * @param {string} [props.className] - Tailwind CSS 클래스를 통한 커스텀 스타일
 * @param {number} [props.total] - 전체 값
 * @param {number} [props.value] - 현재 진행된 값
 */

interface ProgressProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    'value'
  > {
  total: number;
  value: number;
}

/**
 * 기본적인 프로그래스바 컴포넌트입니다.
 * @example
 * // 기본 사용법
 * <Progress total={50} value={33} />
 *
 * @param {object} props
 * @param {string} [props.className] - Tailwind CSS 클래스를 통한 커스텀 스타일
 * @param {number} [props.total] - 전체 값
 * @param {number} [props.value] - 현재 진행된 값
 */

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, total, value, ...props }, ref) => (
  <div className={className}>
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('relative h-[6px] w-full rounded-full bg-Cgray200')}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-main transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    <div className="relative mt-2 flex items-center justify-end">
      <Person />
      <span className="typo-button1 ml-1 text-Cgray500">
        {value}/{total}
      </span>
    </div>
  </div>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
