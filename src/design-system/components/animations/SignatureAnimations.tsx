'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { useMotionVariants } from '../../utilities/AnimationProvider';
import { animations, durations } from '../../tokens/motion';

// Kinetic Typography Animation - for hero text
interface KineticTextProps extends Omit<HTMLMotionProps<'h1'>, 'variants'> {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const KineticText = forwardRef<HTMLHeadingElement, KineticTextProps>(
  ({ children, delay = 0, className = '', ...props }, ref) => {
    const variants = useMotionVariants(animations.kineticType);

    return (
      <motion.h1
        ref={ref}
        className={className}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{
          delay,
        }}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        {...props}
      >
        {children}
      </motion.h1>
    );
  }
);

KineticText.displayName = 'KineticText';

// Wipe Animation - for Growth category cards
interface WipeInProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const WipeIn = forwardRef<HTMLDivElement, WipeInProps>(
  ({ children, delay = 0, className = '', ...props }, ref) => {
    const variants = useMotionVariants(animations.wipe);

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          delay,
        }}
        style={{
          transformOrigin: 'left center',
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

WipeIn.displayName = 'WipeIn';

// Signal Red Glow Animation - for interactive elements
interface GlowProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  trigger?: boolean;
  className?: string;
}

export const SignalGlow = forwardRef<HTMLDivElement, GlowProps>(
  ({ children, trigger = false, className = '', ...props }, ref) => {
    const variants = useMotionVariants(animations.glow);

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variants}
        initial="initial"
        animate={trigger ? "animate" : "initial"}
        style={{
          willChange: 'box-shadow, transform',
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

SignalGlow.displayName = 'SignalGlow';

// Hover Animation Wrapper - applies hover animations to children
interface HoverAnimationProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  type?: 'button' | 'card' | 'socialIcon' | 'text';
  className?: string;
}

export const HoverAnimation = forwardRef<HTMLDivElement, HoverAnimationProps>(
  ({ children, type = 'button', className = '', ...props }, ref) => {
    const hoverVariants = {
      button: {
        scale: 1.02,
        transition: { duration: durations.fast },
      },
      card: {
        y: -2,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        transition: { duration: durations.base },
      },
      socialIcon: {
        scale: 1.1,
        boxShadow: '0 0 15px 2px rgba(239, 68, 68, 0.4)',
        transition: { duration: durations.fast },
      },
      text: {
        color: '#ef4444',
        transition: { duration: durations.fast },
      },
    };

    const variants = useMotionVariants({
      initial: {},
      hover: hoverVariants[type],
    });

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variants}
        initial="initial"
        whileHover="hover"
        style={{
          willChange: 'transform, box-shadow, color',
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

HoverAnimation.displayName = 'HoverAnimation';