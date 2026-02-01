import {
  HeroSection,
  ServicesSection,
  WhyChooseUsSection,
  Testimonials,
  FAQSection,
  CTASection,
  StatsCounter,
} from "@/components/sections";
import { TrustBadges } from "@/components/shared/TrustBadges";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <ServicesSection />
      <StatsCounter />
      <WhyChooseUsSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
