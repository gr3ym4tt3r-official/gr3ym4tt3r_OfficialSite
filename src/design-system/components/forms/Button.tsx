'use client';

import { forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useMotionVariants } from '../../utilities/AnimationProvider';
import { HoverAnimation } from '../animations';

interface FormButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'base' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loadingText?: string;
  className?: string;
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm h-8',
  base: 'px-4 py-2 text-base h-10',
  lg: 'px-6 py-3 text-lg h-12',
} as const;

const variantStyles = {
  primary: 'bg-accent text-white border-accent hover:bg-signal-red-600',
  secondary: 'bg-transparent text-primary border-primary hover:bg-secondary',
  ghost: 'bg-transparent text-primary border-transparent hover:bg-secondary hover:text-accent',
  danger: 'bg-red-500 text-white border-red-500 hover:bg-red-600',
} as const;

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'base',
    loading = false,
    disabled = false,
    fullWidth = false,
    startIcon,
    endIcon,
    loadingText = 'Loading...',
    className = '',
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;
    const sizeClass = sizeStyles[size];
    const variantClass = variantStyles[variant];

    const buttonClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'border',
      'rounded',
      'transition-colors',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-accent/20',
      'focus:ring-offset-0',
      sizeClass,
      variantClass,
      fullWidth ? 'w-full' : '',
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className,
    ].filter(Boolean).join(' ');

    // Loading spinner animation
    const spinnerVariants = useMotionVariants({
      spinning: {
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        },
      },
    });

    return (
      <HoverAnimation type="button" className="inline-block">
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={isDisabled}
          whileTap={!isDisabled ? { scale: 0.98 } : undefined}
          {...props}
        >
          {/* Loading Spinner */}
          {loading && (
            <motion.div
              variants={spinnerVariants}
              animate="spinning"
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
          )}

          {/* Start Icon */}
          {!loading && startIcon && (
            <span className="flex-shrink-0">{startIcon}</span>
          )}

          {/* Button Text */}
          <span className="truncate">
            {loading ? loadingText : children}
          </span>

          {/* End Icon */}
          {!loading && endIcon && (
            <span className="flex-shrink-0">{endIcon}</span>
          )}
        </motion.button>
      </HoverAnimation>
    );
  }
);

FormButton.displayName = 'FormButton';