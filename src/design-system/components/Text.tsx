/**
 * Text Component
 * 
 * Typography component for body text using Inter font
 * Supports various text sizes and semantic colors
 */

import { ReactNode, forwardRef, ElementType } from 'react';
import { motion } from 'framer-motion';
import { typography } from '../tokens/typography';
import { dark, light } from '../tokens/colors';

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type TextElement = 'p' | 'span' | 'div' | 'strong' | 'em' | 'small';

interface TextProps {
  children: ReactNode;
  size?: TextSize;
  as?: TextElement;
  theme?: 'dark' | 'light';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

// Default HTML elements for text sizes
const defaultElements: Record<TextSize, TextElement> = {
  xs: 'small',
  sm: 'span',
  base: 'p',
  lg: 'p',
  xl: 'p',
};

// Font weight mapping
const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Get typography styles for text size
const getTypographyStyles = (size: TextSize) => {
  return typography.body[size];
};

// Convert CSS-in-JS to CSS custom properties
const createStyleFromTypography = (typo: any, weight?: string) => ({
  fontSize: typo.fontSize,
  fontFamily: typo.fontFamily.join(', '),
  fontWeight: weight || typo.fontWeight,
  lineHeight: typo.lineHeight,
  letterSpacing: typo.letterSpacing,
});

// Color theme mapping
const getTextColor = (color: TextProps['color'], theme: 'dark' | 'light') => {
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

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    children, 
    size = 'base', 
    as, 
    theme = 'dark', 
    color = 'primary', 
    weight,
    className = '', 
    ...props 
  }, ref) => {
    const Component = (as || defaultElements[size]) as ElementType;
    const typographyStyle = getTypographyStyles(size);
    const textColor = getTextColor(color, theme);
    const fontWeight = weight ? fontWeights[weight] : undefined;
    const style = createStyleFromTypography(typographyStyle, fontWeight);

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

Text.displayName = 'Text';

// Convenience components for common text patterns
export const BodyText = forwardRef<HTMLElement, Omit<TextProps, 'size'> & { 
  size?: 'sm' | 'base' | 'lg' 
}>(
  ({ size = 'base', ...props }, ref) => {
    return <Text ref={ref} size={size} {...props} />;
  }
);

BodyText.displayName = 'BodyText';

export const Caption = forwardRef<HTMLElement, Omit<TextProps, 'size' | 'color'>>(
  ({ color = 'secondary', ...props }, ref) => {
    return <Text ref={ref} size="xs" color={color} {...props} />;
  }
);

Caption.displayName = 'Caption';

export const Lead = forwardRef<HTMLElement, Omit<TextProps, 'size'>>(
  (props, ref) => {
    return <Text ref={ref} size="lg" {...props} />;
  }
);

Lead.displayName = 'Lead';