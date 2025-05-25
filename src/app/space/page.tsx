import Space from '@/sections/space';
import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query';

export default async function Page({ params }: { params: { fid: string } }) {
  const { fid } = await params;
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(
  //   GetMindshareByFidQueryOptions({
  //     keys: [`${fid ?? 0}`],
  //     variables: {
  //       fid: (fid as string) ?? '0',
  //     },
  //   })
  // );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Space />
    </HydrationBoundary>
  );
}
