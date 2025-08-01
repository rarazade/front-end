import { useState, useEffect } from 'react';
import draft1 from '../assets/Draft_Design3.webp';
import draft2 from '../assets/LandingPage.webp';
import draft3 from '../assets/placeholder.jpg';

const images = [draft1, draft2, draft3];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next & Prev
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto slide 
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-screen w-full transition-all duration-700"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/20 to-transparent z-10" />

      {/* Caption */}
      <div className="absolute top-1/2 left-20 -translate-y-1/2 z-10 text-white max-w-xl">
        <h1 className="text-5xl font-extrabold text-[#4ECDC4] drop-shadow-lg">Who Talk?</h1>
        <p className="mt-3 text-lg leading-relaxed drop-shadow-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          <br />
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        <button className="mt-5 px-4 py-2 bg-[#4ECDC4] text-[#292F36] font-bold hover:bg-[#e06f00] shadow-md">
          Read more
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#292F36]/60 hover:bg-[#292F36]/90 text-white p-2 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#292F36]/60 hover:bg-[#292F36]/90 text-white p-2 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
