import { useEffect } from "react";

const usePreventScroll = () => {
  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.overflowY = "scroll";
    document.body.classList.add("modal");
    return currentScrollY;
  };

  const allowScroll = (prevScrollY: number) => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    document.body.classList.remove("modal");
    window.scrollTo(0, prevScrollY);
  };
  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);
};

export default usePreventScroll;
