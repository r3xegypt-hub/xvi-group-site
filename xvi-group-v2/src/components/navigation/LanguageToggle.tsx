// XVI GROUP — Language Toggle Component
// EN/AR language switcher per COMPONENT_LIBRARY.md

import { useLanguage } from '../../hooks/LanguageProvider';
import styles from './LanguageToggle.module.scss';

interface LanguageToggleProps {
  fullWidth?: boolean;
  className?: string;
}

export function LanguageToggle({ fullWidth = false, className = '' }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className={[
        styles.toggle,
        fullWidth && styles.fullWidth,
        language === 'ar' && styles.rtl,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={toggleLanguage}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
      role="switch"
      aria-checked={language === 'ar'}
      aria-live="polite"
    >
      <span
        className={[
          styles.option,
          language === 'en' && styles.active,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        EN
      </span>
      <span
        className={[
          styles.option,
          language === 'ar' && styles.active,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        AR
      </span>
      <span
        className={[
          styles.thumb,
          language === 'ar' && styles.thumbRight,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </button>
  );
}
