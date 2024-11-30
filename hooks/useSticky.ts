'use client';

import { useEffect, useState } from 'react';

const useSticky = (threshold: number = 200): boolean => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > threshold) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return sticky;
};

export default useSticky;
