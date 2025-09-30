// Core animation primitives
export { AnimatedBox } from './AnimatedBox';
export { FadeIn } from './FadeIn';
export { SlideIn } from './SlideIn';
export { ScaleIn } from './ScaleIn';
export { StaggerContainer } from './StaggerContainer';

// Signature brand animations
export {
  KineticText,
  WipeIn,
  SignalGlow,
  HoverAnimation,
} from './SignatureAnimations';

// Animation utilities and providers
export {
  AnimationProvider,
  useAnimation,
  useReducedMotion,
  useMotionVariants,
} from '../../utilities/AnimationProvider';

// Re-export commonly used motion tokens
export {
  animations,
  durations,
  easings,
  stagger,
  hoverAnimations,
} from '../../tokens/motion';