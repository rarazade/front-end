import draftImage from "../assets/Draft_Design3.webp";

export default function AboutSection() {
  return (
    <section className="bg-[#292f36] text-[#4ECDC4] px-8 py-20 text-center">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 tracking-wide">About</h2>
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-widest text-[#FF8000]">WGG</h1>
      </div>

      <div className="max-w-6xl mx-auto text-lg md:text-xl leading-relaxed text-[#4ECDC4] space-y-8 mb-16">
        <p>
          WGG Studio adalah studio pengembang game yang hadir untuk menciptakan pengalaman bermain
          yang imajinatif dan inovatif. Kami memadukan seni, teknologi, dan cerita untuk
          menghadirkan dunia permainan yang unik dan menarik.
        </p>
        <p>
          Tim kami terdiri dari para profesional kreatif—developer, artist, dan storyteller—yang
          berdedikasi untuk menghidupkan dunia digital melalui game. Kami percaya bahwa setiap game
          adalah jembatan untuk menyampaikan ide, emosi, dan tantangan yang membangun koneksi
          antarpemain.
        </p>
        <p>
          Dengan semangat eksplorasi, kami juga aktif dalam mengembangkan game berbasis teknologi
          terkini seperti AR/VR dan AI. WGG Studio terus tumbuh bersama komunitas dan terbuka untuk
          kolaborasi di masa depan.
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src={draftImage}
          alt="Tentang WGG Studio"
          className="w-full max-w-5xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        />
      </div>

      
    </section>
  );
}
