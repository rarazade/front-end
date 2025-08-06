import HeroSection from "../../components/home/HeroSection";
import SectionGame from "./SectionGames";

export default function About() {
  return (
    <div className="bg-[#292F36] text-white min-h-screen">
      <HeroSection />
      <SectionGame />
    </div>
  );
}