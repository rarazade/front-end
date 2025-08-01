import { useState } from "react";
import { Link } from "react-router-dom";
import newsData from "../data/newsData";

export default function SectionNews() {
  const [visibleItems, setVisibleItems] = useState(4);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  return (
    <section className="bg-[#292F36] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#4ECDC4] mb-8">Latest News</h2>

        {/* Berita utama */}
        <div className="mb-12">
          <img
            src={newsData[0].image}
            alt={newsData[0].title}
            className="w-full h-[400px] object-cover rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold mb-2">{newsData[0].title}</h3>
          <p className="mb-2 text-sm text-gray-300">{newsData[0].date}</p>
          <p className="mb-4">{newsData[0].excerpt}</p>
          <Link
            to={`/news/${newsData[0].id}`}
            className="text-[#4ECDC4] underline hover:text-white"
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
                  {item.source}
                  <span className="text-gray-400 ml-2">{item.date}</span>
                </p>
                <p className="text-sm mt-3">{item.excerpt}</p>
                <p className="text-sm mt-2 text-gray-400">{item.fullText}</p>
                <Link
                  to={`/news/${item.id}`}
                  className="text-[#4ECDC4] text-sm underline hover:text-white mt-2 inline-block"
                >
                  Read More
                </Link>
              </div>

              {/* Image section */}
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full md:w-64 rounded"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Load More */}
        {visibleItems + 1 < newsData.length && (
          <div className="text-center mt-16">
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
