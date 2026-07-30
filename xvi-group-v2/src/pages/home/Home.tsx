import { Hero } from '../../components/sections/Hero/Hero';
import { Services } from '../../components/sections/Services/Services';
import { Technology } from '../../components/sections/Technology/Technology';
import { Industries } from '../../components/sections/Industries/Industries';
import { Contact } from '../../components/sections/Contact/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Technology />
      <Industries />
      <Contact />
    </>
  );
}
