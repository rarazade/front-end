import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useJumbotrons } from "../../hooks/games/useGames";

export default function HeroSection() {
  const { jumbotrons } = useJumbotrons();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (jumbotrons.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % jumbotrons.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [jumbotrons]);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (jumbotrons.length === 0) {
    return <section className="w-full h-[70vh] flex items-center justify-center text-white"><p>Belum ada jumbotron</p></section>;
  }

  const current = jumbotrons[currentIndex];

  return (
    <section className="relative w-full bg-[#0a1016] h-[100vh] overflow-hidden">
      <img src={current.game.imageUrl} alt={current.game.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative h-full flex flex-col items-start justify-center text-left md:pl-20 text-white bg-gradient-to-r from-black/60 via-black/40 to-transparent">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-[#4ECDC4] transform transition-all duration-500 ease-out ${animate ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"}`}>
          {current.game.title}
        </h2>
        <p className={`max-w-2xl text-gray-200 text-lg line-clamp-3 transform transition-all duration-500 delay-100 ease-out ${animate ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"}`}>
          {current.game.description}
        </p>
        <Link to={`/games/${current.game.id}`} className={`text-[#4ECDC4] font-semibold py-2 rounded-lg mt-2 flex items-center gap-2 transform transition-all duration-500 delay-200 ease-out ${animate ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"}`}>
          READ MORE →
        </Link>
      </div>
    </section>
  );
}
