import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1, pageId?: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Reset visibility when page changes
  useEffect(() => {
    if (pageId) {
      setIsVisible(false);
    }
  }, [pageId]);

  return { ref, isVisible };
}; 