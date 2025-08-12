import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/games/${id}`);
        if (!res.ok) throw new Error("Game not found");
        const data = await res.json();

        // Pastikan systemRequirements berbentuk array, parse jika string
        if (typeof data.systemRequirements === "string") {
          try {
            data.systemRequirements = JSON.parse(data.systemRequirements);
          } catch {
            data.systemRequirements = [];
          }
        }

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

  const minReq = game.requirements?.find(r => r.type === "minimum") || {};
  const recReq = game.requirements?.find(r => r.type === "recommended") || {};

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

        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#4ECDC4]">
            About this game
          </h2>
          <p className="text-gray-300">{game.description}</p>
        </div>

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

        {/* System Requirements dari backend */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#4ECDC4]">
            System Requirements
          </h3>

          {/* Minimum */}
          <h4 className="mt-2 font-semibold text-white">Minimum</h4>
          <ul className="text-sm text-gray-400 list-disc list-inside">
            <li>OS: {minReq.os || "-"}</li>
            <li>RAM: {minReq.memory || "-"}</li>
            <li>Processor: {minReq.processor || "-"}</li>
            <li>GPU: {minReq.graphics || "-"}</li>
            <li>Storage: {minReq.storage || "-"}</li>
          </ul>

          {/* Recommended */}
          <h4 className="mt-4 font-semibold text-white">Recommended</h4>
          <ul className="text-sm text-gray-400 list-disc list-inside">
            <li>OS: {recReq.os || "-"}</li>
            <li>RAM: {recReq.memory || "-"}</li>
            <li>Processor: {recReq.processor || "-"}</li>
            <li>GPU: {recReq.graphics || "-"}</li>
            <li>Storage: {recReq.storage || "-"}</li>
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
