// XVI GROUP — Parallax Engine
// Lightweight parallax using requestAnimationFrame

import { EASING } from '../../constants';

// ============================================
// TYPES
// ============================================

export interface ParallaxConfig {
  speed: number;
  direction: 'vertical' | 'horizontal';
  offset: number;
}

export interface ParallaxElement {
  element: HTMLElement;
  config: ParallaxConfig;
 初始Y: number;
}

// ============================================
// DEFAULTS
// ============================================

const DEFAULT_CONFIG: ParallaxConfig = {
  speed: 0.3,
  direction: 'vertical',
  offset: 0,
};

// ============================================
// PARALLAX ENGINE
// ============================================

class ParallaxEngine {
  private elements: Map<HTMLElement, ParallaxConfig> = new Map();
  private animationFrame: number | null = null;
  private scrollY = 0;
  private initialized = false;

  init() {
    if (this.initialized) return;

    this.scrollY = window.scrollY;
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.initialized = true;
    this.start();
  }

  observe(element: HTMLElement, config: Partial<ParallaxConfig> = {}) {
    if (!this.initialized) this.init();
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    this.elements.set(element, mergedConfig);
  }

  private handleScroll = () => {
    this.scrollY = window.scrollY;
  };

  private start = () => {
    this.elements.forEach((config, element) => {
      const rect = element.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = centerY - viewportCenter;

      const translateY = distance * config.speed * -1;

      // Only apply if element is in viewport
      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
        if (config.direction === 'vertical') {
          element.style.transform = `translateY(${translateY}px)`;
        } else {
          element.style.transform = `translateX(${translateY}px)`;
        }
      }
    });

    this.animationFrame = requestAnimationFrame(this.start);
  };

  disconnect() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    window.removeEventListener('scroll', this.handleScroll);
    this.elements.clear();
    this.initialized = false;
  }
}

export const parallaxEngine = new ParallaxEngine();
