// XVI GROUP — Input Component
// Form input with floating label per COMPONENT_LIBRARY.md

import { useState, forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

// ============================================
// TYPES
// ============================================

interface InputBaseProps {
  label: string;
  name: string;
  error?: string;
  success?: string;
  helperText?: string;
}

type InputProps = InputBaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputBaseProps>;

// ============================================
// COMPONENT
// ============================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, success, helperText, className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value);

    const isActive = isFocused || hasValue;

    const classes = [
      styles.wrapper,
      error && styles.error,
      success && styles.success,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classes}>
        <div className={styles.inputWrapper}>
          <label
            htmlFor={name}
            className={[styles.label, isActive && styles.labelActive]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </label>
          <input
            ref={ref}
            id={name}
            name={name}
            className={styles.input}
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
        {success && <p className={styles.successText}>{success}</p>}
        {helperText && !error && !success && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
