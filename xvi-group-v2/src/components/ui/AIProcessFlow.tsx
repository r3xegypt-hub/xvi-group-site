import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Search, Cpu, GitBranch, TrendingUp } from 'lucide-react';

const ease: Easing = [0.16, 1, 0.3, 1];

const steps = [
  {
    icon: Search,
    title: 'Discover',
    titleAr: 'اكتشاف',
    desc: 'Deep-dive intelligence assessment of your enterprise AI maturity, data infrastructure, and strategic objectives.',
    descAr: 'تقييم عميق لذكاء مؤسستك وبنيتها التحتية وأهدافها الاستراتيجية.',
    color: '#C8A65A',
  },
  {
    icon: Cpu,
    title: 'Analyze',
    titleAr: 'تحليل',
    desc: 'Advanced analytics and AI-powered modeling to identify opportunities, risks, and optimal transformation pathways.',
    descAr: 'تحليلات متقدمة ونمذجة بالذكاء الاصطناعي لتحديد الفرص والمخاطر.',
    color: '#2F3338',
  },
  {
    icon: GitBranch,
    title: 'Build',
    titleAr: 'بناء',
    desc: 'Enterprise-grade AI systems engineered with sovereign architecture, security-first design, and production scalability.',
    descAr: 'أنظمة ذكاء اصطناعي مؤسسية بهندسة سيادية وأمن أولي.',
    color: '#C8A65A',
  },
  {
    icon: TrendingUp,
    title: 'Transform',
    titleAr: 'تحول',
    desc: 'Measurable business outcomes through operational integration, team capability transfer, and continuous intelligence.',
    descAr: 'نتائج أعمال قابلة للقياس من خلال التكامل التشغيلي ونقل القدرات.',
    color: '#2F3338',
  },
];

export function AIProcessFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} style={{ position: 'relative', padding: '80px 0', maxWidth: 1000, margin: '0 auto' }}>
      {/* Connection lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="150" y1="100" x2="380" y2="100"
          stroke="#C8A65A" strokeWidth="0.5"
          strokeDasharray="4 4"
          strokeOpacity={0.2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        />
        <motion.line
          x1="480" y1="100" x2="620" y2="100"
          stroke="#C8A65A" strokeWidth="0.5"
          strokeDasharray="4 4"
          strokeOpacity={0.2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
        />
        <motion.line
          x1="720" y1="100" x2="850" y2="100"
          stroke="#C8A65A" strokeWidth="0.5"
          strokeDasharray="4 4"
          strokeOpacity={0.2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
        />
        {/* Data particles flowing on lines */}
        {[
          { from: '150,100', to: '380,100', delay: 0.3 },
          { from: '480,100', to: '620,100', delay: 0.6 },
          { from: '720,100', to: '850,100', delay: 0.9 },
        ].map((line, i) => (
          <motion.circle
            key={i}
            r={2}
            fill="#C8A65A"
            opacity={0.4}
            initial={{ cx: 150 + i * 330, cy: 100 }}
            animate={isInView ? {
              cx: [150 + i * 330, 380 + i * 240],
              cy: [100, 100],
              opacity: [0, 0.6, 0],
            } : {}}
            transition={{
              duration: 2,
              delay: line.delay + 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative', zIndex: 1 }}>
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              textAlign: 'center',
              alignItems: 'center',
              padding: 32,
              background: '#FFFFFF',
              border: '1px solid rgba(17,17,17,0.04)',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(200,166,90,0.15)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(17,17,17,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(17,17,17,0.04)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <motion.div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `${step.color}08`,
                border: `1px solid ${step.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: step.color,
              }}
              animate={isInView ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, delay: i * 0.15 + 0.5, repeat: Infinity }}
            >
              <step.icon size={22} />
            </motion.div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, fontFamily: "'Manrope', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', color: step.color }}>{step.title}</div>
            <div style={{ fontSize: '0.8125rem', lineHeight: 1.7, fontFamily: "'Manrope', sans-serif", color: '#666666' }}>{step.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
