import AboutSection from "../component/AboutSection";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function About() {
  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen">
      <Navbar />
      <AboutSection />
      <Footer />
    </div>
  );
}
