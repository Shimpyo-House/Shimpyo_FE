import { useEffect } from 'react';

const useObs = (
  obsHandler: (entries: IntersectionObserverEntry[]) => Promise<void>,
  obsRef: React.MutableRefObject<null>,
) => {
  useEffect(() => {
    const io = new IntersectionObserver(obsHandler, {
      threshold: 1,
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
