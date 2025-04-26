import {
  GetVoteSnapshotQueryVariables,
  GetVoteSnapshotQuery,
  Vote_Snapshot,
} from '@/__generated__/graphql';
import { GetVoteSnapshotGql } from '@/gql/getVoteSnapshot.gql';
import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';

interface GetVoteSnapshotProps {
  variables: GetVoteSnapshotQueryVariables;
}

export const GetVoteSnapshot = async ({
  variables,
}: GetVoteSnapshotProps): Promise<Vote_Snapshot[]> => {
  const data = (await queryFn({
    document: GetVoteSnapshotGql,
    variables,
  })) as GetVoteSnapshotQuery;

  return (data.vote_snapshot as Vote_Snapshot[]) ?? [];
};

interface GetVoteSnapshotQueryOptionsProps extends GetVoteSnapshotProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Vote_Snapshot[]>, 'queryKey' | 'queryFn'>;
}

export const GetVoteSnapshotQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteSnapshotQueryOptionsProps): UseQueryOptions<Vote_Snapshot[]> => {
  return {
    queryKey: ['GetVoteSnapshotQuery', ...keys],
    queryFn: async () => await GetVoteSnapshot({ variables }),
    ...options,
  };
};

interface GetVoteSnapshotInfinitQueryOptionsProps extends GetVoteSnapshotProps {
  keys?: string[];
  options?: Omit<UseInfiniteQueryOptions<Vote_Snapshot[] | []>, 'queryKey' | 'queryFn'>;
}

export const GetVoteSnapshotInfinitQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteSnapshotInfinitQueryOptionsProps): UseInfiniteQueryOptions<Vote_Snapshot[], any> => {
  return {
    queryKey: ['GetVoteSnapshot', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await GetVoteSnapshot({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
