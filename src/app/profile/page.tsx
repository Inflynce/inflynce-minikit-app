'use client';

import sdk, { type Context } from '@farcaster/frame-sdk';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();

      //   router.push(`/profile/${context?.user?.fid}`);
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    router.push(`/profile/${context?.user?.fid}`);
  }, [context]);

  return null;
}
