import {
  GetVoteByVoterQueryVariables,
  GetVoteByVoterQuery,
  Vote_Records,
} from '@/__generated__/graphql';
import { GetVoteByVoterGql } from '@/gql/getVoteByVoter.gql';
import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';

interface GetVoteByVoterProps {
  variables: GetVoteByVoterQueryVariables;
}

export const GetVoteByVoter = async ({
  variables,
}: GetVoteByVoterProps): Promise<Vote_Records[]> => {
  const data = (await queryFn({
    document: GetVoteByVoterGql,
    variables,
  })) as GetVoteByVoterQuery;

  return (data.vote_records as Vote_Records[]) ?? [];
};

interface GetVoteByVoterQueryOptionsProps extends GetVoteByVoterProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Vote_Records[]>, 'queryKey' | 'queryFn'>;
}

export const GetVoteByVoterQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteByVoterQueryOptionsProps): UseQueryOptions<Vote_Records[]> => {
  return {
    queryKey: ['GetVoteByVoterQuery', ...keys],
    queryFn: async () => await GetVoteByVoter({ variables }),
    ...options,
  };
};

interface GetVoteByVoterInfinitQueryOptionsProps extends GetVoteByVoterProps {
  keys?: string[];
  options?: Omit<
    UseInfiniteQueryOptions<Vote_Records[] | []>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'getPreviousPageParam'
  >;
}

export const GetVoteByVoterInfinitQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteByVoterInfinitQueryOptionsProps): UseInfiniteQueryOptions<Vote_Records[], any> => {
  return {
    queryKey: ['GetVoteByVoter', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await GetVoteByVoter({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
