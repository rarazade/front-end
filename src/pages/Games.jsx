import Navbar from "../component/Navbar";
import HeroSection from "../component/HeroSection";
import SectionGame from "../component/SectionGames";
import Footer from "../component/Footer";

export default function About() {
  return (
    <div className="bg-[#292F36] text-white min-h-screen">
      <Navbar />
      <Footer />
      <HeroSection />
      <SectionGame />
    </div>
  );
}