import { useState, useEffect } from "react";

const useIntersection = (element, rootMargin) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    try {
      if (element.current != null) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setState(entry.isIntersecting);
          },
          { rootMargin }
        );

        element.current && observer.observe(element.current);

        try {
          return () => observer.unobserve(element.current);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {}
  }, []);

  return isVisible;
};

export default useIntersection;
