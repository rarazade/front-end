import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import background from "../../assets/13.jpg";
import { motion } from "framer-motion";

export default function SectionGame() {
  const { platform, category } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(platform || "");
  const [selectedCategories, setSelectedCategories] = useState(
    category ? [category] : []
  );
  const [gamesData, setGamesData] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch games
 useEffect(() => {
  const fetchGames = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedPlatform) params.append("platform", selectedPlatform);
      if (selectedCategories.length)
        params.append("category", selectedCategories.join(",")); // ⬅️ Kirim ID

      const url = `http://localhost:3000/api/games?${params.toString()}`;
      const res = await axios.get(url);
      setGamesData(res.data);
    } catch (err) {
      console.error("Error fetching games:", err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchGames();
}, [searchTerm, selectedPlatform, selectedCategories]);


  // Fetch meta for filters
  useEffect(() => {
  const fetchMeta = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/meta");
      const data = await res.json();
      console.log("✅ META:", data);

      setPlatforms(data.platforms || []);
      setCategories(data.categories || []);
    } catch (err) {
      console.error("❌ Gagal ambil meta:", err.message);
    }
  };

  fetchMeta();
}, []);

  const categoryOptions = categories.map((cat) => ({
  value: cat.id,
  label: cat.name,
}));

  return (
    <section 
    className=" relative text-white py-16 px-6 min-h-screen bg-no-repeat bg-cover bg-center bg-black/60 bg-blend-overlay"
    style={{ backgroundImage: `url(${background})`}}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#4ECDC4] mb-8 text-center">
          Explore Our Games
        </h2>

        {/* Filters */}
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
    {platforms.map((p) => (
      <option key={p} value={p}>
        {p}
      </option>
    ))}
  </select>

  <div className="w-full md:w-1/3">
    <Select
      isMulti
      options={categoryOptions}
      value={selectedCategories.map((id) => {
        const found = categoryOptions.find((opt) => opt.value === id);
        return found || null;
      })}
      onChange={(selected) =>
        setSelectedCategories(selected ? selected.map((opt) => opt.value) : [])
      }
      placeholder="Filter by Category"
      className="text-sm"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#1f242b",
          borderColor: "#4ECDC4",
          color: "white",
          padding: "2px",
        }),
        singleValue: (base) => ({ ...base, color: "white" }),
        menu: (base) => ({ ...base, backgroundColor: "#292F36", color: "white" }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#4ECDC4" : "#292F36",
          color: state.isFocused ? "#292F36" : "white",
          cursor: "pointer",
        }),
        multiValue: (base) => ({ ...base, backgroundColor: "#4ECDC4" }),
        multiValueLabel: (base) => ({ ...base, color: "#292F36", fontWeight: "bold" }),
        multiValueRemove: (base) => ({
          ...base,
          color: "#292F36",
          ":hover": {
            backgroundColor: "#1f242b",
            color: "white",
          },
        }),
      }}
    />
  </div>
</div>


        {/* List */}
        {/* {loading ? (
          <p className="text-center text-gray-400">Loading games...</p>
        ) : gamesData.length === 0 ? (
          <p className="text-center mt-8 text-gray-400">No games found.</p>
        ) : ( */}

        <div className="flex flex-wrap justify-center gap-6">
  {gamesData.map((game, idx) => (
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
        {/* GAMBAR - Zoom saat hover */}
        <img
          src={
            game.img?.startsWith("http")
              ? game.img
              : `http://localhost:3000/uploads/${game.img}`
          }
          alt={game.title}
          className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />

        {/* TITLE BAWAH - Di atas gambar & hilang saat hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[#4ECDC4] text-center py-2 px-3 transition-opacity duration-300 group-hover:opacity-0">
          <p className="text-sm font-semibold line-clamp-1">{game.title}</p>
        </div>

        {/* OVERLAY + TITLE TENGAH - Muncul langsung saat hover */}
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




  


        {/* )} */}
      </div>
    </section>
  );
}
