'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { useMotionVariants } from '../../utilities/AnimationProvider';
import { staggeredContainer, stagger } from '../../tokens/motion';

interface StaggerContainerProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  staggerDelay?: keyof typeof stagger;
  delayChildren?: number;
  className?: string;
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ 
    children, 
    staggerDelay = 'base', 
    delayChildren = 0.1, 
    className = '', 
    ...props 
  }, ref) => {
    const containerVariants = {
      animate: {
        transition: {
          staggerChildren: stagger[staggerDelay],
          delayChildren,
        },
      },
      exit: {
        transition: {
          staggerChildren: stagger.fast,
          staggerDirection: -1,
        },
      },
    };

    const variants = useMotionVariants(containerVariants);

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

StaggerContainer.displayName = 'StaggerContainer';