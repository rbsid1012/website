import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValuePillars from "@/components/ValuePillars";
import ProductExperience from "@/components/ProductExperience";
import SafetyControl from "@/components/SafetyControl";
import RingPrototype from "@/components/RingPrototype";
import PaymentsIntelligence from "@/components/PaymentsIntelligence";
import Philosophy from "@/components/Philosophy";
// import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div id="features">
          <ValuePillars />
        </div>
        <ProductExperience />
        <SafetyControl />
        {/* Explore Ring section now comes BEFORE Payment/Verification flows */}
        <RingPrototype />
        <PaymentsIntelligence />
        {/* <TestimonialsCarousel /> */}
        <Philosophy />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
