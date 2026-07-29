import { Hero } from '../../components/sections/Hero';
import { Services } from '../../components/sections/Services';
import { About } from '../../components/sections/About';
import { Technology } from '../../components/sections/Technology';
import { AIProcessFlow } from '../../components/ui/AIProcessFlow';
import { Insights } from '../../components/sections/Insights';
import { Testimonials } from '../../components/sections/Testimonials';
import { CTA } from '../../components/sections/CTA';
import { AIDashboard } from '../../components/ui/AIDashboard';
import { Contact } from '../../components/sections/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Technology />
      <AIProcessFlow />
      <Insights />
      <Testimonials />
      <CTA />
      <AIDashboard />
      <Contact />
    </>
  );
}
