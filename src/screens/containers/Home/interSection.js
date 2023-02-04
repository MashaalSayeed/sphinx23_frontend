import { useState, useEffect } from "react";

const useIntersection = (element, rootMargin, currTab) => {
  const [isVisible, setState] = useState(false);
  useEffect(() => {
    console.log(currTab);
    try {
      console.log(element.current);
      if (element.current != null) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setState(entry.isIntersecting);
          },
          { rootMargin }
        );

        element.current && observer.observe(element.current);

        if (element.current) return () => observer.unobserve(element.current);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isVisible;
};

export default useIntersection;
