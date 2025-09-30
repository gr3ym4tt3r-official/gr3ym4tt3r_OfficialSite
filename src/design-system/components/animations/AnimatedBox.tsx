'use client';

import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { useMotionVariants } from '../../utilities/AnimationProvider';
import { animations } from '../../tokens/motion';

interface AnimatedBoxProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  animation?: keyof typeof animations;
  customVariants?: Variants;
  stagger?: boolean;
  delay?: number;
  className?: string;
}

export const AnimatedBox = forwardRef<HTMLDivElement, AnimatedBoxProps>(
  ({ 
    children, 
    animation = 'fade',
    customVariants,
    stagger = false,
    delay = 0,
    className = '',
    ...props 
  }, ref) => {
    const baseVariants = customVariants || animations[animation];
    const variants = useMotionVariants(baseVariants);

    const containerVariants = stagger ? {
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    } : undefined;

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={stagger ? containerVariants : variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          delay: stagger ? 0 : delay,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedBox.displayName = 'AnimatedBox';