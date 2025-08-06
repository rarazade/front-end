import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [activeTab, setActiveTab] = useState("games");
  const [games, setGames] = useState([]);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/admin/login");
    setAdminData({ username: "admin" });

    // Fetch all data
    const fetchData = async () => {
      try {
        // const catRes = await fetch("http://localhost:3000/api/categories")
        const [gameRes, catRes] = await Promise.all([
          fetch("http://localhost:3000/api/games"),
          fetch("http://localhost:3000/api/categories"),
          // fetch("http://localhost:3000/api/news"),
        ]);
        const gameData = await gameRes.json();
        // const newsData = await newsRes.json();
        const catData = await catRes.json();
        
        
        setGames(gameData);
        // setNews(newsData);
        setCategories(catData);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const renderTable = (items, type) => (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold capitalize">{type} List</h2>
        <Link
          to={`/admin/add-${type === "games" ? "game" : type === "news" ? "news" : "category"}`}
          className="bg-[#4ECDC4] text-black px-4 py-2 rounded hover:bg-[#3fb8b3]"
        >
          + Add {type.slice(0, 1).toUpperCase() + type.slice(1)}
        </Link>
      </div>
      <table className="w-full table-auto bg-[#292F36] rounded text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="p-2">#</th>
            <th className="p-2">Title / Name</th>
            {type === "games" && <th className="p-2">Platform</th>}
            {type === "news" && <th className="p-2">Date</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id} className="border-b border-gray-700">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">{item.title || item.name}</td>
              {type === "games" && <td className="p-2">{item.platforms}</td>}
              {type === "news" && <td className="p-2">{item.date}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1f242b] text-white p-8 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4 border-b border-gray-600">
        {["games", "news", "categories"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-[#4ECDC4] text-[#4ECDC4]" : "text-gray-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Section */}
      {activeTab === "games" && renderTable(games, "games")}
      {activeTab === "news" && renderTable(news, "news")}
      {activeTab === "categories" && renderTable(categories, "categories")}
    </div>
  );
};

export default AdminDashboard;
