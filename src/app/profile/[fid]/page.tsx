import Profile from '@/sections/profile';
import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
const BASE_URL = process.env.NEXT_PUBLIC_URL;
import { GetMindshareByFidQueryOptions } from '@/queryFn/getMindshareByFid';

export async function generateMetadata({ params }: { params: { fid: string } }): Promise<Metadata> {
  const { fid } = await params;

  const frame = {
    version: 'next',
    imageUrl: `${BASE_URL}/profile/${fid}/opengraph-image`,
    button: {
      title: 'Check out my Inflynce profile 😊',
      action: {
        type: 'launch_frame',
        name: 'Inflynce',
        url: `${BASE_URL}/profile/${fid}`,
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

export default async function Page({ params }: { params: { fid: string } }) {
  const { fid } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    GetMindshareByFidQueryOptions({
      keys: [`${fid ?? 0}`],
      variables: {
        fid: (fid as string) ?? '0',
      },
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  );
}
