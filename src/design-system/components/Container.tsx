/**
 * Container Component
 * 
 * Provides consistent layout structure with responsive padding
 * Max-width 1440px with generous gutters as specified
 */

import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { grid } from '../tokens/spacing';

interface ContainerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full';
  className?: string;
}

// Container size variants
const containerSizes = {
  sm: 'max-w-3xl',    // 768px
  base: 'max-w-5xl',  // 1024px  
  lg: 'max-w-6xl',    // 1152px
  xl: 'max-w-7xl',    // 1280px
  full: 'max-w-[1440px]', // Design system max
} as const;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = 'full', className = '', ...props }, ref) => {
    const sizeClass = containerSizes[size];
    
    const baseClasses = [
      'mx-auto',
      'w-full',
      sizeClass,
      // Responsive padding (generous gutters)
      'px-4',    // 16px mobile (spacing[4])
      'md:px-6', // 24px tablet (spacing[6])
      'lg:px-8', // 32px desktop (spacing[8])
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

Container.displayName = 'Container';