import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGames } from "../../hooks/games/useGames";
import React, { useMemo } from "react";

function GameSection() {
  const { games } = useGames();
  const gamesByPlatform = useMemo(() => {
    return {
      PC: games.filter((g) => g.platforms[0] === "PC").slice(0, 2),
      Mobile: games.filter((g) => g.platforms[0] === "Mobile").slice(0, 2),
    };
  }, [games]);

  const gameSections = useMemo(
    () => [
      { type: "PC Games By WGG", platform: "PC", direction: -100 },
      { type: "Mobile Games By WGG", platform: "Mobile", direction: 100 },
    ],
    []
  );

  return (
    <section className="relative text-white min-h-screen flex items-center px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">
        {gameSections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: section.direction }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-[#4ECDC4] mb-10">
              {section.type}
            </h2>

            <div className="flex justify-center gap-8 mb-10 flex-wrap">
              {gamesByPlatform[section.platform]?.map((game) => (
                <Link
                  to={`/games/${game.id}`}
                  key={`game-${game.id}`}
                  className="relative group w-64 h-64 overflow-hidden rounded-xl border-4 border-[#4ECDC4] shadow-lg hover:shadow-[#4ECDC4]/40 transition-shadow"
                >
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${game.img}`}
                    alt={game.title}
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2">
                    <p className="text-base font-semibold">{game.title}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link to={`/games/platform/${section.platform}`}>
              <button className="bg-[#4ECDC4] text-[#1A1F25] font-semibold px-8 py-3 rounded-lg hover:bg-[#3dc0b9] transition">
                Explore More {section.platform} Games
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(GameSection);
