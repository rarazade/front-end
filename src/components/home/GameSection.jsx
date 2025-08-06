import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GameSection() {
  const [gamesByPlatform, setGamesByPlatform] = useState({
    PC: [],
    Mobile: [],
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/games");
        const games = response.data;

        // Kelompokkan berdasarkan platform
        const grouped = {
          PC: games.filter((game) => game.platforms[0] === "PC").slice(0, 2),
          Mobile: games.filter((game) => game.platforms[0] === "Mobile").slice(0, 2),
        };
        console.log(`http://localhost:3000/${games[0].img}`)
        setGamesByPlatform(grouped);
      } catch (error) {
        console.error("Gagal fetch data game:", error);
      }
    };

    fetchGames();
  }, []);

  const gameSections = [
    { type: "PC Games By WGG", platform: "PC" },
    { type: "Mobile Games By WGG", platform: "Mobile" },
  ];

  return (
    <section className="bg-[#292F36] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {gameSections.map((section, idx) => (
          <div key={idx} className="text-center">
            <h2 className="text-3xl font-bold text-[#4ECDC4] mb-8">
              {section.type}
            </h2>

            <div className="flex justify-center gap-6 mb-8 flex-wrap">
              {gamesByPlatform[section.platform]?.map((game) => (
                <Link
                  to={`/games/${game.id}`}
                  key={`game-${game.id}`}
                  className="relative group w-60 h-60 overflow-hidden rounded-lg border-4 border-[#4ECDC4] shadow-md"
                >
                  <img
                    src={game.img}
                    alt={game.title}
                    className="w-full h-full object-cover transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 px-3">
                    <p className="text-sm font-semibold">{game.title}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link to={`/games/platform/${section.platform}`}>
              <button className="bg-[#4ECDC4] text-[#292F36] font-semibold px-6 py-2 rounded hover:bg-[#3dc0b9] transition">
                Explore More {section.platform} Games
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
