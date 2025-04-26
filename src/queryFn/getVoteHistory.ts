import {
  GetVoteHistoryQueryVariables,
  GetVoteHistoryQuery,
  Vote_Records,
} from '@/__generated__/graphql';
import { GetVoteHistoryGql } from '@/gql/getVoteHistory.gql';
import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';

interface GetVoteHistoryProps {
  variables: GetVoteHistoryQueryVariables;
}

export const GetVoteHistory = async ({
  variables,
}: GetVoteHistoryProps): Promise<Vote_Records[]> => {
  const data = (await queryFn({
    document: GetVoteHistoryGql,
    variables,
  })) as GetVoteHistoryQuery;

  return (data.vote_records as Vote_Records[]) ?? [];
};

interface GetVoteHistoryQueryOptionsProps extends GetVoteHistoryProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Vote_Records[]>, 'queryKey' | 'queryFn'>;
}

export const GetVoteHistoryQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteHistoryQueryOptionsProps): UseQueryOptions<Vote_Records[]> => {
  return {
    queryKey: ['GetVoteHistoryQuery', ...keys],
    queryFn: async () => await GetVoteHistory({ variables }),
    ...options,
  };
};

interface GetVoteHistoryInfinitQueryOptionsProps extends GetVoteHistoryProps {
  keys?: string[];
  options?: Omit<
    UseInfiniteQueryOptions<Vote_Records[] | []>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'getPreviousPageParam'
  >;
}

export const GetVoteHistoryInfinitQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteHistoryInfinitQueryOptionsProps): UseInfiniteQueryOptions<Vote_Records[], any> => {
  return {
    queryKey: ['GetVoteHistory', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await GetVoteHistory({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
