import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SectionNews() {
  const [newsData, setNewsData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/news");
        const data = await res.json();
        setNewsData(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="bg-[#292F36] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center text-lg">Loading news...</div>
      </section>
    );
  }

  if (newsData.length === 0) {
    return (
      <section className="bg-[#292F36] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center text-lg">No news available.</div>
      </section>
    );
  }

  return (
    <section className="bg-[#292F36] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="mt-10 text-4xl font-bold text-[#4ECDC4] mb-8">Latest News</h2>

        {/* Berita utama */}
        <div className="mb-12 bg-[#292F36] p-6 rounded-2xl border border-gray-600 shadow-xl transition">
          <div className="mt-6 w-full h-[400px] rounded overflow-hidden">
          <img
            src={`http://localhost:3000/uploads/${newsData[0].image}`}
            alt={newsData[0].title}
            className="w-full h-[400px] object-cover rounded-lg mb-4"
          />
          </div>

          <h3 className="text-2xl font-bold mb-2">{newsData[0].title}</h3>
          <p className="mb-2 text-sm text-gray-300">
            {newsData[0].createdAt ? newsData[0].createdAt.slice(0, 10) : ""}
          </p>
          <p className="mb-4">{newsData[0].excerpt}</p>
          <Link
            to={`/news/${newsData[0].id}`}
            className="text-[#4ECDC4] underline hover:text-white"
            onClick={scrollToTop}
          >
            Read More →
          </Link>
        </div>

        {/* List berita lainnya */}
        <div className="space-y-10">
          {newsData.slice(1, visibleItems + 1).map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 border-b border-gray-700 pb-6"
            >
              {/* Text section */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-cyan-400">
                  {item.source || "WGG Studio"}
                  <span className="text-gray-400 ml-2">
                    {item.createdAt ? item.createdAt.slice(0, 10) : ""}
                  </span>
                </p>
                <p className="text-sm mt-3">{item.excerpt}</p>
                <p className="text-sm mt-2 text-gray-400">{item.fullText}</p>
                <Link
                  to={`/news/${item.id}`}
                  className="text-[#4ECDC4] text-sm underline hover:text-white mt-2 inline-block"
                  onClick={scrollToTop}
                >
                  Read More
                </Link>
              </div>

              {/* Image section */}
              <div className="flex-shrink-0 mt-6 w-[260] h-[200px] rounded overflow-hidden">
                <img
                  src={`http://localhost:3000/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

              </div>
            </div>
          ))}
        </div>

        {/* Tombol Load More */}
        {visibleItems + 1 < newsData.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-[#4ECDC4] text-[#292F36] font-bold px-6 py-3 rounded hover:bg-[#3dc0b9] transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
