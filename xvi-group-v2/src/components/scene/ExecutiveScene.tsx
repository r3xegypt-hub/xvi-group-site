import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useMotion } from '../../motion/providers/MotionProvider';
import styles from './ExecutiveScene.module.scss';

interface ExecutiveSceneProps {
  className?: string;
  density?: number;
  connectDistance?: number;
  maxParticles?: number;
  interactive?: boolean;
  mouseLight?: boolean;
  style?: CSSProperties;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  r: number;
}

const GOLD = '200, 166, 90';

export function ExecutiveScene({
  className,
  density = 56,
  connectDistance = 132,
  maxParticles = 200,
  interactive = true,
  mouseLight = true,
  style,
}: ExecutiveSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { prefersReducedMotion } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion;
    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: Particle[] = [];
    let sprite: HTMLCanvasElement | null = null;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const makeSprite = () => {
      const s = 64;
      const c = document.createElement('canvas');
      c.width = s;
      c.height = s;
      const g = c.getContext('2d');
      if (!g) return null;
      const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      grad.addColorStop(0, `rgba(${GOLD}, 0.9)`);
      grad.addColorStop(0.35, `rgba(${GOLD}, 0.35)`);
      grad.addColorStop(1, `rgba(${GOLD}, 0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, s, s);
      return c;
    };

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const camX = Math.sin(time * 0.00022) * 10;
      const camY = Math.cos(time * 0.00018) * 7;

      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      const d2 = connectDistance * connectDistance;

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + camX * a.z;
        const ay = a.y + camY * a.z;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = ax - (b.x + camX * b.z);
          const dy = ay - (b.y + camY * b.z);
          const dist2 = dx * dx + dy * dy;
          if (dist2 < d2) {
            const t = 1 - dist2 / d2;
            ctx.strokeStyle = `rgba(${GOLD}, ${(t * 0.16).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(b.x + camX * b.z, b.y + camY * b.z);
            ctx.stroke();
          }
        }
      }

      if (interactive && mouseLight) {
        const ml = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
        ml.addColorStop(0, 'rgba(200, 166, 90, 0.1)');
        ml.addColorStop(1, 'rgba(200, 166, 90, 0)');
        ctx.fillStyle = ml;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -12) p.x = width + 12;
        else if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12;
        else if (p.y > height + 12) p.y = -12;

        if (interactive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const md2 = dx * dx + dy * dy;
          if (md2 < 160 * 160 && md2 > 0.01) {
            const d = Math.sqrt(md2);
            const force = (1 - d / 160) * 0.45 * p.z;
            p.x += (dx / d) * force;
            p.y += (dy / d) * force;
          }
        }

        const px = p.x + camX * p.z;
        const py = p.y + camY * p.z;
        const size = p.r * 4.5;
        if (sprite) {
          ctx.globalAlpha = 0.4 + p.z * 0.55;
          ctx.drawImage(sprite, px - size / 2, py - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      drawFrame(performance.now());
      raf = requestAnimationFrame(loop);
    };

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      let count = Math.round((width * height / 100000) * density);
      count = Math.max(28, Math.min(maxParticles, count));
      if (isMobile) count = Math.round(count * 0.55);
      if (reduced) count = Math.min(count, 60);

      particles = Array.from({ length: count }, () => {
        const z = 0.35 + Math.random() * 0.65;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: 0.7 + z * 1.4,
        };
      });

      if (reduced) {
        drawFrame(0);
        return;
      }
      if (!raf) loop();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduced && !raf && width > 0) {
        loop();
      }
    };

    sprite = makeSprite();
    seed();

    const ro = new ResizeObserver(() => seed());
    ro.observe(canvas);

    document.addEventListener('visibilitychange', onVisibility);

    if (interactive && !reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [prefersReducedMotion, density, connectDistance, maxParticles, interactive, mouseLight]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.scene}${className ? ` ${className}` : ''}`}
      style={style}
      aria-hidden="true"
    />
  );
}
