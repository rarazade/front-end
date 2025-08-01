import Navbar from "../component/Navbar";
import HeroSection from "../component/HeroSection";
import GamesSection from "../component/GameSection";
import NewsSection from "../component/NewsSection";
import SubscribeSection from "../component/Subscribesection";
import Footer from "../component/Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <Navbar />
      <HeroSection />
      <GamesSection />
      <NewsSection />
      <SubscribeSection />
      <Footer />
    </div>
  );
}
