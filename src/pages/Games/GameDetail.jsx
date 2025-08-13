import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RequirementsDetail } from "./RequirementsDetail";

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(0);

  const prevVideo = () => {
  setActiveVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const nextVideo = () => {
    setActiveVideo((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/games/${id}`);
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

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!game) return <p className="text-white text-center">Game not found.</p>;

  const videos = game.videos || [];

  return (
    <section className="bg-[#292F36] text-white min-h-screen pb-10">
      <div className="relative w-full h-[100vh]">
        <img
          src={
            game.img
              ? `http://localhost:3000/uploads/${game.img}`
              : "/placeholder.jpg"
          }
          alt={game.title}
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay gradient di bawah */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#292F36] via-transparent to-transparent"></div>

        {/* Judul di atas gambar */}
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl text-[#4ECDC4] font-bold">{game.title}</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-10">

        <div className="mt-8 flex justify-center gap-8">
          <button className="bg-[#292F36] border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold px-6 py-3 rounded hover:bg-[#1f2329] transition">
            DOWNLOAD NOW
          </button>
          <button className="bg-[#292F36] border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold px-6 py-3 rounded hover:bg-[#1f2329] transition">
            DOWNLOAD OUR PRESSKIT
          </button>
        </div>

       {/* Videos */}
        {videos.length > 0 && (
          <div className="w-full">

            {/* Video Utama */}
            <div className="relative w-full max-w-5xl mx-auto">
              <video
                key={activeVideo}
                src={videos[activeVideo]}
                controls
                autoPlay
                muted
                loop
                className="w-full rounded-lg border border-gray-600"
              />

              {/* Tombol Prev */}
              <button
                onClick={prevVideo}
                className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
              >
                ❮
              </button>

              {/* Tombol Next */}
              <button
                onClick={nextVideo}
                className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
              >
                ❯
              </button>
            </div>

            {/* Thumbnail */}
            {videos.length > 1 && (
              <div className="flex gap-2 mt-3 justify-center flex-wrap">
                {videos.map((src, idx) => (
                  <video
                    key={idx}
                    src={src}
                    muted
                    onClick={() => setActiveVideo(idx)}
                    className={`w-28 h-20 rounded-md border cursor-pointer object-cover transition ${
                      idx === activeVideo
                        ? "border-yellow-400 border-2 scale-105"
                        : "border-gray-600 hover:border-yellow-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-2 text-[#4ECDC4]">
            ABOUT THIS GAME
          </h2>
          <p className="text-gray-300">{game.description}</p>
        </div>

        {/* Screenshots */}
        {game.screenshots?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-center text-[#4ECDC4] mb-4 uppercase">
              Screenshot
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {game.screenshots.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`screenshot-${idx}`}
                  className="w-full h-40 object-cover rounded border border-gray-600"
                />
              ))}
            </div>
          </div>
        )}

        <ul className="space-y-2 text-gray-400">
          <li>
            <strong>Platform:</strong>{" "}
            {Array.isArray(game.platforms)
              ? game.platforms.join(", ")
              : game.platforms}
          </li>
          <li>
            <strong>Category:</strong>{" "}
            {Array.isArray(game.categories)
              ? game.categories?.map((e) => e.category.name).join(", ")
              : game.categories}
          </li>
          <li>
            <strong>Release Date:</strong> {new Date(game.releaseDate).toLocaleDateString()}
          </li>
        </ul>

        <RequirementsDetail requirements={game.requirements}/>
          
        <div className="text-center -scroll-mt-10 mb-20">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#4ECDC4] text-[#292F36] font-semibold px-6 py-3 rounded hover:bg-[#3dc0b9]"
          >
            ← BACK
          </button>
        </div>

      </div>
    </section>
  );
}
