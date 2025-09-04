import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useNews from "../../hooks/news/useNews";

export default function NewsSection() {
  const { news } = useNews();

  const mainNews = news[0] || {};
  const rightNews = news.slice(1, 6);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative text-white flex items-center">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl font-extrabold text-[#4ECDC4] text-center tracking-wide"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          NEWS
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 items-start">
          {/* Main News */}
          {mainNews?.image && (
            <motion.div
              className="lg:col-span-2"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div
                className="relative overflow-hidden shadow-lg group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${mainNews.image}`}
                  alt={mainNews.title}
                  className="w-full mt-4 h-[420px] object-cover transform group-hover:scale-105 transition duration-500"
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    {mainNews.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-2">{mainNews.excerpt}</p>
                  <Link
                    to={`/news/${mainNews.id}`}
                    className="inline-block mt-4 bg-[#4ECDC4] text-black font-semibold px-5 py-2 rounded-lg hover:bg-[#3bb3aa] transition"
                  >
                    Read More →
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Right News List */}
          <motion.div
            className="flex flex-col gap-4 max-h-[450px] overflow-y-auto pr-2 
            scrollbar-thin scrollbar-thumb-[#4ECDC4]/60 scrollbar-track-transparent"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {rightNews.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUpVariant}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to={`/news/${item.id}`}
                  className="flex gap-4 items-center bg-[#252B31] shadow hover:bg-[#30383F] transition p-3"
                >
                  <motion.img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${item.image}`}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[#4ECDC4] leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
