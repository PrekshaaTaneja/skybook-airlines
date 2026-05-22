import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import FeaturesSection from "@/components/home/features-section";
import HeroSection from "@/components/home/hero-section";

export default function HomePage() {
  return (
    <main>

      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <Footer />

    </main>
  );
}