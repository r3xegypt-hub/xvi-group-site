import { Hero } from '../../components/sections/Hero/Hero';
import { Services } from '../../components/sections/Services/Services';
import { Technology } from '../../components/sections/Technology/Technology';
import { Industries } from '../../components/sections/Industries/Industries';
import { Contact } from '../../components/sections/Contact/Contact';
import { AmbientMotion } from '../../components/ui/AmbientMotion';
import { FloatingParticles } from '../../motion/FloatingParticles';
import { SectionSeparator } from '../../motion/SectionSeparator';

export function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <AmbientMotion />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <FloatingParticles count={30} color="#C8A65A" speed={1.2} />
      </div>
      <Hero />
      <SectionSeparator variant="gold-bar" />
      <Services />
      <SectionSeparator variant="gold-bar" />
      <Technology />
      <SectionSeparator variant="gold-bar" />
      <Industries />
      <SectionSeparator variant="gold-bar" />
      <Contact />
    </div>
  );
}
