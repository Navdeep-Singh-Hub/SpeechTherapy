import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/sections/Hero.jsx";
import TechStack from "../components/sections/TechStack.jsx";
import Mission from "../components/sections/Mission.jsx";
import Architecture from "../components/sections/Architecture.jsx";
import Domains from "../components/sections/Domains.jsx";
import AISection from "../components/sections/AISection.jsx";
import Participants from "../components/sections/Participants.jsx";
import CTA from "../components/sections/CTA.jsx";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Mission />
        <Architecture />
        <Domains />
        <AISection />
        <Participants />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
