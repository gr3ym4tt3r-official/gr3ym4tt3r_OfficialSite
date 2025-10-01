'use client';

import { useState, useRef, useEffect, ReactNode, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionVariants } from '../../utilities/AnimationProvider';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'cards';
  size?: 'sm' | 'base' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  base: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
} as const;

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({
    tabs,
    defaultTab,
    activeTab,
    onTabChange,
    variant = 'underline',
    size = 'base',
    orientation = 'horizontal',
    className = '',
  }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = useState(
      activeTab || defaultTab || tabs[0]?.id
    );
    const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0, top: 0, height: 0 });
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const currentActiveTab = activeTab || internalActiveTab;
    const activeTabData = tabs.find(tab => tab.id === currentActiveTab);

    // Update indicator position when active tab changes
    useEffect(() => {
      const activeElement = tabRefs.current[currentActiveTab];
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const container = activeElement.parentElement?.getBoundingClientRect();
        
        if (container) {
          if (orientation === 'horizontal') {
            setIndicatorProps({
              left: activeElement.offsetLeft,
              width: activeElement.offsetWidth,
              top: 0,
              height: 0,
            });
          } else {
            setIndicatorProps({
              left: 0,
              width: 0,
              top: activeElement.offsetTop,
              height: activeElement.offsetHeight,
            });
          }
        }
      }
    }, [currentActiveTab, orientation, tabs]);

    const handleTabClick = (tabId: string) => {
      if (tabs.find(tab => tab.id === tabId)?.disabled) return;
      
      setInternalActiveTab(tabId);
      onTabChange?.(tabId);
    };

    // Animation variants
    const contentVariants = useMotionVariants({
      initial: {
        opacity: 0,
        x: orientation === 'horizontal' ? 20 : 0,
        y: orientation === 'vertical' ? 20 : 0,
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        x: orientation === 'horizontal' ? -20 : 0,
        y: orientation === 'vertical' ? -20 : 0,
        transition: {
          duration: 0.15,
          ease: 'easeIn',
        },
      },
    });

    const getTabClasses = (tab: Tab, isActive: boolean) => {
      const baseClasses = [
        'relative',
        'font-medium',
        'transition-all',
        'duration-200',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-accent/20',
        'focus:ring-offset-2',
        sizeStyles[size],
      ];

      switch (variant) {
        case 'underline':
          baseClasses.push(
            'border-b-2',
            'border-transparent',
            isActive ? 'text-accent border-accent' : 'text-secondary hover:text-primary',
            tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          );
          break;
        case 'pills':
          baseClasses.push(
            'rounded-full',
            isActive ? 'bg-accent text-white' : 'text-secondary hover:bg-tertiary hover:text-primary',
            tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          );
          break;
        case 'cards':
          baseClasses.push(
            'rounded-t-lg',
            'border',
            'border-b-0',
            isActive 
              ? 'bg-secondary text-primary border-primary' 
              : 'bg-tertiary text-secondary border-transparent hover:bg-secondary hover:text-primary',
            tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          );
          break;
      }

      return baseClasses.filter(Boolean).join(' ');
    };

    const getContainerClasses = () => {
      const baseClasses = ['tabs-container'];
      
      if (orientation === 'vertical') {
        baseClasses.push('flex', 'gap-6');
      }
      
      return [baseClasses.join(' '), className].filter(Boolean).join(' ');
    };

    const getTabListClasses = () => {
      const baseClasses = ['flex', 'relative'];
      
      if (orientation === 'horizontal') {
        baseClasses.push('border-b', 'border-primary');
        if (variant === 'pills') {
          baseClasses.pop(); // Remove border for pills variant
          baseClasses.push('gap-2', 'p-1', 'bg-tertiary', 'rounded-full');
        } else if (variant === 'cards') {
          baseClasses.pop(); // Remove border for cards variant
        }
      } else {
        baseClasses.push('flex-col', 'border-r', 'border-primary', 'min-w-[200px]');
        if (variant === 'pills') {
          baseClasses.splice(-3); // Remove flex-col, border-r, border-primary
          baseClasses.push('flex-col', 'gap-2', 'p-1', 'bg-tertiary', 'rounded-lg');
        }
      }
      
      return baseClasses.join(' ');
    };

    return (
      <div ref={ref} className={getContainerClasses()}>
        {/* Tab List */}
        <div
          className={getTabListClasses()}
          role="tablist"
          aria-orientation={orientation}
        >
          {/* Active Tab Indicator */}
          {variant === 'underline' && (
            <motion.div
              className="absolute bottom-0 bg-accent"
              style={{
                height: '2px',
              }}
              animate={{
                left: indicatorProps.left,
                width: indicatorProps.width,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
          )}

          {/* Tab Buttons */}
          {tabs.map((tab) => {
            const isActive = tab.id === currentActiveTab;
            
            return (
              <motion.button
                key={tab.id}
                ref={el => { tabRefs.current[tab.id] = el; }}
                className={getTabClasses(tab, isActive)}
                onClick={() => handleTabClick(tab.id)}
                disabled={tab.disabled}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                whileHover={!tab.disabled ? { scale: 1.02 } : undefined}
                whileTap={!tab.disabled ? { scale: 0.98 } : undefined}
              >
                <span className="flex items-center gap-2">
                  {tab.icon && (
                    <span className="flex-shrink-0">{tab.icon}</span>
                  )}
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className={orientation === 'vertical' ? 'flex-1' : 'mt-6'}>
          <AnimatePresence mode="wait">
            {activeTabData && (
              <motion.div
                key={currentActiveTab}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                role="tabpanel"
                id={`tabpanel-${currentActiveTab}`}
                aria-labelledby={`tab-${currentActiveTab}`}
              >
                {activeTabData.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';