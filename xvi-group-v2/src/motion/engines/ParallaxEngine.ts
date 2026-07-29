// XVI GROUP — Parallax Engine (Sprint 03)
// Smooth parallax with lerp interpolation

export interface ParallaxConfig {
  speed: number;
  direction: 'vertical' | 'horizontal';
  offset: number;
}

const DEFAULT_CONFIG: ParallaxConfig = {
  speed: 0.3,
  direction: 'vertical',
  offset: 0,
};

interface ParallaxState {
  config: ParallaxConfig;
  current: number;
  target: number;
}

class ParallaxEngine {
  private elements: Map<HTMLElement, ParallaxState> = new Map();
  private animationFrame: number | null = null;
  private initialized = false;
  private reducedMotion = false;

  init() {
    if (this.initialized) return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reducedMotion) return;

    this.initialized = true;
    this.tick();
  }

  observe(element: HTMLElement, config: Partial<ParallaxConfig> = {}) {
    if (!this.initialized) this.init();
    if (this.reducedMotion) return;

    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    element.classList.add('parallax-element');
    this.elements.set(element, {
      config: mergedConfig,
      current: 0,
      target: 0,
    });
  }

  unobserve(element: HTMLElement) {
    element.classList.remove('parallax-element');
    this.elements.delete(element);
  }

  private tick = () => {
    this.elements.forEach((state, element) => {
      const rect = element.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = centerY - viewportCenter;

      state.target = distance * state.config.speed * -1 + state.config.offset;
      state.current += (state.target - state.current) * 0.08;

      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
        const value = state.current.toFixed(2);
        if (state.config.direction === 'vertical') {
          element.style.transform = `translate3d(0, ${value}px, 0)`;
        } else {
          element.style.transform = `translate3d(${value}px, 0, 0)`;
        }
      }
    });

    this.animationFrame = requestAnimationFrame(this.tick);
  };

  disconnect() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.elements.forEach((_, element) => {
      element.style.transform = '';
      element.classList.remove('parallax-element');
    });
    this.elements.clear();
    this.initialized = false;
  }
}

export const parallaxEngine = new ParallaxEngine();
