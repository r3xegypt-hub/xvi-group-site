import { Hero } from '../../components/sections/Hero/Hero';
import { Services } from '../../components/sections/Services/Services';
import { Technology } from '../../components/sections/Technology/Technology';
import { Industries } from '../../components/sections/Industries/Industries';
import { Contact } from '../../components/sections/Contact/Contact';
import { AmbientMotion } from '../../components/ui/AmbientMotion';
import { JourneyFocusBanner } from '../../components/ui/JourneyFocusBanner';
import { FloatingParticles } from '../../motion/FloatingParticles';
import { SectionSeparator } from '../../motion/SectionSeparator';
import { useJourney } from '../../hooks/journeyContext';
import { journeyMeta } from '../../hooks/journeyContext';

export function Home() {
  const { journey, clear } = useJourney();
  const meta = journeyMeta(journey);

  return (
    <div style={{ position: 'relative' }}>
      <AmbientMotion />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <FloatingParticles count={30} color="#C8A65A" speed={1.2} />
      </div>
      <Hero />
      <SectionSeparator variant="gold-bar" />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {meta && <JourneyFocusBanner meta={meta} onClear={clear} />}
      </div>
      <Services focus={journey} />
      <SectionSeparator variant="gold-bar" />
      <Technology />
      <SectionSeparator variant="gold-bar" />
      <Industries focus={journey} />
      <SectionSeparator variant="gold-bar" />
      <Contact cta={meta?.cta} />
    </div>
  );
}
