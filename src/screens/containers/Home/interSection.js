import { useState, useEffect } from "react";

const useIntersection = (element, rootMargin, currTab) => {
  const [isVisible, setState] = useState(false);
  useEffect(() => {
    ////console.log(currTab);

    ////console.log(element.current);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    element.current && observer.observe(element.current);

    if (element.current) return () => observer.unobserve(element.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isVisible;
};

export default useIntersection;
