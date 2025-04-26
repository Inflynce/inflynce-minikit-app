import {
  GetVoteSnapshotByFidQueryVariables,
  GetVoteSnapshotByFidQuery,
  Vote_Snapshot,
} from '@/__generated__/graphql';
import { GetVoteSnapshotByFidGql } from '@/gql/getVoteSnapshot.gql';
import { UseQueryOptions } from '@tanstack/react-query';
import { queryFn } from './queryFn';

interface GetVoteSnapshotByFidProps {
  variables: GetVoteSnapshotByFidQueryVariables;
}

export const GetVoteSnapshotByFid = async ({
  variables,
}: GetVoteSnapshotByFidProps): Promise<Vote_Snapshot[]> => {
  const data = (await queryFn({
    document: GetVoteSnapshotByFidGql,
    variables,
  })) as GetVoteSnapshotByFidQuery;

  return (data.vote_snapshot as Vote_Snapshot[]) ?? [];
};

interface GetVoteSnapshotByFidQueryOptionsProps extends GetVoteSnapshotByFidProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Vote_Snapshot[]>, 'queryKey' | 'queryFn'>;
}

export const GetVoteSnapshotByFidQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteSnapshotByFidQueryOptionsProps): UseQueryOptions<Vote_Snapshot[]> => {
  return {
    queryKey: ['GetVoteSnapshotByFidQuery', variables.fid, ...keys],
    queryFn: async () => await GetVoteSnapshotByFid({ variables }),
    ...options,
  };
};
