// XVI GROUP — Home Page
// Assembles all sections into the complete homepage

import { Hero } from '../../components/sections/Hero';
import { Services } from '../../components/sections/Services';
import { About } from '../../components/sections/About';
import { Technology } from '../../components/sections/Technology';
import { Industries } from '../../components/sections/Industries';
import { Insights } from '../../components/sections/Insights';
import { Testimonials } from '../../components/sections/Testimonials';
import { Contact } from '../../components/sections/Contact';
import { CTA } from '../../components/sections/CTA';

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Technology />
      <Industries />
      <Insights />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
}
