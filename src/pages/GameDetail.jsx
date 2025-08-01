import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import { gamesData } from '../data/gamesData';
import mainImage1 from '../assets/placeholder.jpg'
import mainImage2 from '../assets/LandingPage.webp'
import mainImage3 from '../assets/Draft_Design3.webp'


export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = gamesData.find((g) => g.id === parseInt(id));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videoGallery = [mainImage1, mainImage2, mainImage3];

  if (!game) return <p className="text-white text-center">Game not found.</p>;

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? game.screenshots.length - 1 : prev - 1
    );
  };
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === game.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevVideo = () => {
    setCurrentVideo((prev) =>
      prev === 0 ? videoGallery.length - 1 : prev - 1
    );
  };

  const nextVideo = () => {
    setCurrentVideo((prev) =>
      prev === videoGallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="bg-[#292F36] text-white min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Judul dan Gambar */}
        <h1 className="text-3xl font-bold text-[#4ECDC4]">{game.title}</h1>
        <img
          src={game.img}
          alt={game.title}
          className="w-full rounded-lg shadow"
        />

{/* Tombol Aksi */}
<div className="mt-8 flex justify-center gap-8">
  <button className="bg-[#292F36] border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold px-6 py-3 rounded hover:bg-[#1f2329] transition">
    DOWNLOAD NOW
  </button>
  <button className="bg-[#292F36] border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold px-6 py-3 rounded hover:bg-[#1f2329] transition">
    DOWNLOAD OUR PRESSKIT
  </button>
</div>




        {/* Video Gallery */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Video Preview</h2>
          <div className="relative w-full max-w-3xl mx-auto">
            <img
              src={videoGallery[currentVideo]}
              alt="Main Preview"
              className="rounded w-full"
            />
            <button className="absolute inset-0 flex justify-center items-center text-white text-4xl">
              <FaPlay className="bg-white text-black rounded-full p-2" />
            </button>
            <button
              onClick={prevVideo}
              className="absolute left-0 top-1/2 -translate-y-1/2 px-2 text-white"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextVideo}
              className="absolute right-0 top-1/2 -translate-y-1/2 px-2 text-white"
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {videoGallery.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index}`}
                onClick={() => setCurrentVideo(index)}
                className={`w-24 h-16 rounded cursor-pointer border-2 ${
                  currentVideo === index
                    ? 'border-white'
                    : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        

        {/* Screenshot Slider */}
        <div className="relative max-w-3xl mx-auto">
          <img
            src={game.screenshots[currentSlide]}
            className="rounded w-full object-cover h-64"
            alt="Screenshot"
          />
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl px-4"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-2xl px-4"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Deskripsi */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#4ECDC4]">
            About this game
          </h2>
          <p className="text-gray-300">{game.description}</p>
        </div>

        {/* Info Tambahan */}
        <ul className="space-y-2 text-gray-400">
          <li>
            <strong>Platform:</strong> {game.platform}
          </li>
          <li>
            <strong>Category:</strong> {game.category}
          </li>
          <li>
            <strong>Release Date:</strong> {game.releaseDate}
          </li>
        </ul>

        {/* System Requirements */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#4ECDC4]">
            System Requirements
          </h3>
          <ul className="text-sm text-gray-400 list-disc list-inside">
            <li>OS: Windows 10 64-bit</li>
            <li>RAM: 8 GB</li>
            <li>Processor: Intel Core i5</li>
            <li>GPU: GTX 1050 or equivalent</li>
            <li>Storage: 5 GB available space</li>
          </ul>
        </div>

        {/* Tombol Kembali */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-[#292F36] font-semibold px-6 py-3 rounded hover:bg-[#4ECDC4]"
          >
            ← Back to Games
          </button>
        </div>
      </div>
    </section>
  );
}
