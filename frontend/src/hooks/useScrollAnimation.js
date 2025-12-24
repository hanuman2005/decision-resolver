import { useRef, useEffect, useState } from "react";

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * Elements animate when they come into view while scrolling
 * Also works for elements already visible on page load
 */
export const useScrollAnimation = (options = {}, debugName = "") => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (debugName)
            console.log(`✅ Scroll animation triggered for: ${debugName}`);
        }
      },
      {
        threshold: 0.05, // Trigger when 5% of element is visible
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before element fully enters viewport
        ...options,
      }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (ref.current) {
        observer.observe(ref.current);
        if (debugName) console.log(`🔍 Started observing: ${debugName}`);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [debugName]);

  return { ref, isVisible };
};

export default useScrollAnimation;
