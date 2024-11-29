import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
function ScrollToTop() {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const handleScroll = () => {
    setIsScroll(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScrollReset = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  return (
    <div>
      {isScroll && (
        <div className="fixed bottom-4 right-4 z-50">
          <button onClick={handleScrollReset} className="p-4">
            <ArrowUp className="h-8 w-8 hover:scale-110 transition duration-500 ease-in-out rounded-full bg-black text-white hover:bg-slate-800" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ScrollToTop;
