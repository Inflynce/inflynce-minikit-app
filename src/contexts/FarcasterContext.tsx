'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Context } from '@farcaster/frame-sdk';
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

    if (context) {
      setIsLoaded(true);
    }
  }, [setFrameReady, isFrameReady, context]);

  return <FarcasterContext.Provider value={{ isLoaded }}>{children}</FarcasterContext.Provider>;
};

export const useFarcaster = () => useContext(FarcasterContext);
