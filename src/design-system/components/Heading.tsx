/**
 * Heading Component
 * 
 * Typography component for headings with Cinzel (display) and Inter (headings)
 * Supports semantic HTML elements and design system typography scale
 */

import { ReactNode, forwardRef, ElementType } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { typography } from '../tokens/typography';
import { dark, light } from '../tokens/colors';

// Heading levels and their default HTML elements
type HeadingLevel = 'display-2xl' | 'display-xl' | 'display-lg' | 'display-base' | 'display-sm' |
                   'heading-2xl' | 'heading-xl' | 'heading-lg' | 'heading-base' | 'heading-sm';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';

interface HeadingProps {
  children: ReactNode;
  level: HeadingLevel;
  as?: HeadingElement;
  theme?: 'dark' | 'light';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent';
  className?: string;
}

// Map heading levels to default HTML elements
const defaultElements: Record<HeadingLevel, HeadingElement> = {
  'display-2xl': 'h1',
  'display-xl': 'h1', 
  'display-lg': 'h1',
  'display-base': 'h2',
  'display-sm': 'h2',
  'heading-2xl': 'h1',
  'heading-xl': 'h2',
  'heading-lg': 'h3',
  'heading-base': 'h4',
  'heading-sm': 'h5',
};

// Get typography styles for heading level
const getTypographyStyles = (level: HeadingLevel) => {
  if (level.startsWith('display-')) {
    const variant = level.replace('display-', '') as keyof typeof typography.display;
    return typography.display[variant];
  } else {
    const variant = level.replace('heading-', '') as keyof typeof typography.heading;
    return typography.heading[variant];
  }
};

// Convert CSS-in-JS to CSS custom properties
const createStyleFromTypography = (typo: any) => ({
  fontSize: typo.fontSize,
  fontFamily: typo.fontFamily.join(', '),
  fontWeight: typo.fontWeight,
  lineHeight: typo.lineHeight,
  letterSpacing: typo.letterSpacing,
});

// Color theme mapping
const getTextColor = (color: HeadingProps['color'], theme: 'dark' | 'light') => {
  const colors = theme === 'dark' ? dark : light;
  
  switch (color) {
    case 'primary':
      return colors.text.primary;
    case 'secondary':
      return colors.text.secondary;
    case 'tertiary':
      return colors.text.tertiary;
    case 'accent':
      return colors.text.accent;
    default:
      return colors.text.primary;
  }
};

export const Heading = forwardRef<HTMLElement, HeadingProps>(
  ({ children, level, as, theme = 'dark', color = 'primary', className = '', ...props }, ref) => {
    const Component = (as || defaultElements[level]) as ElementType;
    const typographyStyle = getTypographyStyles(level);
    const textColor = getTextColor(color, theme);
    const style = createStyleFromTypography(typographyStyle);

    const combinedStyle = {
      ...style,
      color: textColor,
    };

    // Create motion component for the selected element
    const MotionComponent = motion(Component);

    return (
      <MotionComponent
        ref={ref}
        className={className}
        style={combinedStyle}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

Heading.displayName = 'Heading';

// Convenience components for common heading patterns
export const DisplayHeading = forwardRef<HTMLElement, Omit<HeadingProps, 'level'> & { 
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' 
}>(
  ({ size = 'base', ...props }, ref) => {
    const level = `display-${size}` as HeadingLevel;
    return <Heading ref={ref} level={level} {...props} />;
  }
);

DisplayHeading.displayName = 'DisplayHeading';

export const SectionHeading = forwardRef<HTMLElement, Omit<HeadingProps, 'level'> & { 
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' 
}>(
  ({ size = 'lg', ...props }, ref) => {
    const level = `heading-${size}` as HeadingLevel;
    return <Heading ref={ref} level={level} {...props} />;
  }
);

SectionHeading.displayName = 'SectionHeading';