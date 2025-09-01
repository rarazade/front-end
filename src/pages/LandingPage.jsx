import HeroSection from "../components/home/HeroSection";
import GamesSection from "../components/home/GameSection";
import NewsSection from "../components/home/NewsSection";
import SubscribeSection from "../components/home/Subscribesection";
import Background from "../assets/13.jpg"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-black/50 bg-blend-overlay text-white"
    style={{ backgroundImage: `url(${Background})`}}>
      {/* Hero */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Games */}
      <section id="games" className="min-h-[700px] m-10">
        <GamesSection />
      </section>

      {/* News */}
      <section id="news" className="min-h-[700px]">
        <NewsSection />
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="min-h-[500px]">
        <SubscribeSection />
      </section>
    </div>
  );
}
