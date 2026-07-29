// XVI GROUP — Cursor Engine (Sprint 03)
// Premium cursor follow with magnetic hover targets

type CursorState = 'default' | 'link' | 'button' | 'card';

class CursorEngine {
  private cursorEl: HTMLElement | null = null;
  private ringEl: HTMLElement | null = null;
  private x = 0;
  private y = 0;
  private ringX = 0;
  private ringY = 0;
  private raf: number | null = null;
  private active = false;
  private state: CursorState = 'default';

  init(cursor: HTMLElement, ring: HTMLElement) {
    if (this.active) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.cursorEl = cursor;
    this.ringEl = ring;
    this.active = true;

    document.body.classList.add('has-premium-cursor');
    window.addEventListener('mousemove', this.onMove, { passive: true });
    window.addEventListener('mouseover', this.onHover);
    window.addEventListener('mouseout', this.onHoverOut);
    this.tick();
  }

  private onMove = (e: MouseEvent) => {
    this.x = e.clientX;
    this.y = e.clientY;
  };

  private onHover = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a, button, [role="button"], .motion-cursor-card');
    if (!target) return;

    if (target.matches('button, [role="button"]')) {
      this.setState('button');
    } else if (target.matches('a')) {
      this.setState('link');
    } else {
      this.setState('card');
    }
  };

  private onHoverOut = (e: MouseEvent) => {
    const related = e.relatedTarget as HTMLElement | null;
    if (related?.closest('a, button, [role="button"], .motion-cursor-card')) return;
    this.setState('default');
  };

  private setState(state: CursorState) {
    if (this.state === state) return;
    this.state = state;
    this.cursorEl?.setAttribute('data-state', state);
    this.ringEl?.setAttribute('data-state', state);
  }

  private tick = () => {
    this.ringX += (this.x - this.ringX) * 0.14;
    this.ringY += (this.y - this.ringY) * 0.14;

    if (this.cursorEl) {
      this.cursorEl.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    }
    if (this.ringEl) {
      this.ringEl.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
    }

    this.raf = requestAnimationFrame(this.tick);
  };

  destroy() {
    if (!this.active) return;
    this.active = false;
    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('mouseover', this.onHover);
    window.removeEventListener('mouseout', this.onHoverOut);
    if (this.raf) cancelAnimationFrame(this.raf);
    document.body.classList.remove('has-premium-cursor');
    this.cursorEl = null;
    this.ringEl = null;
  }
}

export const cursorEngine = new CursorEngine();
