'use client';

import Header from '@/components/common/Header';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const EarlyInflyncer = () => {
  const router = useRouter();
  const { context } = useMiniKit();

  useEffect(() => {
    if (context?.user.fid) {
      router.push(`/profile/${context?.user.fid}?tab=nft`);
    }
  }, [context?.user.fid]);

  return (
    <Box width="100%" height="auto" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Header showAvatar />
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Typography sx={{ color: 'text.secondary' }}>
          Redirecting to Early Inflyncer NFT mint page...
        </Typography>
      </Box>
    </Box>
  );
};

export default EarlyInflyncer;
