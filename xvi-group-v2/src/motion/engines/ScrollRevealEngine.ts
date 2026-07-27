// XVI GROUP — Scroll Reveal Engine
// IntersectionObserver-based scroll reveal system

import { EASING, DURATIONS } from '../../constants';

// ============================================
// TYPES
// ============================================

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'blur';

export interface RevealConfig {
  direction: RevealDirection;
  duration: number;
  delay: number;
  threshold: number;
  stagger: number;
  once: boolean;
}

export interface RevealElement {
  element: HTMLElement;
  config: Partial<RevealConfig>;
  isVisible: boolean;
}

// ============================================
// DEFAULTS
// ============================================

const DEFAULT_CONFIG: RevealConfig = {
  direction: 'up',
  duration: DURATIONS.slower,
  delay: 0,
  threshold: 0.15,
  stagger: 100,
  once: true,
};

// ============================================
// SCROLL REVEAL ENGINE
// ============================================

class ScrollRevealEngine {
  private observer: IntersectionObserver | null = null;
  private elements: Map<HTMLElement, RevealConfig> = new Map();
  private initialized = false;

  init() {
    if (this.initialized) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.revealElement(entry.target as HTMLElement);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    this.initialized = true;
  }

  observe(element: HTMLElement, config: Partial<RevealConfig> = {}) {
    if (!this.initialized) this.init();
    if (!this.observer) return;

    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    this.elements.set(element, mergedConfig);

    // Set initial styles
    this.setInitialState(element, mergedConfig.direction);

    // Set transition
    element.style.transition = `opacity ${mergedConfig.duration}ms ${EASING['ease-out-expo']}, transform ${mergedConfig.duration}ms ${EASING['ease-out-expo']}, filter ${mergedConfig.duration}ms ${EASING['ease-out-expo']}`;
    element.style.transitionDelay = `${mergedConfig.delay}ms`;

    this.observer.observe(element);
  }

  private revealElement(element: HTMLElement) {
    const config = this.elements.get(element);
    if (!config) return;

    // Animate to visible state
    element.style.opacity = '1';
    element.style.transform = 'none';
    element.style.filter = 'none';
    element.classList.add('is-visible');

    // Handle stagger for children
    if (element.hasAttribute('data-reveal-stagger')) {
      this.revealChildren(element, config.stagger);
    }

    // Unobserve if once
    if (config.once && this.observer) {
      this.observer.unobserve(element);
    }
  }

  private revealChildren(parent: HTMLElement, stagger: number) {
    const children = Array.from(parent.children) as HTMLElement[];
    children.forEach((child, index) => {
      child.style.transition = `opacity ${DEFAULT_CONFIG.duration}ms ${EASING['ease-out-expo']}, transform ${DEFAULT_CONFIG.duration}ms ${EASING['ease-out-expo']}, filter ${DEFAULT_CONFIG.duration}ms ${EASING['ease-out-expo']}`;
      child.style.transitionDelay = `${index * stagger}ms`;
      child.style.opacity = '1';
      child.style.transform = 'none';
      child.style.filter = 'none';
    });
  }

  private setInitialState(element: HTMLElement, direction: RevealDirection) {
    element.style.opacity = '0';

    switch (direction) {
      case 'up':
        element.style.transform = 'translateY(40px)';
        break;
      case 'down':
        element.style.transform = 'translateY(-40px)';
        break;
      case 'left':
        element.style.transform = 'translateX(-40px)';
        break;
      case 'right':
        element.style.transform = 'translateX(40px)';
        break;
      case 'scale':
        element.style.transform = 'scale(0.95)';
        break;
      case 'fade':
        element.style.transform = 'none';
        break;
      case 'blur':
        element.style.transform = 'none';
        element.style.filter = 'blur(8px)';
        break;
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.elements.clear();
    this.initialized = false;
  }
}

// Singleton export
export const scrollRevealEngine = new ScrollRevealEngine();
