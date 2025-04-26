'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

interface FarcasterContextType {
  isLoaded: boolean;
}

const FarcasterContext = createContext<FarcasterContextType>({
  isLoaded: false,
});

export const FarcasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }

    const loadContext = async () => {
      if (context) {
        setIsLoaded(true);
      }
    };

    loadContext();
  }, [setFrameReady, isFrameReady, context]);

  return <FarcasterContext.Provider value={{ isLoaded }}>{children}</FarcasterContext.Provider>;
};

export const useFarcaster = () => useContext(FarcasterContext);
