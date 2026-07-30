import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { MapPin, Clock, Shield, Building2 } from 'lucide-react';
import { useLanguage } from '../../../hooks/LanguageProvider';
import { Container } from '../../layout/Container';
import { Section, SectionHeader } from '../../layout/Section';
import { SectionReveal } from '../../../motion/SectionReveal';
import styles from './MapSection.module.scss';

const ease: Easing = [0.16, 1, 0.3, 1];

export function MapSection() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section variant="white" id="location" className={styles.section}>
      <Container>
        <SectionReveal variant="depthIn">
          <SectionHeader
            overline={ar ? 'الموقع' : 'LOCATION'}
            title={ar ? 'حيث نعمل' : 'Where We Operate'}
            description={ar
              ? 'مقرنا في مدينة العين، قلب الإمارات — نقدم خدماتنا للشركات الطموحة في جميع أنحاء المنطقة.'
              : 'Headquartered in Al Ain, the heart of the UAE — serving ambitious enterprises across the region.'}
          />
        </SectionReveal>

        <div className={styles.layout} ref={ref}>
          <motion.div
            className={styles.mapCol}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <div className={styles.mapFrame}>
              <div className={styles.mapGlow} />
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=55.5%2C24.1%2C55.9%2C24.3&layer=mapnik&marker=24.215%2C55.745"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 0 }}
                title="Al Ain Map"
                loading="lazy"
                className={styles.mapIframe}
              />
              <div className={styles.mapOverlay} />
              <motion.div
                className={styles.pin}
                animate={{ y: [0, -4, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <MapPin size={24} color="#C8A65A" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <div className={styles.glassCard}>
              <div className={styles.glassAccent} />
              <div className={styles.glassHeader}>
                <Building2 size={20} color="#C8A65A" />
                <span className={styles.glassTitle}>
                  {ar ? 'المكتب الرئيسي' : 'Headquarters'}
                </span>
              </div>
              <div className={styles.glassBody}>
                <div className={styles.infoRow}>
                  <MapPin size={14} color="#C8A65A" />
                  <span>{ar ? 'العين، أبوظبي، الإمارات العربية المتحدة' : 'Al Ain, Abu Dhabi, United Arab Emirates'}</span>
                </div>
                <div className={styles.infoRow}>
                  <Clock size={14} color="#C8A65A" />
                  <span>{ar ? 'الرد خلال 24 ساعة' : 'Response within 24 hours'}</span>
                </div>
                <div className={styles.infoRow}>
                  <Shield size={14} color="#C8A65A" />
                  <span>{ar ? 'استشارة سرية' : 'Confidential consultation'}</span>
                </div>
              </div>
              <div className={styles.glassFooter}>
                <span className={styles.glassLabel}>{ar ? 'اتصل بنا' : 'Get in Touch'}</span>
                <a href="mailto:contact@xvigroup.com" className={styles.glassEmail}>contact@xvigroup.com</a>
              </div>
            </div>

            <motion.div
              className={styles.secondaryCard}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.4 }}
            >
              <span className={styles.secondaryLabel}>{ar ? 'منطقة الخدمة' : 'Service Region'}</span>
              <span className={styles.secondaryValue}>{ar ? 'الإمارات · منطقة الخليج' : 'UAE · GCC Region'}</span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}