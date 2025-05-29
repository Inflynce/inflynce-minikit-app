import frameSdk from '@farcaster/frame-sdk';
import { useLoginToFrame } from '@privy-io/react-auth/farcaster';

/**
 * Handles Farcaster login flow using Privy and Frame SDK
 * @param initLoginToFrame - Function from useLoginToFrame hook to initialize login
 * @param loginToFrame - Function from useLoginToFrame hook to complete login
 * @returns Promise that resolves when login is complete
 */
export const handleFarcasterLogin = async (
  initLoginToFrame: ReturnType<typeof useLoginToFrame>['initLoginToFrame'],
  loginToFrame: ReturnType<typeof useLoginToFrame>['loginToFrame']
): Promise<void> => {
  try {
    // Initialize a new login attempt to get a nonce for the Farcaster wallet to sign
    const { nonce } = await initLoginToFrame();

    // Request a signature from Warpcast
    const result = await frameSdk.actions.signIn({ nonce: nonce });

    // Send the received signature from Warpcast to Privy for authentication
    await loginToFrame({
      message: result.message,
      signature: result.signature,
    });
  } catch (error) {
    console.error('Farcaster login failed:', error);
    throw error;
  }
};

export const generateNonce = () => {
  return [...Array(8)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
};
