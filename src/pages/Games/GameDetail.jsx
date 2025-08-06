import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`/api/games/${id}`);
        if (!res.ok) throw new Error("Game not found");
        const data = await res.json();
        setGame(data);
      } catch (error) {
        console.error("Failed to fetch game:", error);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading)
    return <p className="text-white text-center">Loading...</p>;
  if (!game)
    return <p className="text-white text-center">Game not found.</p>;

  const prevVideo = () => {
    setCurrentVideo((prev) =>
      prev === 0 ? (game.screenshots?.length || 1) - 1 : prev - 1
    );
  };

  const nextVideo = () => {
    setCurrentVideo((prev) =>
      prev === (game.screenshots?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="bg-[#292F36] text-white min-h-screen py-10 px-4 mt-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-[#4ECDC4]">{game.title}</h1>

        <img
          src={
            game.img
              ? `http://localhost:3000/uploads/${game.img}`
              : "/placeholder.jpg"
          }
          alt={game.title}
          className="w-full rounded-lg shadow"
        />

        <div className="mt-8 flex justify-center gap-8">
          <button className="bg-[#292F36] border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold px-6 py-3 rounded hover:bg-[#1f2329] transition">
            DOWNLOAD NOW
          </button>
          <button className="bg-[#292F36] border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold px-6 py-3 rounded hover:bg-[#1f2329] transition">
            DOWNLOAD OUR PRESSKIT
          </button>
        </div>

        {game.screenshots?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Video Preview</h2>
            <div className="relative w-full max-w-3xl mx-auto">
              <img
                src={
                  game.screenshots[currentVideo]
                    ? game.screenshots[currentVideo]
                    : "/placeholder.jpg"
                }
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
              {game.screenshots.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setCurrentVideo(index)}
                  className={`w-24 h-16 rounded cursor-pointer border-2 ${
                    currentVideo === index ? "border-white" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#4ECDC4]">
            About this game
          </h2>
          <p className="text-gray-300">{game.description}</p>
        </div>

        <ul className="space-y-2 text-gray-400">
          <li>
            <strong>Platform:</strong> {Array.isArray(game.platforms) ? game.platforms.join(", ") : game.platforms}
          </li>
          <li>
            <strong>Category:</strong>{" "}
            {Array.isArray(game.categories) ? game.categories.join(", ") : game.categories}
          </li>
          <li>
            <strong>Release Date:</strong> {game.releaseDate}
          </li>
        </ul>

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

        <div className="text-center mt-10">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#4ECDC4] text-[#292F36] font-semibold px-6 py-3 rounded hover:bg-[#3dc0b9]"
          >
            ← Back to Games
          </button>
        </div>
      </div>
    </section>
  );
}
