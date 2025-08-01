import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#292F36] text-[#4ECDC4] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#FF8000]">
          <Link to="/">WGG</Link>
        </div>
        <ul className="flex gap-6 font-semibold">
          <li>
            <Link to="/" className="hover:text-[#FF8000]">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-[#FF8000]">
              About
            </Link>
          </li>
          <li>
            <Link to="/games" className="hover:text-[#FF8000]">
              Games
            </Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-[#FF8000]">
              News
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
