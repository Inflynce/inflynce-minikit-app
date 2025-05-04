import { Reward } from '@/sections/reward';
import { Metadata } from 'next';
const BASE_URL = process.env.NEXT_PUBLIC_URL;

export async function generateMetadata(): Promise<Metadata> {
  const frame = {
    version: 'next',
    imageUrl: `${BASE_URL}/rewards/opengraph-image`,
    button: {
      title: 'Leaderboard on Inflynce',
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
export default function RewardPage() {
  return <Reward />;
}
