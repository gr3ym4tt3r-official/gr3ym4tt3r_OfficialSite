'use client';

import { forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useMotionVariants } from '../../utilities/AnimationProvider';

interface AlertProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'base' | 'lg';
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  title?: string;
  className?: string;
}

const variantStyles = {
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    icon: '📘',
  },
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-600 dark:text-green-400',
    icon: '✅',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    icon: '⚠️',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-600 dark:text-red-400',
    icon: '❌',
  },
} as const;

const sizeStyles = {
  sm: 'p-3 text-sm',
  base: 'p-4 text-base',
  lg: 'p-6 text-lg',
} as const;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({
    children,
    variant = 'info',
    size = 'base',
    dismissible = false,
    onDismiss,
    icon,
    title,
    className = '',
    ...props
  }, ref) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    // Animation variants
    const alertVariants = useMotionVariants({
      initial: {
        opacity: 0,
        scale: 0.95,
        y: -10,
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        x: 300,
        transition: {
          duration: 0.2,
          ease: 'easeIn',
        },
      },
    });

    const alertClasses = [
      'flex',
      'items-start',
      'gap-3',
      'border',
      'rounded-lg',
      'shadow-sm',
      sizeStyle,
      variantStyle.bg,
      variantStyle.border,
      variantStyle.text,
      className,
    ].filter(Boolean).join(' ');

    const displayIcon = icon || variantStyle.icon;

    return (
      <motion.div
        ref={ref}
        className={alertClasses}
        variants={alertVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        role="alert"
        aria-live="polite"
        {...props}
      >
        {/* Icon */}
        {displayIcon && (
          <div className="flex-shrink-0 text-lg">
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          {title && (
            <h4 className="font-semibold mb-1">
              {title}
            </h4>
          )}
          
          {/* Message */}
          <div className={title ? 'text-sm opacity-90' : ''}>
            {children}
          </div>
        </div>

        {/* Dismiss Button */}
        {dismissible && onDismiss && (
          <motion.button
            className="
              flex-shrink-0 p-1 rounded
              hover:bg-black/10 dark:hover:bg-white/10
              focus:outline-none focus:ring-2 focus:ring-current
              transition-colors
            "
            onClick={onDismiss}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Dismiss alert"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        )}
      </motion.div>
    );
  }
);

Alert.displayName = 'Alert';