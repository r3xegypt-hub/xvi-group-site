import { memo, useCallback, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type ServiceCardProps = {
  number: string
  title: string
  description: string
  tags: string[]
  icon: ReactNode
  accent: string
  index: number
  variant?: 'featured' | 'standard'
}

export const PremiumServiceCard = memo(function PremiumServiceCard({
  number, title, description, tags, icon, accent, index, variant = 'standard',
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--card-x', `${x}%`)
    card.style.setProperty('--card-y', `${y}%`)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={clsx('xvi-service-card', variant === 'featured' && 'xvi-service-card--featured')}
      style={{ '--card-accent': accent } as React.CSSProperties}
    >
      <div className="xvi-service-card-border" aria-hidden="true" />
      <div className="xvi-service-card-glow" aria-hidden="true" />
      <div className="xvi-service-card-sweep" aria-hidden="true" />
      <div className="xvi-service-card-reflection" aria-hidden="true" />
      <div className="xvi-service-card-inner">
        <div className="xvi-service-card-header">
          <span className="xvi-service-card-num">{number}</span>
          <div className="xvi-service-card-icon">{icon}</div>
        </div>
        <h3 className="xvi-service-card-title">{title}</h3>
        <p className="xvi-service-card-desc">{description}</p>
        <div className="xvi-service-card-tags">
          {tags.map((tag) => (
            <span key={tag} className="xvi-service-card-tag">{tag}</span>
          ))}
        </div>
        <div className="xvi-service-card-accent-line" aria-hidden="true" />
      </div>
    </motion.div>
  )
})
