import { Hero } from '../../components/sections/Hero/Hero';
import { Services } from '../../components/sections/Services/Services';
import { Industries } from '../../components/sections/Industries/Industries';
import { Technology } from '../../components/sections/Technology/Technology';
import { AIConsultant } from '../../components/sections/AIConsultant/AIConsultant';
import { Insights } from '../../components/sections/Insights/Insights';
import { CTA } from '../../components/sections/CTA/CTA';

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <Technology />
      <AIConsultant />
      <Insights />
      <CTA />
    </>
  );
}
