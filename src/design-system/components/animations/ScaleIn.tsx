'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { useMotionVariants } from '../../utilities/AnimationProvider';
import { animations, durations } from '../../tokens/motion';

interface ScaleInProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  delay?: number;
  duration?: keyof typeof durations;
  className?: string;
}

export const ScaleIn = forwardRef<HTMLDivElement, ScaleInProps>(
  ({ children, delay = 0, duration = 'fast', className = '', ...props }, ref) => {
    const variants = useMotionVariants(animations.scale);

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

ScaleIn.displayName = 'ScaleIn';