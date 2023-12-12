import { useEffect } from 'react';

const useObs = (
  obsHandler: (entries: IntersectionObserverEntry[]) => Promise<void>,
  obsRef: React.MutableRefObject<null>,
) => {
  useEffect(() => {
    const io = new IntersectionObserver(obsHandler, {
      threshold: 0.3,
      rootMargin: '500px',
    });
    if (obsRef.current) {
      io.observe(obsRef.current);
    }
    return () => {
      io.disconnect();
    };
  }, []);
};

export default useObs;
