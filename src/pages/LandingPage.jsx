import HeroSection from "../components/home/HeroSection";
import GamesSection from "../components/home/GameSection";
import NewsSection from "../components/home/NewsSection";
import SubscribeSection from "../components/home/Subscribesection";

export default function LandingPage() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <HeroSection />
      <GamesSection />
      <NewsSection />
      <SubscribeSection />
    </div>
  );
}
