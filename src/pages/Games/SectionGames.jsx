import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Select from "react-select";
import { useGames, useMeta } from "../../hooks/games/useGames";
import background from "../../assets/13.jpg";
import HeroSection from "../../components/home/HeroSection"

export default function SectionGame() {
  const { platform, category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(platform || "");
  const [selectedCategories, setSelectedCategories] = useState(category ? [category] : []);

  const { games } = useGames({
    search: searchTerm,
    platform: selectedPlatform,
    category: selectedCategories.join(","),
  });

  const { meta } = useMeta();
  const categoryOptions = meta.categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <>
    < HeroSection />
    <section
      className=" relative text-white py-16 px-6 min-h-screen bg-no-repeat bg-cover bg-center bg-black/60 bg-blend-overlay"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#4ECDC4] mb-8 text-center">Explore Our Games</h2>

        <div className="flex flex-col gap-6 md:gap-4 md:flex-row justify-between mb-8">
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
            {meta.platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <div className="w-full md:w-1/3 text-black">
            <Select
              isMulti
              options={categoryOptions}
              value={selectedCategories.map((id) => categoryOptions.find((opt) => opt.value === id))}
              onChange={(selected) => setSelectedCategories(selected ? selected.map((opt) => opt.value) : [])}
              placeholder="Filter by Category"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {games.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[400px]"
            >
              <Link
                to={`/games/${game.id}`}
                className="relative group overflow-hidden rounded-lg border-2 border-[#4ECDC4] shadow-lg block"
              >
                <img
                  src={game.img?.startsWith("http") ? game.img : `${import.meta.env.VITE_API_BASE_URL}/uploads/${game.img}`}
                  alt={game.title}
                  className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[#4ECDC4] text-center py-2 px-3 transition-opacity duration-300 group-hover:opacity-0">
                  <p className="text-sm font-semibold line-clamp-1">{game.title}</p>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-[#4ECDC4] text-xl font-bold"
                  >
                    {game.title}
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
