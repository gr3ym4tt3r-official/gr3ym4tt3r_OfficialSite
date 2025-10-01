'use client';

import { forwardRef, useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useMotionVariants } from '../../utilities/AnimationProvider';
import { animations } from '../../tokens/motion';
import { spacing } from '../../tokens/spacing';

interface InputProps extends Omit<HTMLMotionProps<'input'>, 'size'> {
  label?: string;
  placeholder?: string;
  size?: 'sm' | 'base' | 'lg';
  error?: string;
  success?: string;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}

const sizeStyles = {
  sm: {
    height: '2rem', // 32px
    padding: '0.375rem 0.75rem', // 6px 12px
    fontSize: '0.875rem', // 14px
    borderRadius: spacing[2],
  },
  base: {
    height: '2.5rem', // 40px  
    padding: '0.5rem 0.75rem', // 8px 12px
    fontSize: '1rem', // 16px
    borderRadius: spacing[2],
  },
  lg: {
    height: '3rem', // 48px
    padding: '0.75rem 1rem', // 12px 16px
    fontSize: '1.125rem', // 18px
    borderRadius: spacing[3],
  },
} as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    placeholder,
    size = 'base',
    error,
    success,
    disabled = false,
    required = false,
    type = 'text',
    startIcon,
    endIcon,
    className = '',
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    
    const sizeStyle = sizeStyles[size];
    const hasError = !!error;
    const hasSuccess = !!success;
    const hasIcon = startIcon || endIcon;
    
    // Animation variants for the input container
    const containerVariants = useMotionVariants({
      initial: { scale: 1 },
      focus: { 
        scale: 1.01,
        transition: { duration: 0.15 }
      },
      error: {
        x: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.4 }
      }
    });

    // Label animation variants
    const labelVariants = useMotionVariants({
      floating: {
        y: -20,
        scale: 0.85,
        color: hasError ? '#ef4444' : hasSuccess ? '#10b981' : 'var(--color-text-accent)',
        transition: { duration: 0.2 }
      },
      default: {
        y: 0,
        scale: 1,
        color: 'var(--color-text-secondary)',
        transition: { duration: 0.2 }
      }
    });

    const shouldFloat = isFocused || hasValue;

    // Handle input value changes
    useEffect(() => {
      const input = ref as React.RefObject<HTMLInputElement>;
      if (input.current) {
        setHasValue(!!input.current.value);
      }
    }, [ref]);

    const inputClasses = [
      'w-full',
      'border',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'font-sans',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-0',
      // Colors and states
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        : hasSuccess
        ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
        : 'border-primary focus:border-accent focus:ring-accent/20',
      // Background
      disabled
        ? 'bg-tertiary text-tertiary cursor-not-allowed'
        : 'bg-secondary text-primary',
      // Padding adjustments for icons
      startIcon && !endIcon ? 'pl-10' : '',
      !startIcon && endIcon ? 'pr-10' : '',
      startIcon && endIcon ? 'px-10' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className="relative">
        {/* Floating Label */}
        {label && (
          <motion.label
            variants={labelVariants}
            animate={shouldFloat ? 'floating' : 'default'}
            className={`
              absolute left-3 top-1/2 -translate-y-1/2 
              pointer-events-none origin-left z-10
              font-medium text-sm
              ${disabled ? 'text-tertiary' : ''}
            `}
            style={{
              transformOrigin: '0 50%',
            }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}

        {/* Input Container */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          animate={isFocused ? 'focus' : hasError ? 'error' : 'initial'}
        >
          {/* Start Icon */}
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none z-10">
              {startIcon}
            </div>
          )}

          {/* Input Element */}
          <motion.input
            ref={ref}
            type={type}
            placeholder={shouldFloat ? '' : placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            style={sizeStyle}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${props.id}-error` : 
              hasSuccess ? `${props.id}-success` : 
              undefined
            }
            {...props}
          />

          {/* End Icon */}
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
              {endIcon}
            </div>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-sm text-red-500 flex items-center gap-1"
            id={`${props.id}-error`}
            role="alert"
          >
            <span>⚠</span>
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-sm text-green-500 flex items-center gap-1"
            id={`${props.id}-success`}
          >
            <span>✓</span>
            {success}
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';