import { Metadata } from 'next';
const BASE_URL = process.env.NEXT_PUBLIC_URL;
import { Box, Typography } from '@mui/material';

export async function generateMetadata({
  params,
}: {
  params: { boostId: string };
}): Promise<Metadata> {
  const { boostId } = await params;

  const frame = {
    version: 'next',
    imageUrl: `${BASE_URL}/hub/boost/${boostId}/opengraph-image`,
    button: {
      title: 'Tap, share and earn 🚀',
      action: {
        type: 'launch_frame',
        name: 'Inflynce',
        url: `${BASE_URL}/hub`,
        splashImageUrl: `${BASE_URL}/logo.png`,
        splashBackgroundColor: '#fdf0dd',
      },
    },
  };

  return {
    title: 'Inflynce Hub - Boost',
    openGraph: {
      title: 'Inflynce Hub - Boost',
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
        padding: '20px',
      }}
    >
      <Typography variant="h3">No Content</Typography>
    </Box>
  );
}
