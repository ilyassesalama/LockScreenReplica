import { useEffect } from 'react';
import NoSleep from 'nosleep.js';

const useNoSleep = () => {
  useEffect(() => {
    const noSleep = new NoSleep();

    const enableNoSleep = () => {
      noSleep.enable();
    };

    document.addEventListener('keypress', enableNoSleep);

    return () => {
      noSleep.disable();
      document.removeEventListener('keypress', enableNoSleep);
    };
  }, []);
};

export default useNoSleep;
