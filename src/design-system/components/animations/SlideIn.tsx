'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { useMotionVariants } from '../../utilities/AnimationProvider';
import { animations, durations } from '../../tokens/motion';

type SlideDirection = 'up' | 'down' | 'left' | 'right';

interface SlideInProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  direction?: SlideDirection;
  delay?: number;
  duration?: keyof typeof durations;
  className?: string;
}

const getAnimationKey = (direction: SlideDirection): keyof typeof animations => {
  const animationMap = {
    up: 'slideUp',
    down: 'slideDown',
    left: 'slideLeft',
    right: 'slideRight',
  } as const;
  
  return animationMap[direction];
};

export const SlideIn = forwardRef<HTMLDivElement, SlideInProps>(
  ({ children, direction = 'up', delay = 0, duration = 'base', className = '', ...props }, ref) => {
    const animationKey = getAnimationKey(direction);
    const variants = useMotionVariants(animations[animationKey]);

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: durations[duration],
          delay,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

SlideIn.displayName = 'SlideIn';