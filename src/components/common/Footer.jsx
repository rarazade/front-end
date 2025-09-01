export default function Footer() {
  return (
    <footer className="bg-[#292F36] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#4ECDC4] mb-4">WGG</h2>
          <p className="text-sm leading-relaxed">
            We are a creative game development studio focusing on delivering
            innovative and engaging experiences for players across the globe.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-[#4ECDC4]">About Us</a></li>
            <li><a href="/games" className="hover:text-[#4ECDC4]">Games</a></li>
            <li><a href="/careers" className="hover:text-[#4ECDC4]">Careers</a></li>
            <li><a href="/contact" className="hover:text-[#4ECDC4]">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/blog" className="hover:text-[#4ECDC4]">Blog</a></li>
            <li><a href="/faq" className="hover:text-[#4ECDC4]">FAQ</a></li>
            <li><a href="/support" className="hover:text-[#4ECDC4]">Support</a></li>
            <li><a href="/privacy" className="hover:text-[#4ECDC4]">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#4ECDC4]">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-[#4ECDC4]">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-[#4ECDC4]">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-[#4ECDC4]">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-[#292F36] pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} WGG Studio. All Rights Reserved.
      </div>
    </footer>
  );
}
