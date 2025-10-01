import React, { useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import useAbout from "../hooks/about/useAbout";

const TeamMemberCard = React.memo(function TeamMemberCard({ tm }) {
  return (
    <div className="px-4">
      <div className="bg-white shadow-md hover:shadow-xl overflow-hidden transition">
        <img
          src={
            tm.photo
              ? `${import.meta.env.VITE_UPLOADS_BASE_URL}/${tm.photo}`
              : "/default-avatar.png"
          }
          alt={tm.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{tm.name}</h3>
          <p className="text-gray-500 text-sm mb-4">{tm.role}</p>
          <div className="flex justify-center space-x-4">
            {tm.linkedin && (
              <a
                href={tm.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                LinkedIn
              </a>
            )}
            {tm.github && (
              <a
                href={tm.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-black font-medium"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function AboutPage() {
  const { about, loading, error } = useAbout();
  const scrollRef = useRef(null);

  // ✅ Hooks harus selalu dipanggil sebelum return
  const banner = useMemo(
    () => about?.images?.find((img) => img.type === "BANNER"),
    [about]
  );
  const dokumentasi = useMemo(
    () => about?.images?.filter((img) => img.type === "DOKUMENTASI"),
    [about]
  );
  const lampiran = useMemo(
    () => about?.images?.filter((img) => img.type === "LAMPIRAN"),
    [about]
  );

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  }, []);
  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className="bg-white text-black relative">
      {banner && (
        <section
          className="relative h-[100vh] flex items-center justify-center bg-cover opacity-90"
          style={{
            backgroundImage: `url("${import.meta.env.VITE_API_BASE_URL}/uploads/${banner.url}")`,
          }}
        >
          <div className="absolute inset-0 bg-[#292F36]/20" />
          <motion.div
            className="relative z-10 text-center px-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {about.title}
            </h2>
            <h2 className="text-xl text-gray-200 italic">{about.tagline}</h2>
          </motion.div>
        </section>
      )}

      <section className="relative py-16 m-10 overflow-hidden">
        <div className="max-w-6xl mx-auto text-justify space-y-10 relative z-10">
          <h2 className="text-3xl text-center md:text-5xl font-bold">
            {about.title}
          </h2>
          <p className="text-lg leading-relaxed">{about.description}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 flex justify-center">
        <div className="relative w-full max-w-3xl">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-400 via-gray-300 to-pink-500"></div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mb-16 flex justify-start w-full"
          >
            <div className="relative w-1/2 pr-10 text-right">
              <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: about.vision }}
              />
              <span className="absolute top-2 right-[-18px] w-6 h-6 bg-teal-400 rounded-full shadow-lg"></span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mb-16 flex justify-end w-full"
          >
            <div className="relative w-1/2 pl-10 text-left">
              <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: about.mission }}
              />
              <span className="absolute top-2 left-[-18px] w-6 h-6 bg-pink-400 rounded-full shadow-lg"></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#292F36"
            fillOpacity="1"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,197.3C960,224,1056,256,1152,256C1248,256,1344,224,1392,208L1440,192L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Team Section */}
      {about.teamMembers?.length > 0 && (
        <section className="bg-[#292F36] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">
              Our Team
            </h2>
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 640, settings: { slidesToShow: 1 } },
              ]}
            >
              {about.teamMembers.map((tm) => (
                <TeamMemberCard key={tm.id} tm={tm} />
              ))}
            </Slider>
          </div>
        </section>
      )}
    </div>
  );
}
