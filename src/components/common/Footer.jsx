import { FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="bg-[#4ECDC4] text-[#292F36]">
      

      {/* Footer Bottom Bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-sm">© 2025 Your Company. All rights reserved.</p>
        <div className="flex gap-3 text-xl">
          <a href="#" className="hover:text-blue-600">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-black">
            <FaXTwitter />
          </a>
          <a href="#" className="hover:text-red-600">
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
}