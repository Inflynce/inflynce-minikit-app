'use client';

import { type ReactNode } from 'react';
import { base } from 'wagmi/chains';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import { FarcasterProvider } from '@/contexts/FarcasterContext';
import { PrivyProvider } from '@privy-io/react-auth';

export function Providers(props: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || ''}
      config={{
        loginMethods: ['farcaster'],
      }}
    >
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        notificationProxyUrl="/api/notification"
        config={{
          appearance: {
            mode: 'auto',
            theme: 'mini-app-theme',
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
            logo: process.env.NEXT_PUBLIC_ICON_URL,
          },
        }}
      >
        <FarcasterProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>{props.children}</SnackbarProvider>
          </ThemeProvider>
        </FarcasterProvider>
      </MiniKitProvider>
    </PrivyProvider>
  );
}
