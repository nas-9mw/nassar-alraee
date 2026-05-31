import ParallaxBackground from '@/components/ParallaxBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BannerSlider from '@/components/BannerSlider';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import IdentitiesScattered from '@/components/IdentitiesScattered';
import BrandsMarquee from '@/components/BrandsMarquee';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#050505' }}>
      <ParallaxBackground />
      <Navbar />
      <Hero />
      <BannerSlider />
      <Services />
      <Portfolio />
      <IdentitiesScattered />
      <BrandsMarquee />
      <Contact />
      <Footer />
    </div>
  );
}

