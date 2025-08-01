import { Link } from "react-router-dom";
import gameImg1 from "../assets/Draft_Design3.webp";
import gameImg2 from "../assets/placeholder.jpg";
import { gamesData } from "../data/gamesData";

export default function GameSection() {
  const filterGame = () => {
    
  }
  const games = [
    {
      type: "PC Games By WGG",
      games: [
        {
          id: 1,
          title: "Cyber Force",
          img: gameImg1,
        },
        {
          id: 2,
          title: "Mystery Puzzle",
          img: gameImg2,
        },
      ],
    },
    {
      type: "Mobile Games By WGG",
      games: [
        {
          id: 3,
          title: "Ghost Hunter",
          img: gameImg1,
        },
        {
          id: 4,
          title: "Jungle Adventure",
          img: gameImg2,
        },
      ],
    },
  ];

  return (
   <section className="bg-[#292F36] text-white py-20 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
    {games.map((section, idx) => (
      <div key={idx} className="text-center">
        <h2 className="text-3xl font-bold text-[#4ECDC4] mb-8">
          {section.type}
        </h2>

        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          {section.games.map((game) => (
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
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">
                  {game.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Tombol Explore More untuk masing-masing kategori */}
        {section.type.includes("PC") && (
          <Link to="/games/platform/PC">
            <button className="bg-[#4ECDC4] text-[#292F36] font-semibold px-6 py-2 rounded hover:bg-[#3dc0b9] transition">
              Explore More PC Games
            </button>
          </Link>
        )}
        {section.type.includes("Mobile") && (
          <Link to="/games/platform/Mobile">
            <button className="bg-[#4ECDC4] text-[#292F36] font-semibold px-6 py-2 rounded hover:bg-[#3dc0b9] transition">
              Explore More Mobile Games
            </button>
          </Link>
        )}
      </div>
    ))}
  </div>
</section>

  );
}
