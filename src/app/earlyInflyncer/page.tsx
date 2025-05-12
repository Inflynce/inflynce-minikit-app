import { Metadata } from 'next';
const BASE_URL = process.env.NEXT_PUBLIC_URL;
import { Box, Typography } from '@mui/material';
import EarlyInflyncer from '@/sections/earlyInflyncer';

export async function generateMetadata({ params }: { params: { fid: string } }): Promise<Metadata> {
  const frame = {
    version: 'next',
    imageUrl: `${BASE_URL}/earlyInflyncer/opengraph-image`,
    button: {
      title: 'Mint Your Early Inflyncer NFT 🚀',
      action: {
        type: 'launch_frame',
        name: 'Inflynce',
        url: `${BASE_URL}/earlyInflyncer`,
        splashImageUrl: `${BASE_URL}/logo.png`,
        splashBackgroundColor: '#fdf0dd',
      },
    },
  };

  return {
    title: 'Inflynce - Early Inflyncer',
    openGraph: {
      title: 'Inflynce - Early Inflyncer',
      description: 'Your social influence, on-chain.',
    },
    other: {
      'fc:frame': JSON.stringify(frame),
    },
  };
}

export default async function Page() {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >
      <EarlyInflyncer />
    </Box>
  );
}
