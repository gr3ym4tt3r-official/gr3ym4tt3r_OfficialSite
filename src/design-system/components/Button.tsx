'use client';

/**
 * Button Component
 * 
 * Button system including minimalistic social media buttons
 * Features hover motion with scale + red glow as specified
 */

import { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { typography } from '../tokens/typography';
import { dark, light } from '../tokens/colors';
import { hoverAnimations, focusAnimations } from '../tokens/motion';
import { borderRadius } from '../tokens/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'social' | 'link';
type ButtonSize = 'sm' | 'base' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: 'dark' | 'light';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

// Size configurations
const sizeConfig = {
  sm: {
    padding: '0.5rem 0.75rem',   // 8px 12px
    fontSize: '0.875rem',        // 14px
    minHeight: '2rem',           // 32px
  },
  base: {
    padding: '0.75rem 1rem',     // 12px 16px
    fontSize: '0.875rem',        // 14px
    minHeight: '2.5rem',         // 40px
  },
  lg: {
    padding: '1rem 1.5rem',      // 16px 24px
    fontSize: '1rem',            // 16px
    minHeight: '3rem',           // 48px
  },
} as const;

// Variant styles
const getVariantStyles = (variant: ButtonVariant, theme: 'dark' | 'light') => {
  const colors = theme === 'dark' ? dark : light;
  
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: colors.text.accent,        // Signal red
        color: theme === 'dark' ? colors.bg.primary : colors.bg.inverse,
        border: `1px solid ${colors.text.accent}`,
        hover: {
          backgroundColor: theme === 'dark' ? '#dc2626' : '#b91c1c', // Darker red
          boxShadow: `0 0 20px 2px ${colors.text.accent}40`, // Red glow
        },
      };
    
    case 'secondary':
      return {
        backgroundColor: 'transparent',
        color: colors.text.primary,
        border: `1px solid ${colors.border.primary}`,
        hover: {
          backgroundColor: colors.interactive.hover,
          borderColor: colors.border.accent,
        },
      };
    
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: colors.text.primary,
        border: '1px solid transparent',
        hover: {
          backgroundColor: colors.interactive.hover,
          color: colors.text.accent,
        },
      };
    
    case 'social':
      return {
        backgroundColor: 'transparent',
        color: colors.text.secondary,
        border: `1px solid ${colors.border.primary}`,
        hover: {
          backgroundColor: 'transparent',
          borderColor: colors.text.accent,
          color: colors.text.accent,
          boxShadow: `0 0 15px 2px ${colors.text.accent}40`, // Red glow
        },
      };
    
    case 'link':
      return {
        backgroundColor: 'transparent',
        color: colors.text.accent,
        border: 'none',
        hover: {
          color: theme === 'dark' ? '#dc2626' : '#b91c1c',
          textDecoration: 'underline',
        },
      };
    
    default:
      return getVariantStyles('primary', theme);
  }
};

// Create button style object
const createButtonStyle = (
  variant: ButtonVariant,
  size: ButtonSize,
  theme: 'dark' | 'light',
  fullWidth?: boolean
) => {
  const variantStyles = getVariantStyles(variant, theme);
  const sizeStyles = sizeConfig[size];
  const buttonTypography = typography.ui.button;
  
  return {
    // Base styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    position: 'relative' as const,
    cursor: 'pointer',
    userSelect: 'none' as const,
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    outline: 'none',
    
    // Typography
    fontSize: buttonTypography.fontSize,
    fontFamily: buttonTypography.fontFamily.join(', '),
    fontWeight: buttonTypography.fontWeight,
    lineHeight: buttonTypography.lineHeight,
    letterSpacing: buttonTypography.letterSpacing,
    textTransform: buttonTypography.textTransform,
    
    // Size
    padding: sizeStyles.padding,
    minHeight: sizeStyles.minHeight,
    width: fullWidth ? '100%' : 'auto',
    
    // Variant styles
    backgroundColor: variantStyles.backgroundColor,
    color: variantStyles.color,
    border: variantStyles.border,
    borderRadius: borderRadius.base,
    
    // Disabled state
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    
    // Focus state (accessibility)
    '&:focus-visible': {
      outline: `2px solid ${theme === 'dark' ? dark.interactive.focus : light.interactive.focus}`,
      outlineOffset: '2px',
    },
  };
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'base',
    theme = 'dark',
    fullWidth = false,
    icon,
    iconPosition = 'left',
    className = '',
    disabled,
    ...props
  }, ref) => {
    const variantStyles = getVariantStyles(variant, theme);
    const style = createButtonStyle(variant, size, theme, fullWidth);
    
    // Hover animation based on variant
    const getHoverAnimation = () => {
      if (variant === 'social') {
        return hoverAnimations.socialIcon;
      } else if (variant === 'primary') {
        return {
          ...hoverAnimations.button,
          backgroundColor: variantStyles.hover.backgroundColor,
          boxShadow: variantStyles.hover.boxShadow,
        };
      } else {
        return hoverAnimations.button;
      }
    };

    return (
      <motion.button
        ref={ref}
        className={className}
        style={style}
        disabled={disabled}
        whileHover={disabled ? {} : getHoverAnimation()}
        whileTap={disabled ? {} : { scale: 0.98 }}
        whileFocus={focusAnimations.ring}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="button-icon">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="button-icon">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// Social Media Button Component
interface SocialButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'github' | 'email';
  href?: string;
  label?: string;
}

// Social platform configurations
const socialPlatforms = {
  instagram: {
    label: 'Instagram',
    icon: '📷', // Would be replaced with actual icon
  },
  twitter: {
    label: 'Twitter',
    icon: '🐦', // Would be replaced with actual icon
  },
  linkedin: {
    label: 'LinkedIn', 
    icon: '💼', // Would be replaced with actual icon
  },
  github: {
    label: 'GitHub',
    icon: '🐙', // Would be replaced with actual icon
  },
  email: {
    label: 'Email',
    icon: '✉️', // Would be replaced with actual icon
  },
} as const;

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ platform, href, label, ...props }, ref) => {
    const config = socialPlatforms[platform];
    const displayLabel = label || config.label;
    
    const ButtonComponent = (
      <Button
        ref={ref}
        variant="social"
        icon={config.icon}
        aria-label={displayLabel}
        {...props}
      >
        {displayLabel}
      </Button>
    );

    // If href is provided, render as a link
    if (href) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          {ButtonComponent}
        </motion.a>
      );
    }

    return ButtonComponent;
  }
);

SocialButton.displayName = 'SocialButton';

// Icon-only button for minimal social icons
export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'children'> & {
  icon: ReactNode;
  'aria-label': string;
}>(
  ({ icon, size = 'base', ...props }, ref) => {
    const iconSizes = {
      sm: '1.5rem',  // 24px
      base: '2rem',  // 32px
      lg: '2.5rem',  // 40px
    };
    
    const iconStyle = {
      width: iconSizes[size],
      height: iconSizes[size],
      minWidth: iconSizes[size],
      padding: '0.5rem',
      borderRadius: borderRadius.base,
    };

    return (
      <Button
        ref={ref}
        size={size}
        style={iconStyle}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';