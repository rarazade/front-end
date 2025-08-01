
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gamesData } from "../data/gamesData";

export default function SectionGame() {
  const { platform, category } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(platform || "");
  const [selectedCategory, setSelectedCategory] = useState(category || "");

  const uniquePlatforms = [...new Set(gamesData.map((game) => game.platform))];
  const uniqueCategories = [...new Set(gamesData.map((game) => game.category))];

  // Filter berdasarkan platform, kategori, dan pencarian
  const filteredGames = gamesData.filter((game) => {
    return (
      (!selectedPlatform || game.platform === selectedPlatform) &&
      (!selectedCategory || game.category === selectedCategory) &&
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sinkronisasi URL param ke filter saat URL berubah
  useEffect(() => {
    if (platform) setSelectedPlatform(platform);
    if (category) setSelectedCategory(category);
  }, [platform, category]);

  return (
    <section className="bg-[#292F36] text-white py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#4ECDC4] mb-8 text-center">
          Explore Our Games
        </h2>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <input
            type="text"
            placeholder="Search games..."
            className="p-2 rounded bg-[#1f242b] text-white w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-2 rounded bg-[#1f242b] text-white w-full md:w-1/3"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="">All Platforms</option>
            {uniquePlatforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded bg-[#1f242b] text-white w-full md:w-1/3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Daftar Game */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Link
              to={`/games/${game.id}`}
              key={game.id}
              className="relative group overflow-hidden rounded-lg border-4 border-[#4ECDC4] shadow-md"
            >
              <img
                src={game.img}
                alt={game.title}
                className="w-full h-60 object-cover transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">
                  Play {game.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <p className="text-center mt-8 text-gray-400">No games found.</p>
        )}
      </div>
    </section>
  );
}
