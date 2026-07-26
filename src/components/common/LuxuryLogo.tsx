import { memo } from 'react'
import clsx from 'clsx'

type LogoSize = 'sm' | 'md' | 'lg' | 'xl'
type LogoVariant = 'light' | 'dark' | 'gold'

type LuxuryLogoProps = {
  size?: LogoSize
  variant?: LogoVariant
  animated?: boolean
  showWordmark?: boolean
  className?: string
  stacked?: boolean
}

const SIZES: Record<LogoSize, { emblem: number; wordmark: number; gap: number }> = {
  sm: { emblem: 42, wordmark: 116, gap: 10 },
  md: { emblem: 60, wordmark: 176, gap: 14 },
  lg: { emblem: 88, wordmark: 250, gap: 18 },
  xl: { emblem: 126, wordmark: 340, gap: 26 },
}

export const LuxuryLogo = memo(function LuxuryLogo({
  size = 'md',
  variant = 'dark',
  animated = false,
  showWordmark = true,
  className,
  stacked = false,
}: LuxuryLogoProps) {
  const s = SIZES[size]
  const uid = `${size}-${variant}`
  const tone = variant === 'light' ? '#FFFFFF' : variant === 'gold' ? '#C9A96E' : '#060A10'
  const secondaryTone = variant === 'light' ? 'rgba(255,255,255,0.72)' : 'rgba(6,10,16,0.58)'
  const accent = '#C9A96E'
  const shadowOpacity = variant === 'light' ? 0.18 : 0.09

  return (
    <div
      className={clsx(
        'xvi-luxury-logo',
        `xvi-luxury-logo--${size}`,
        `xvi-luxury-logo--${variant}`,
        {
          'is-animated': animated,
          'is-stacked': stacked,
        },
        className,
      )}
      aria-label="XVI Group — Intelligence · Strategy · Transformation"
      role="img"
      style={
        showWordmark
          ? {
              display: 'inline-flex',
              flexDirection: stacked ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: `${s.gap}px`,
            }
          : { display: 'inline-flex' }
      }
    >
      <svg
        viewBox="0 0 240 240"
        width={s.emblem}
        height={s.emblem}
        className="xvi-luxury-logo-emblem"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`axis-fill-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={variant === 'gold' ? '#F0DFC1' : tone} stopOpacity={variant === 'light' ? 1 : 0.96} />
            <stop offset="100%" stopColor={variant === 'gold' ? accent : tone} />
          </linearGradient>
          <linearGradient id={`axis-accent-${uid}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(201,169,110,0)" />
            <stop offset="50%" stopColor={accent} />
            <stop offset="100%" stopColor="rgba(201,169,110,0)" />
          </linearGradient>
          <filter id={`axis-shadow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor={variant === 'light' ? '#FFFFFF' : '#060A10'} floodOpacity={shadowOpacity} />
          </filter>
        </defs>

        <g filter={`url(#axis-shadow-${uid})`}>
          <path
            className="xvi-axis-frame"
            d="M64 22H176L218 64V176L176 218H64L22 176V64L64 22Z"
            fill="none"
            stroke={variant === 'light' ? 'rgba(255,255,255,0.36)' : 'rgba(6,10,16,0.14)'}
            strokeWidth="2"
          />
          <path
            className="xvi-axis-frame-inner"
            d="M76 42H164L198 76V164L164 198H76L42 164V76L76 42Z"
            fill="none"
            stroke={variant === 'light' ? 'rgba(255,255,255,0.14)' : 'rgba(201,169,110,0.34)'}
            strokeWidth="1.4"
          />
          <rect className="xvi-axis-spine" x="113" y="42" width="14" height="156" rx="7" fill={`url(#axis-fill-${uid})`} />
          <path className="xvi-axis-wing xvi-axis-wing--lt" d="M58 58H82L122 118H98L58 58Z" fill={`url(#axis-fill-${uid})`} />
          <path className="xvi-axis-wing xvi-axis-wing--lb" d="M98 122H122L82 182H58L98 122Z" fill={`url(#axis-fill-${uid})`} />
          <path className="xvi-axis-wing xvi-axis-wing--rt" d="M158 58H182L142 118H118L158 58Z" fill={`url(#axis-fill-${uid})`} />
          <path className="xvi-axis-wing xvi-axis-wing--rb" d="M118 122H142L182 182H158L118 122Z" fill={`url(#axis-fill-${uid})`} />
          <path
            className="xvi-axis-cutline"
            d="M52 120H188"
            stroke={`url(#axis-accent-${uid})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.92"
          />
          <circle className="xvi-axis-node xvi-axis-node--top" cx="120" cy="34" r="3.5" fill={accent} />
          <circle className="xvi-axis-node xvi-axis-node--bottom" cx="120" cy="206" r="3.5" fill={accent} />
        </g>
      </svg>

      {showWordmark ? (
        <div
          className={clsx('xvi-axis-wordmark', stacked && 'xvi-axis-wordmark--stacked')}
          style={{ width: stacked ? undefined : `${s.wordmark}px` }}
        >
          <div className="xvi-axis-wordmark-main">
            <span className="xvi-axis-wordmark-brand" style={{ color: tone }}>XVI</span>
            <span className="xvi-axis-wordmark-divider" aria-hidden="true" style={{ background: accent }} />
            <span className="xvi-axis-wordmark-group" style={{ color: tone }}>GROUP</span>
          </div>
          <div className="xvi-axis-wordmark-sub" style={{ color: secondaryTone }}>
            INTELLIGENCE · STRATEGY · TRANSFORMATION
          </div>
        </div>
      ) : null}
    </div>
  )
})
