import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import EventsSection from "../components/home/EventsSection";
import TeamSection from "../components/home/TeamSection";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cms-bg">
      <div className="mx-auto max-w-home px-8">
        <Navbar />
        <Hero />
        <AboutSection />
        <EventsSection />
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
}
