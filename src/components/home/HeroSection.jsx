import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


export default function HeroSection() {
  const [jumbotrons, setJumbotrons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/jumbotrons")
      .then((res) => res.json())
      .then(setJumbotrons)
      .catch(console.error);
  }, []);

  // Auto slide tiap 5 detik
  useEffect(() => {
    if (jumbotrons.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % jumbotrons.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [jumbotrons]);

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + jumbotrons.length) % jumbotrons.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % jumbotrons.length);
  };

  if (jumbotrons.length === 0) {
    return (
      <section className="w-full h-[70vh] bg-[#292F36] flex items-center justify-center text-white">
        <p>Belum ada jumbotron</p>
      </section>
    );
  }

  const current = jumbotrons[currentIndex];

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {/* Background image */}
      <img
        src={current.game.imageUrl}
        alt={current.game.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Content */}
      <div className="relative  h-full flex flex-col items-start 
                      justify-center text-left md:pl-20 text-white 
                      bg-gradient-to-r from-black/60 via-black/40 to-transparent rounded-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#4ECDC4]">
          {current.game.title}
        </h2>
        <p className="max-w-2xl text-gray-200 text-lg line-clamp-3">
          {current.game.description}
        </p>
        <Link
          to={`games/${current.game.id}`}
          className="text-[#4ECDC4] font-semibold py-2 rounded-lg transition-colors mt-2 flex items-center gap-2"
        >
          READ MORE →
        </Link>
      </div>


      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#292F36]/50 hover:bg-[#292F36]/70 p-3 rounded-full text-white z-10"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#292F36]/50 hover:bg-[#292F36]/70 p-3 rounded-full text-white z-10"
      >
        <ChevronRight size={28} />
      </button>

      {/* Overlay gradient di bawah */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#292F36] via-transparent to-transparent"></div>


      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {jumbotrons.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === i ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
