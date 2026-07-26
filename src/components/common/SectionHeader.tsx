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
        <div
          className="inline-flex items-center gap-3 text-[0.62rem] tracking-[0.32em] text-[color:var(--color-xvi-bronze)] font-[700] uppercase mb-1"
          style={{ fontFamily: 'var(--font-family-english)' }}
        >
          <span className="inline-block w-5 h-px bg-[color:var(--color-xvi-bronze)] opacity-70 flex-shrink-0" />
          {eyebrow}
        </div>
      ) : null}
      <h2
        id={titleId}
        className="mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] font-[700] leading-[0.97] tracking-[-0.04em] text-[color:var(--color-xvi-ink)]"
        style={{ fontFamily: 'var(--font-family-display)' }}
      >
        {title}
      </h2>
      {description ? (
        <p
          id={descriptionId}
          className="mt-5 text-[15px] leading-[1.8] text-[color:var(--color-xvi-ink-soft)] sm:text-[15.5px] max-w-[52ch]"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeader
