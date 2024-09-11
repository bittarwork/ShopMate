import React, { useEffect, useRef } from "react";

const ScrollTop = () => {
  const scrollTopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        scrollTopRef.current.classList.remove("hidden");
      } else {
        scrollTopRef.current.classList.add("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <button
        ref={scrollTopRef}
        className="hidden w-[48px] h-[48px] bg-[#B8BFEF] text-white text-[22px] items-center justify-center fixed bottom-8 right-10 rounded-[8px] hover:bg-[#97a2e7] transition ease-in-out duration-[0.45s]"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-angle-up"></i>
      </button>
    </div>
  );
};

export default ScrollTop;
