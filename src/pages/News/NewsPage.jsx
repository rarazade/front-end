import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useNews from "../../hooks/news/useNews";
import React from "react";

const NewsCard = React.memo(function NewsCard({ item, idx, scrollToTop }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      viewport={{ once: false, amount: 0.2 }}
      className="overflow-hidden shadow-xl flex flex-col text-black bg-orange-100/70 border-2 backdrop-blur-md group"
    >
      <div className="h-56 w-full overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${item.image}`}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
        <p className="text-sm text-black">
          {item.source || "WGG Studio"}{" "}
          <span className="text-gray-700 ml-2">
            {item.createdAt ? item.createdAt.slice(0, 10) : ""}
          </span>
        </p>
        <p className="text-sm text-gray-900 mt-3 flex-grow">{item.excerpt}</p>
        <Link
          to={`/news/${item.id}`}
          className="mt-4 text-black font-semibold hover:text-[#4ECDC4] transition"
          onClick={scrollToTop}
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
});

export default function NewsPage() {
  const { news, loading } = useNews();
  const [visibleItems, setVisibleItems] = useState(4);

  const handleLoadMore = useCallback(() => {
    setVisibleItems((prev) => prev + 4);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // taruh di sini (selalu dipanggil, walau news kosong / loading)
  const newsList = useMemo(() => {
    if (!news || news.length === 0) return [];
    return news
      .slice(1, visibleItems + 1)
      .map((item, idx) => (
        <NewsCard
          key={item.id}
          item={item}
          idx={idx}
          scrollToTop={scrollToTop}
        />
      ));
  }, [news, visibleItems, scrollToTop]);

  if (loading) {
    return (
      <section className="bg-white text-black py-16 px-6">
        <div className="max-w-6xl mx-auto text-center text-lg">
          Loading news...
        </div>
      </section>
    );
  }

  if (!news || news.length === 0) {
    return (
      <section className="bg-white text-black py-16 px-6">
        <div className="max-w-6xl mx-auto text-center text-lg">
          No news available.
        </div>
      </section>
    );
  }


  return (
    <section className="bg-orange-100 relative py-16 px-9 min-h-screen bg-no-repeat bg-cover bg-center">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-4xl font-bold text-black mt-10 mb-5 border-b border-gray-700 pb-4"
        >
          Latest News
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative mb-20 overflow-hidden shadow-xl group"
        >
          <motion.img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${news[0].image}`}
            alt={news[0].title}
            className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-110"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-100/40 via-orange-100/10 to-transparent"></div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute bottom-0 p-6 text-[#4ECDC4] text-lg"
          >
            <p className="text-sm text-gray-700  mb-1">
              {news[0].createdAt ? news[0].createdAt.slice(0, 10) : ""}
            </p>
            <h3 className="text-3xl text-black font-bold mb-3">{news[0].title}</h3>
            <p className="text-gray-700 max-w-3xl mb-4">{news[0].excerpt}</p>
            <Link
              to={`/news/${news[0].id}`}
              className="inline-block bg-[#4ECDC4] text-[#292F36] px-6 py-2 rounded-lg font-semibold hover:bg-[#3dc0b9] transition"
              onClick={scrollToTop}
            >
              Read More →
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{newsList}</div>

        {visibleItems + 1 < news.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-[#4ECDC4] text-[#292F36] font-bold px-6 py-3 rounded-lg shadow hover:bg-[#3dc0b9] transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
