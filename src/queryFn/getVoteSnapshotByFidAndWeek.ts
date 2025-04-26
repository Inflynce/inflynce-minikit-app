import {
  GetVoteSnapshotByFidAndWeekQueryVariables,
  GetVoteSnapshotByFidAndWeekQuery,
  Vote_Snapshot,
} from '@/__generated__/graphql';
import { GetVoteSnapshotByFidAndWeekGql } from '@/gql/getVoteSnapshot.gql';
import { UseQueryOptions } from '@tanstack/react-query';
import { queryFn } from './queryFn';

interface GetVoteSnapshotByFidAndWeekProps {
  variables: GetVoteSnapshotByFidAndWeekQueryVariables;
}

export const GetVoteSnapshotByFidAndWeek = async ({
  variables,
}: GetVoteSnapshotByFidAndWeekProps): Promise<Vote_Snapshot[]> => {
  const data = (await queryFn({
    document: GetVoteSnapshotByFidAndWeekGql,
    variables,
  })) as GetVoteSnapshotByFidAndWeekQuery;

  return (data.vote_snapshot as Vote_Snapshot[]) ?? [];
};

interface GetVoteSnapshotByFidAndWeekQueryOptionsProps extends GetVoteSnapshotByFidAndWeekProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Vote_Snapshot[]>, 'queryKey' | 'queryFn'>;
}

export const GetVoteSnapshotByFidAndWeekQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteSnapshotByFidAndWeekQueryOptionsProps): UseQueryOptions<Vote_Snapshot[]> => {
  return {
    queryKey: ['GetVoteSnapshotByFidAndWeekQuery', variables.fid, variables.weekStart, ...keys],
    queryFn: async () => await GetVoteSnapshotByFidAndWeek({ variables }),
    ...options,
  };
};
