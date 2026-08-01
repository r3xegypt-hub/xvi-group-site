import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useLanguage } from '../../hooks/LanguageProvider';
import type { JourneyMeta } from '../../hooks/journeyContext';
import { X } from 'lucide-react';
import styles from './JourneyFocusBanner.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

interface Props {
  meta: JourneyMeta;
  onClear: () => void;
}

export function JourneyFocusBanner({ meta, onClear }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <motion.div
      className={styles.banner}
      style={{ '--journey': meta.color } as React.CSSProperties}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.6, ease }}
      role="status"
      data-testid="journey-focus-banner"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.text}>
        {ar
          ? `تجربة مخصصة لمسار ${meta.label.ar}`
          : `Curated for your ${meta.label.en} journey`}
      </span>
      <button
        type="button"
        className={styles.clear}
        onClick={onClear}
        aria-label={ar ? 'إعادة ضبط المسار' : 'Reset journey'}
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
