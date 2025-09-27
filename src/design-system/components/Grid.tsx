/**
 * Grid Component
 * 
 * 12-column fluid grid system with generous gutters
 * Supports responsive column layouts
 */

import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GridProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
}

// Gap size variants
const gapSizes = {
  sm: 'gap-4',    // 16px
  base: 'gap-6',  // 24px
  lg: 'gap-8',    // 32px
  xl: 'gap-12',   // 48px
} as const;

// Column utilities
const getColumnClass = (cols: number) => {
  const columnMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  } as const;
  
  return columnMap[cols as keyof typeof columnMap] || 'grid-cols-1';
};

const getResponsiveColumnClasses = (cols: GridProps['cols']) => {
  if (typeof cols === 'number') {
    return getColumnClass(cols);
  }
  
  if (typeof cols === 'object') {
    const classes = [];
    if (cols.sm) classes.push(`sm:${getColumnClass(cols.sm).replace('grid-', 'grid-')}`);
    if (cols.md) classes.push(`md:${getColumnClass(cols.md).replace('grid-', 'grid-')}`);
    if (cols.lg) classes.push(`lg:${getColumnClass(cols.lg).replace('grid-', 'grid-')}`);
    if (cols.xl) classes.push(`xl:${getColumnClass(cols.xl).replace('grid-', 'grid-')}`);
    return classes.join(' ');
  }
  
  return 'grid-cols-1';
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, cols = 1, gap = 'base', className = '', ...props }, ref) => {
    const gapClass = gapSizes[gap];
    const colsClass = getResponsiveColumnClasses(cols);
    
    const baseClasses = [
      'grid',
      colsClass,
      gapClass,
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

Grid.displayName = 'Grid';

// Grid Item Component for specific column spans
interface GridItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  span?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  start?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
}

const getSpanClass = (span: number) => {
  const spanMap = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  } as const;
  
  return spanMap[span as keyof typeof spanMap] || 'col-span-1';
};

const getStartClass = (start: number) => {
  const startMap = {
    1: 'col-start-1',
    2: 'col-start-2',
    3: 'col-start-3',
    4: 'col-start-4',
    5: 'col-start-5',
    6: 'col-start-6',
    7: 'col-start-7',
    8: 'col-start-8',
    9: 'col-start-9',
    10: 'col-start-10',
    11: 'col-start-11',
    12: 'col-start-12',
  } as const;
  
  return startMap[start as keyof typeof startMap] || '';
};

const getResponsiveSpanClasses = (span: GridItemProps['span']) => {
  if (typeof span === 'number') {
    return getSpanClass(span);
  }
  
  if (typeof span === 'object') {
    const classes = [];
    if (span.sm) classes.push(`sm:${getSpanClass(span.sm)}`);
    if (span.md) classes.push(`md:${getSpanClass(span.md)}`);
    if (span.lg) classes.push(`lg:${getSpanClass(span.lg)}`);
    if (span.xl) classes.push(`xl:${getSpanClass(span.xl)}`);
    return classes.join(' ');
  }
  
  return '';
};

const getResponsiveStartClasses = (start: GridItemProps['start']) => {
  if (typeof start === 'number') {
    return getStartClass(start);
  }
  
  if (typeof start === 'object') {
    const classes = [];
    if (start.sm) classes.push(`sm:${getStartClass(start.sm)}`);
    if (start.md) classes.push(`md:${getStartClass(start.md)}`);
    if (start.lg) classes.push(`lg:${getStartClass(start.lg)}`);
    if (start.xl) classes.push(`xl:${getStartClass(start.xl)}`);
    return classes.join(' ');
  }
  
  return '';
};

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ children, span, start, className = '', ...props }, ref) => {
    const spanClass = getResponsiveSpanClasses(span);
    const startClass = getResponsiveStartClasses(start);
    
    const baseClasses = [
      spanClass,
      startClass,
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

GridItem.displayName = 'GridItem';