// XVI GROUP — Card Component
// All card variants per COMPONENT_LIBRARY.md

import { type ReactNode } from 'react';
import styles from './Card.module.scss';

// ============================================
// TYPES
// ============================================

interface CardBaseProps {
  children?: ReactNode;
  className?: string;
}

interface ServiceCardProps extends CardBaseProps {
  variant: 'service';
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
}

interface StatCardProps extends CardBaseProps {
  variant: 'stat';
  number: number | string;
  suffix?: string;
  label: string;
}

interface TestimonialCardProps extends CardBaseProps {
  variant: 'testimonial';
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
}

interface IndustryCardProps extends CardBaseProps {
  variant: 'industry';
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

interface TeamCardProps extends CardBaseProps {
  variant: 'team';
  name: string;
  role: string;
  image: string;
}

type CardProps = ServiceCardProps | StatCardProps | TestimonialCardProps | IndustryCardProps | TeamCardProps;

// ============================================
// COMPONENT
// ============================================

export function Card(props: CardProps) {
  const { variant, className = '', children, ...rest } = props;
  const classes = [styles.card, styles[variant], className].filter(Boolean).join(' ');

  switch (variant) {
    case 'service':
      return <ServiceCard {...(rest as any)} classes={classes} />;
    case 'stat':
      return <StatCard {...(rest as any)} classes={classes} />;
    case 'testimonial':
      return <TestimonialCard {...(rest as any)} classes={classes} />;
    case 'industry':
      return <IndustryCard {...(rest as any)} classes={classes} />;
    case 'team':
      return <TeamCard {...(rest as any)} classes={classes} />;
    default:
      return <div className={classes}>{children}</div>;
  }
}

// ============================================
// SERVICE CARD
// ============================================

function ServiceCard({
  icon,
  title,
  description,
  href,
  linkText = 'Learn more',
  classes,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
  classes: string;
}) {
  const Tag = href ? 'a' : 'div';
  const tagProps = href ? { href } : {};

  return (
    <Tag className={classes} {...tagProps}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {href && (
        <span className={styles.link}>
          {linkText} <span className={styles.arrow}>→</span>
        </span>
      )}
    </Tag>
  );
}

// ============================================
// STAT CARD
// ============================================

function StatCard({
  number,
  suffix = '',
  label,
  classes,
}: {
  number: number | string;
  suffix?: string;
  label: string;
  classes: string;
}) {
  return (
    <div className={classes}>
      <div className={styles.statNumber}>
        {number}
        {suffix && <span className={styles.statSuffix}>{suffix}</span>}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

// ============================================
// TESTIMONIAL CARD
// ============================================

function TestimonialCard({
  quote,
  author,
  title,
  company,
  avatar,
  classes,
}: {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
  classes: string;
}) {
  return (
    <div className={classes}>
      <div className={styles.quoteMark}>"</div>
      <blockquote className={styles.quote}>{quote}</blockquote>
      <div className={styles.author}>
        {avatar && (
          <img src={avatar} alt={author} className={styles.avatar} />
        )}
        <div>
          <div className={styles.authorName}>{author}</div>
          <div className={styles.authorTitle}>
            {title}, {company}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// INDUSTRY CARD
// ============================================

function IndustryCard({
  icon,
  title,
  description,
  href,
  classes,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  classes: string;
}) {
  const Tag = href ? 'a' : 'div';
  const tagProps = href ? { href } : {};

  return (
    <Tag className={classes} {...tagProps}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Tag>
  );
}

// ============================================
// TEAM CARD
// ============================================

function TeamCard({
  name,
  role,
  image,
  classes,
}: {
  name: string;
  role: string;
  image: string;
  classes: string;
}) {
  return (
    <div className={classes}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  );
}
