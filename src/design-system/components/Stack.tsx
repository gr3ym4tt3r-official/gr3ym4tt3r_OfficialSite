'use client';

/**
 * Stack Component
 * 
 * Provides consistent vertical spacing between children
 * Supports alignment and responsive spacing
 */

import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface StackProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  space?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

// Space size variants (following 4px rhythm)
const spaceSizes = {
  xs: 'space-y-1',   // 4px
  sm: 'space-y-2',   // 8px
  base: 'space-y-4', // 16px
  lg: 'space-y-6',   // 24px
  xl: 'space-y-8',   // 32px
  '2xl': 'space-y-12', // 48px
  '3xl': 'space-y-16', // 64px
} as const;

// Alignment variants
const alignmentClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, space = 'base', align = 'start', className = '', ...props }, ref) => {
    const spaceClass = spaceSizes[space];
    const alignClass = alignmentClasses[align];
    
    const baseClasses = [
      'flex',
      'flex-col',
      spaceClass,
      alignClass,
    ].filter(Boolean).join(' ');

    const combinedClassName = [baseClasses, className].filter(Boolean).join(' ');

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Stack.displayName = 'Stack';

// Horizontal Stack (Flex) Component
interface FlexProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  space?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  wrap?: boolean;
  className?: string;
}

const flexSpaceSizes = {
  xs: 'space-x-1',   // 4px
  sm: 'space-x-2',   // 8px
  base: 'space-x-4', // 16px
  lg: 'space-x-6',   // 24px
  xl: 'space-x-8',   // 32px
  '2xl': 'space-x-12', // 48px
  '3xl': 'space-x-16', // 64px
} as const;

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const directionClasses = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
} as const;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    children, 
    space = 'base', 
    align = 'start', 
    justify = 'start',
    direction = 'row',
    wrap = false,
    className = '', 
    ...props 
  }, ref) => {
    const spaceClass = direction.includes('col') ? spaceSizes[space] : flexSpaceSizes[space];
    const alignClass = alignmentClasses[align];
    const justifyClass = justifyClasses[justify];
    const directionClass = directionClasses[direction];
    const wrapClass = wrap ? 'flex-wrap' : '';
    
    const baseClasses = [
      'flex',
      directionClass,
      spaceClass,
      alignClass,
      justifyClass,
      wrapClass,
    ].filter(Boolean).join(' ');

    const combinedClassName = [baseClasses, className].filter(Boolean).join(' ');

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Flex.displayName = 'Flex';