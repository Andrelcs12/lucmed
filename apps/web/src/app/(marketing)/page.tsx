import { BenefitsSection } from "@/components/landing/benefits-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PreviewSection } from "@/components/landing/preview-section";
import { TrustSection } from "@/components/landing/trust-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PreviewSection />
      <TrustSection />
      <CtaSection />
    </>
  );
}
