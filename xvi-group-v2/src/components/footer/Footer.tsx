import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandName}>XVI GROUP</span>
          <span className={styles.brandTagline}>AI CONSULTING FOR THE DECISIVE.</span>
        </div>
        <div className={styles.copyright}>
          © 2026 XVI GROUP
        </div>
      </div>
    </footer>
  );
}
