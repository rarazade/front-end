import { useEffect, useState } from 'react';
import { ArrowUp } from "lucide-react";


export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <button
  onClick={scrollToTop}
  className="fixed bottom-6 right-6 z-50 bg-[#4ECDC4] text-[#292F36] p-3 rounded-full shadow-lg hover:bg-[#38bdb1] transition duration-300"
  aria-label="Back to top"
>
  <ArrowUp size={20} />
</button>

    )
  );
}
