import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";

export default function NewsDetail() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/news/${id}`);
        if (!res.ok) throw new Error("News not found");
        const data = await res.json();
        setNewsItem(data);
      } catch (error) {
        setNewsItem(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/news");
        const allNews = await res.json();
        const latest = allNews
          .filter((n) => n.id !== parseInt(id))
          .slice(0, 3);
        setLatestNews(latest);
      } catch (err) {
        setLatestNews([]);
      }
    };

    fetchNewsDetail();
    fetchLatestNews();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-black text-white py-20 text-center">
          <p className="text-2xl">Loading...</p>
        </div>
      </>
    );
  }

  if (!newsItem) {
    return (
      <>
        <Navbar />
        <div className="bg-black text-white py-20 text-center">
          <p className="text-2xl">News not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#292F36] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:flex gap-8">
          {/* LEFT CONTENT */}
          <div className="md:w-2/3 mt-10">
            <h2 className="text-2xl font-bold mb-2">{newsItem.title}</h2>
            <p className="text-sm text-[#4ECDC4] mb-4">
              {newsItem.source || "WGG Studio"} — {newsItem.date}
            </p>

            <p className="text-sm text-gray-300 border-b border-[#4ECDC4] pb-2">
              {newsItem.excerpt}
            </p>

            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="mt-6 rounded w-full"
            />

            <div className="mt-4 text-sm text-gray-300 space-y-3 leading-relaxed">
              <p>{newsItem.fullText || newsItem.content}</p>
            </div>

            <Link to="/news">
              <button className="mt-10 bg-[#4ECDC4] text-black font-semibold px-4 py-2 rounded mb-6 text-sm hover:bg-[#3dc0b9]">
                &lt; BACK TO ALL NEWS
              </button>
            </Link>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="md:w-1/3 mt-20 md:mt-15">
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
    </>
  );
}
