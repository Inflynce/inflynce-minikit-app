import { Metadata } from 'next';
const BASE_URL = process.env.NEXT_PUBLIC_URL;
import { Box, Typography } from '@mui/material';

export async function generateMetadata({ params }: { params: { fid: string } }): Promise<Metadata> {
  const { fid } = await params;

  const frame = {
    version: 'next',
    imageUrl: `${BASE_URL}/rank/${fid}/opengraph-image`,
    button: {
      title: 'Check out your rank on Inflynce',
      action: {
        type: 'launch_frame',
        name: 'Inflynce',
        url: `${BASE_URL}/rewards`,
        splashImageUrl: `${BASE_URL}/logo.png`,
        splashBackgroundColor: '#fdf0dd',
      },
    },
  };

  return {
    title: 'Inflynce',
    openGraph: {
      title: 'Inflynce',
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
