// XVI GROUP — Textarea Component

import { useState, forwardRef, type TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';

interface TextareaBaseProps {
  label: string;
  name: string;
  error?: string;
  helperText?: string;
}

type TextareaProps = TextareaBaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextareaBaseProps>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, name, error, helperText, className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value);

    const isActive = isFocused || hasValue;

    const classes = [
      styles.wrapper,
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classes}>
        <div className={styles.textareaWrapper}>
          <label
            htmlFor={name}
            className={[styles.label, isActive && styles.labelActive]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </label>
          <textarea
            ref={ref}
            id={name}
            name={name}
            className={styles.textarea}
            rows={4}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            {...props}
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {helperText && !error && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
