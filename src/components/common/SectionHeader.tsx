import React from 'react'

export type SectionHeaderProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  titleId?: string
  descriptionId?: string
}

export function SectionHeader({ eyebrow, title, description, titleId, descriptionId }: SectionHeaderProps) {
  return (
    <div className="max-w-[680px]">
      {eyebrow ? (
        <div className="text-[9px] tracking-[0.2em] text-[color:var(--color-xvi-bronze)] font-semibold uppercase" style={{ fontFamily: 'var(--font-family-english)' }}>
          {eyebrow}
        </div>
      ) : null}
      <h2
        id={titleId}
        className="mt-3 text-[clamp(26px,3.25vw,48px)] font-[700] leading-[1.08] tracking-[-0.03em] text-[color:var(--color-xvi-ink)]"
        style={{ fontFamily: 'var(--font-family-display)' }}
      >
        {title}
      </h2>
      {description ? (
        <p
          id={descriptionId}
          className="mt-4 text-[14.5px] leading-[1.85] text-[color:var(--color-xvi-ink-soft)] sm:text-[15px]"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeader
