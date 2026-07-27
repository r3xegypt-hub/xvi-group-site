// XVI GROUP — Button Component
// All button variants and states per COMPONENT_LIBRARY.md

import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode, forwardRef } from 'react';
import styles from './Button.module.scss';

// ============================================
// TYPES
// ============================================

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
};

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as?: 'button' | 'a';
    href?: string;
  };

// ============================================
// COMPONENT
// ============================================

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      loading = false,
      fullWidth = false,
      className = '',
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {!loading && icon && iconPosition === 'left' && (
          <span className={styles.icon}>{icon}</span>
        )}
        <span className={styles.text}>{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className={styles.icon}>{icon}</span>
        )}
      </>
    );

    if (props.as === 'a' || props.href) {
      const { as: _as, href, ...anchorProps } = props;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          aria-disabled={disabled}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    const { as, href: _href, ...buttonProps } = props;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled || loading}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
