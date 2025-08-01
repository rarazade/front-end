import { useParams, Link } from "react-router-dom";
import newsData from "../data/newsData";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function NewsDetail() {
  const { id } = useParams();
  const newsItem = newsData.find((item) => item.id === parseInt(id));

  const latestNews = newsData
    .filter((item) => item.id !== parseInt(id))
    .slice(0, 3);

  if (!newsItem) {
    return (
      <>
        <Navbar />
        <div className="bg-black text-white py-20 text-center">
          <p className="text-2xl">News not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#292F36] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:flex gap-8">
          {/* LEFT CONTENT */}
          <div className="md:w-2/3">
            <Link to="/news">
              <button className="bg-[#4ECDC4] text-black font-semibold px-4 py-2 rounded mb-6 text-sm hover:bg-[#3dc0b9]">
                &lt; BACK TO ALL NEWS
              </button>
            </Link>

            <h2 className="text-2xl font-bold mb-2">{newsItem.title}</h2>
            <p className="text-sm text-[#4ECDC4] mb-4">
              {newsItem.source || "WGG Studio"} — {newsItem.date}
            </p>

            <p className="text-sm text-gray-300 border-b border-[#4ECDC4] pb-2">
              {newsItem.excerpt}
            </p>

            <div className="mt-4 text-sm text-gray-300 space-y-3 leading-relaxed">
              <p>{newsItem.fullText || newsItem.content}</p>
            </div>

            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="mt-6 rounded w-full"
            />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="md:w-1/3 mt-10 md:mt-0">
            <h3 className="text-lg font-bold text-[#4ECDC4] mb-4">LATEST NEWS</h3>
            {latestNews.map((news) => (
              <Link to={`/news/${news.id}`} key={news.id}>
                <div className="mb-6 border-b border-[#4ECDC4] pb-3 hover:text-[#4ECDC4] transition">
                  <p className="text-sm font-medium">{news.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{news.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
