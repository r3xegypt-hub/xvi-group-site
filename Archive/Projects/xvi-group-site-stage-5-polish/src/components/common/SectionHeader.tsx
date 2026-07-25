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
    <div className="max-w-[720px]">
      {eyebrow ? (
        <div className="text-[11px] tracking-[0.28em] text-[color:var(--color-xvi-bronze)] font-medium uppercase">
          {eyebrow}
        </div>
      ) : null}
      <h2
        id={titleId}
        className="mt-4 text-[clamp(32px,4vw,58px)] font-[700] leading-[1.02] tracking-[-0.04em] text-[color:var(--color-xvi-ink)]"
        style={{ fontFamily: 'var(--font-family-display)' }}
      >
        {title}
      </h2>
      {description ? (
        <p
          id={descriptionId}
          className="mt-4 text-[15px] leading-[1.9] text-[color:var(--color-xvi-ink-soft)] sm:text-[16px]"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeader
