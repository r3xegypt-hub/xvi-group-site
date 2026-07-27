// XVI GROUP — Preview V1
// Interactive design validation page for Phase 02 foundation

import { useState } from 'react';
import { useLanguage } from '../../hooks/LanguageProvider';
import { useResponsive } from '../../hooks/useResponsive';
import { Button } from '../../components/buttons/Button';
import { Card } from '../../components/cards/Card';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { SectionHeader } from '../../components/layout/Section';
import { Grid } from '../../components/layout/Grid';
import { LanguageToggle } from '../../components/navigation/LanguageToggle';
import { Diamond } from '../../svg/geometry/Diamond';
import { MeridianLine } from '../../svg/geometry/MeridianLine';
import { Frame } from '../../svg/geometry/Frame';
import { Navigation } from '../../components/navigation/Navigation';
import { Footer } from '../../components/footer/Footer';
import styles from './Preview.module.scss';

type DeviceView = 'desktop' | 'laptop' | 'tablet-landscape' | 'tablet-portrait' | 'large-mobile' | 'medium-mobile' | 'small-mobile';

const DEVICE_WIDTHS: Record<DeviceView, number> = {
  'desktop': 1920,
  'laptop': 1366,
  'tablet-landscape': 1024,
  'tablet-portrait': 768,
  'large-mobile': 429,
  'medium-mobile': 375,
  'small-mobile': 320,
};

const DEVICE_LABELS: Record<DeviceView, string> = {
  'desktop': 'Desktop (1920px)',
  'laptop': 'Laptop (1366px)',
  'tablet-landscape': 'Tablet Landscape (1024px)',
  'tablet-portrait': 'Tablet Portrait (768px)',
  'large-mobile': 'Large Mobile (429px)',
  'medium-mobile': 'Medium Mobile (375px)',
  'small-mobile': 'Small Mobile (320px)',
};

export default function Preview() {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const responsive = useResponsive();
  const [activeDevice, setActiveDevice] = useState<DeviceView>('desktop');
  const [showFrame, setShowFrame] = useState(true);

  return (
    <div className={styles.preview}>
      {/* CONTROL PANEL */}
      <div className={styles.controlPanel}>
        <div className={styles.controlHeader}>
          <h2 className={styles.controlTitle}>XVI GROUP — Foundation Preview</h2>
          <p className={styles.controlSubtitle}>Design validation for Phase 02</p>
        </div>

        {/* Device Switcher */}
        <div className={styles.controlSection}>
          <h3 className={styles.sectionLabel}>Device View</h3>
          <div className={styles.deviceButtons}>
            {(Object.keys(DEVICE_WIDTHS) as DeviceView[]).map((device) => (
              <button
                key={device}
                className={[styles.deviceBtn, activeDevice === device && styles.deviceBtnActive]
                  .filter(Boolean).join(' ')}
                onClick={() => setActiveDevice(device)}
              >
                {DEVICE_LABELS[device]}
              </button>
            ))}
          </div>
        </div>

        {/* Language Toggle */}
        <div className={styles.controlSection}>
          <h3 className={styles.sectionLabel}>Language</h3>
          <div className={styles.langRow}>
            <LanguageToggle />
            <span className={styles.langIndicator}>
              Current: {language === 'en' ? 'English' : 'العربية'} ({isRTL ? 'RTL' : 'LTR'})
            </span>
          </div>
        </div>

        {/* Current Breakpoint */}
        <div className={styles.controlSection}>
          <h3 className={styles.sectionLabel}>Active Breakpoint</h3>
          <p className={styles.breakpointInfo}>
            {responsive.breakpoint} — {responsive.width}px
          </p>
        </div>

        {/* Show Frame Toggle */}
        <div className={styles.controlSection}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={showFrame}
              onChange={(e) => setShowFrame(e.target.checked)}
              className={styles.checkbox}
            />
            Show device frame
          </label>
        </div>
      </div>

      {/* PREVIEW AREA */}
      <div className={styles.previewArea}>
        <div
          className={[styles.deviceFrame, showFrame && styles.hasFrame].filter(Boolean).join(' ')}
          style={{
            maxWidth: showFrame ? `${DEVICE_WIDTHS[activeDevice]}px` : '100%',
          }}
        >
          {showFrame && (
            <div className={styles.frameHeader}>
              <span className={styles.frameLabel}>{DEVICE_LABELS[activeDevice]}</span>
              <span className={styles.frameSize}>{DEVICE_WIDTHS[activeDevice]}px</span>
            </div>
          )}

          <div className={styles.previewContent} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* === SECTION 1: NAVIGATION === */}
            <PreviewSection id="navigation" title="Navigation">
              <Navigation />
              <p className={styles.note}>
                Navigation shown above. Sticky, responsive, with language toggle.
                Mobile menu triggers at tablet-landscape breakpoint.
              </p>
            </PreviewSection>

            {/* === SECTION 2: LOGO PLACEMENT === */}
            <PreviewSection id="logo" title="Logo Placement">
              <div className={styles.logoGrid}>
                <div className={styles.logoItem}>
                  <img src={`${import.meta.env.BASE_URL}logo/logo-horizontal.svg`} alt="XVI GROUP" className={styles.logoDark} />
                  <span className={styles.logoLabel}>Dark (on light bg)</span>
                </div>
                <div className={[styles.logoItem, styles.logoItemDark].join(' ')}>
                  <img src={`${import.meta.env.BASE_URL}logo/logo-horizontal-dark.svg`} alt="XVI GROUP" className={styles.logoLight} />
                  <span className={styles.logoLabelLight}>Light (on dark bg)</span>
                </div>
              </div>
            </PreviewSection>

            {/* === SECTION 3: COLOR SYSTEM === */}
            <PreviewSection id="colors" title="Color System">
              <div className={styles.colorGrid}>
                <ColorSwatch name="Executive Gold" hex="#C9A96E" />
                <ColorSwatch name="Deep Navy" hex="#0A1628" />
                <ColorSwatch name="Background" hex="#F4F5F7" />
                <ColorSwatch name="Surface" hex="#FFFFFF" />
                <ColorSwatch name="Graphite" hex="#5A6472" />
                <ColorSwatch name="Luxury Grey" hex="#C8CDD5" />
                <ColorSwatch name="Gold Light" hex="#D4B87A" />
                <ColorSwatch name="Navy Light" hex="#1A2A44" />
                <ColorSwatch name="Warm" hex="#FAFAF8" />
                <ColorSwatch name="Gold Muted" hex="rgba(201,169,110,0.08)" />
                <ColorSwatch name="Border" hex="rgba(201,169,110,0.12)" />
                <ColorSwatch name="Success" hex="#2D8A56" />
                <ColorSwatch name="Error" hex="#C4392D" />
                <ColorSwatch name="Warning" hex="#F39C12" />
                <ColorSwatch name="Info" hex="#3498DB" />
              </div>
            </PreviewSection>

            {/* === SECTION 4: TYPOGRAPHY === */}
            <PreviewSection id="typography" title="Typography">
              <div className={styles.typeStack}>
                <div className={styles.typeItem}>
                  <span className={styles.typeLabel}>H1 — Playfair Display</span>
                  <h1 className={styles.typeDemo}>Strategy. Intelligence. Mastery.</h1>
                </div>
                <div className={styles.typeItem}>
                  <span className={styles.typeLabel}>H2 — Playfair Display</span>
                  <h2 className={styles.typeDemo}>Building Enterprises</h2>
                </div>
                <div className={styles.typeItem}>
                  <span className={styles.typeLabel}>H3 — Playfair Display</span>
                  <h3 className={styles.typeDemo}>Operational Excellence</h3>
                </div>
                <div className={styles.typeItem}>
                  <span className={styles.typeLabel}>Body — Inter</span>
                  <p className={styles.typeDemo}>
                    XVI GROUP combines strategic advisory with technology implementation
                    to deliver measurable outcomes for enterprises across the Middle East.
                  </p>
                </div>
                <div className={styles.typeItem}>
                  <span className={styles.typeLabel}>Overline — Inter Uppercase</span>
                  <p className={styles.overline}>OUR SERVICES</p>
                </div>
                <div className={styles.typeItem}>
                  <span className={styles.typeLabel}>Caption — Inter Small</span>
                  <p className={styles.caption}>Dubai · Abu Dhabi · Riyadh</p>
                </div>
              </div>
            </PreviewSection>

            {/* === SECTION 5: HERO SKELETON === */}
            <PreviewSection id="hero" title="Hero Skeleton">
              <div className={styles.heroSkeleton}>
                <div className={styles.heroContent}>
                  <p className={styles.heroOverline}>ENTERPRISE STRATEGY & TECHNOLOGY</p>
                  <h1 className={styles.heroHeadline}>
                    Building Enterprises That{' '}
                    <span className={styles.heroGold}>Move Markets</span>
                  </h1>
                  <p className={styles.heroSub}>
                    Strategy and technology advisory for enterprises that demand
                    precision, velocity, and operational mastery.
                  </p>
                  <div className={styles.heroActions}>
                    <Button variant="primary" size="lg">
                      {language === 'ar' ? 'ابدأ محادثة' : 'Start a Conversation'}
                    </Button>
                    <Button variant="secondary" size="lg">
                      {language === 'ar' ? 'شاهد أعمالنا' : 'View Our Work'}
                    </Button>
                  </div>
                </div>
                <div className={styles.heroBackground} style={{ opacity: 0.05 }}>
                  <Diamond size={400} variant="gold" />
                </div>
              </div>
            </PreviewSection>

            {/* === SECTION 6: SVG FOUNDATION === */}
            <PreviewSection id="svg" title="SVG Foundation">
              <div className={styles.svgGrid}>
                <div className={styles.svgItem}>
                  <Diamond size={80} variant="navy" />
                  <span className={styles.svgLabel}>Diamond — Navy</span>
                </div>
                <div className={styles.svgItem}>
                  <Diamond size={80} variant="gold" />
                  <span className={styles.svgLabel}>Diamond — Gold</span>
                </div>
                <div className={styles.svgItem}>
                  <Diamond size={80} variant="white" />
                  <span className={styles.svgLabel}>Diamond — White</span>
                </div>
                <div className={styles.svgItem}>
                  <MeridianLine variant="navy" width={200} />
                  <span className={styles.svgLabel}>Meridian — Navy</span>
                </div>
                <div className={styles.svgItem}>
                  <MeridianLine variant="gold" width={200} />
                  <span className={styles.svgLabel}>Meridian — Gold</span>
                </div>
                <div className={styles.svgItem}>
                  <Frame width={120} height={120} variant="gold" />
                  <span className={styles.svgLabel}>Frame — Gold</span>
                </div>
              </div>
            </PreviewSection>

            {/* === SECTION 7: CARD STYLES === */}
            <PreviewSection id="cards" title="Card Styles">
              <Grid columns={3}>
                <Card variant="service" icon={<span>Icon placeholder</span>} title="Business Consulting" description="Strategic advisory for market positioning, growth strategy, and operational excellence." />
                <Card variant="stat" number="150" suffix="+" label="Projects Delivered" />
                <Card variant="testimonial" quote="XVI GROUP transformed our approach to technology strategy." author="Ahmed Al-Rashid" title="CEO" company="TechVentures" />
              </Grid>
            </PreviewSection>

            {/* === SECTION 8: BUTTONS === */}
            <PreviewSection id="buttons" title="Buttons">
              <div className={styles.buttonGrid}>
                <div className={styles.buttonRow}>
                  <Button variant="primary" size="sm">Primary SM</Button>
                  <Button variant="primary" size="md">Primary MD</Button>
                  <Button variant="primary" size="lg">Primary LG</Button>
                </div>
                <div className={styles.buttonRow}>
                  <Button variant="secondary" size="sm">Secondary SM</Button>
                  <Button variant="secondary" size="md">Secondary MD</Button>
                  <Button variant="secondary" size="lg">Secondary LG</Button>
                </div>
                <div className={styles.buttonRow}>
                  <Button variant="ghost">Ghost Button →</Button>
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
            </PreviewSection>

            {/* === SECTION 9: FORMS === */}
            <PreviewSection id="forms" title="Forms">
              <div className={styles.formGrid}>
                <Input label="Full Name" name="name" />
                <Input label="Email Address" name="email" />
                <Input label="Company" name="company" error="This field is required" />
                <Input label="Success State" name="success" success="Valid input" />
              </div>
              <div className={styles.formGrid} style={{ marginTop: '16px' }}>
                <Textarea label="Your Message" name="message" />
              </div>
            </PreviewSection>

            {/* === SECTION 10: FOOTER === */}
            <PreviewSection id="footer" title="Footer">
              <div className={styles.footerPreview}>
                <Footer />
              </div>
            </PreviewSection>

            {/* === SECTION 11: MOTION FOUNDATION === */}
            <PreviewSection id="motion" title="Motion Foundation">
              <div className={styles.motionGrid}>
                <div className={styles.motionItem}>
                  <div className={styles.motionBox}>ease-out-expo</div>
                  <code className={styles.motionCode}>cubic-bezier(0.16, 1, 0.3, 1)</code>
                </div>
                <div className={styles.motionItem}>
                  <div className={[styles.motionBox, styles.motionSpring].join(' ')}>ease-spring</div>
                  <code className={styles.motionCode}>cubic-bezier(0.34, 1.56, 0.64, 1)</code>
                </div>
                <div className={styles.motionItem}>
                  <div className={[styles.motionBox, styles.motionSlow].join(' ')}>slow (800ms)</div>
                  <code className={styles.motionCode}>duration: 800ms</code>
                </div>
              </div>
              <p className={styles.note}>
                Animations respect prefers-reduced-motion. All transitions use the design tokens.
              </p>
            </PreviewSection>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// HELPER COMPONENTS
// ============================================

function PreviewSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={styles.previewSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const isLight = hex === '#FFFFFF' || hex === '#F4F5F7' || hex === '#FAFAF8' || hex === '#ECEEF2';
  return (
    <div className={styles.swatch}>
      <div
        className={styles.swatchColor}
        style={{ backgroundColor: hex, border: isLight ? '1px solid #ECEEF2' : 'none' }}
      />
      <span className={styles.swatchName}>{name}</span>
      <span className={styles.swatchHex}>{hex}</span>
    </div>
  );
}
