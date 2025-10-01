'use client';

import { forwardRef, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionVariants } from '../../utilities/AnimationProvider';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'base' | 'lg';
  className?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
}

const sizeStyles = {
  sm: 'h-8 px-3 text-sm',
  base: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
} as const;

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({
    options,
    value,
    placeholder = 'Select an option...',
    label,
    error,
    success,
    disabled = false,
    required = false,
    size = 'base',
    className = '',
    onChange,
    onBlur,
    id,
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<(HTMLDivElement | null)[]>([]);

    const hasError = !!error;
    const hasSuccess = !!success;
    const selectedOption = options.find(opt => opt.value === value);
    const sizeClass = sizeStyles[size];

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else if (focusedIndex >= 0) {
            const option = options[focusedIndex];
            if (!option.disabled) {
              onChange?.(option.value);
              setIsOpen(false);
              setFocusedIndex(-1);
            }
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          onBlur?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            const nextIndex = Math.min(focusedIndex + 1, options.length - 1);
            setFocusedIndex(nextIndex);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            const prevIndex = Math.max(focusedIndex - 1, 0);
            setFocusedIndex(prevIndex);
          }
          break;
      }
    };

    // Animation variants
    const dropdownVariants = useMotionVariants({
      hidden: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: { duration: 0.15 }
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.15 }
      }
    });

    const selectClasses = [
      'w-full',
      'flex',
      'items-center',
      'justify-between',
      'border',
      'rounded',
      'cursor-pointer',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-0',
      sizeClass,
      // Colors and states
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        : hasSuccess
        ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
        : 'border-primary focus:border-accent focus:ring-accent/20',
      // Background
      disabled
        ? 'bg-tertiary text-tertiary cursor-not-allowed'
        : 'bg-secondary text-primary hover:bg-tertiary',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className="relative" ref={selectRef}>
        {/* Label */}
        {label && (
          <label
            className={`
              block text-sm font-medium mb-1
              ${hasError ? 'text-red-500' : hasSuccess ? 'text-green-500' : 'text-secondary'}
              ${disabled ? 'text-tertiary' : ''}
            `}
            htmlFor={id}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Select Button */}
        <motion.div
          ref={ref}
          id={id}
          className={selectClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${id}-error` : 
            hasSuccess ? `${id}-success` : 
            undefined
          }
          whileTap={!disabled ? { scale: 0.98 } : undefined}
        >
          <span className={selectedOption ? 'text-primary' : 'text-tertiary'}>
            {selectedOption?.label || placeholder}
          </span>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 ml-2"
          >
            <svg
              className="w-4 h-4 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Dropdown Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="
                absolute top-full left-0 right-0 z-50 mt-1
                bg-secondary border border-primary rounded shadow-lg
                max-h-60 overflow-y-auto
              "
              role="listbox"
            >
              {options.map((option, index) => (
                <motion.div
                  key={option.value}
                  ref={el => { optionsRef.current[index] = el; }}
                  className={`
                    px-4 py-2 cursor-pointer transition-colors
                    ${option.disabled ? 'text-tertiary cursor-not-allowed' : 'text-primary hover:bg-tertiary'}
                    ${focusedIndex === index ? 'bg-tertiary' : ''}
                    ${value === option.value ? 'bg-accent text-white' : ''}
                  `}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange?.(option.value);
                      setIsOpen(false);
                      setFocusedIndex(-1);
                    }
                  }}
                  onMouseEnter={() => !option.disabled && setFocusedIndex(index)}
                  role="option"
                  aria-selected={value === option.value}
                  whileHover={!option.disabled ? { backgroundColor: 'var(--color-bg-tertiary)' } : undefined}
                >
                  {option.label}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-sm text-red-500 flex items-center gap-1"
            id={`${id}-error`}
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
            id={`${id}-success`}
          >
            <span>✓</span>
            {success}
          </motion.div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';