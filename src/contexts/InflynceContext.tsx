import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { generateNonce } from '@/utils/auth';

export type TokenPayload = {
  exp: number;
  fid: string;
  address?: string;
};

const LOCAL_STORAGE_KEY = 'inflynce-token';

type AuthContextType = {
  token: string | null;
  user: TokenPayload | null;
  getToken: () => Promise<string>;
};

const InflynceAuthContext = createContext<AuthContextType | undefined>(undefined);

export const InflynceAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userPayload, setUserPayload] = useState<TokenPayload | null>(null);
  const { signIn: signInToFrame } = useAuthenticate(process.env.NEXT_PUBLIC_URL || '');

  useEffect(() => {
    const initToken = async () => {
      const freshToken = await refreshToken();
      if (freshToken) {
        setAccessToken(freshToken);
      } else {
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedToken && !isTokenExpired(storedToken)) {
          setAccessToken(storedToken);
          const decoded = decodeToken(storedToken);
          if (decoded) setUserPayload(decoded);
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    };
    initToken();
  }, []);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  };

  const decodeToken = (token: string): TokenPayload | null => {
    try {
      return jwtDecode<TokenPayload>(token);
    } catch (err) {
      return null;
    }
  };

  const refreshToken = useCallback(async (): Promise<string | null> => {
    const nonce = generateNonce();
    const result = await signInToFrame({ nonce });

    if (!result) {
      console.error('Farcaster sign-in failed');
      return null;
    }

    const response = await fetch('/api/auth/farcaster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: result.message,
        signature: result.signature,
        nonce,
      }),
    });

    const data = await response.json();
    if (!data.token) {
      console.error('JWT not received from backend');
      return null;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, data.token);
    const decoded = decodeToken(data.token);
    if (decoded) setUserPayload(decoded);
    return data.token;
  }, []);

  const getToken = useCallback(async () => {
    if (accessToken && !isTokenExpired(accessToken)) {
      return accessToken;
    }
    const freshToken = await refreshToken();
    if (freshToken) {
      setAccessToken(freshToken);
      return freshToken;
    }
    throw new Error('Unable to get valid token');
  }, [accessToken]);

  return (
    <InflynceAuthContext.Provider value={{ token: accessToken, user: userPayload, getToken }}>
      {children}
    </InflynceAuthContext.Provider>
  );
};

export const useInflynceAuth = () => {
  const context = useContext(InflynceAuthContext);
  if (!context) throw new Error('useInflynceAuth must be used within InflynceAuthProvider');
  return context;
};
