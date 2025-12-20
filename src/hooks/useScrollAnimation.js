import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook để thêm scroll animation cho các phần tử
 * Khi phần tử vào viewport, sẽ fade in và slide up
 */
export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Thêm delay nếu có
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }

            // Nếu triggerOnce = true, disconnect sau khi đã trigger
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  // Animation styles
  const animationStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  };

  return { elementRef, isVisible, animationStyles };
}

