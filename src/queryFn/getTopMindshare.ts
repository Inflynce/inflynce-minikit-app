import { GetMindshareInput, GetTopMindshareQuery, MindshareResult } from '@/__generated__/graphql';
import { GetTopMindshareGql } from '@/gql/getTopMindshare.gql';
import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';

interface GetTopMindshareProps {
  variables: GetMindshareInput;
}

export const GetTopMindshare = async ({
  variables,
}: GetTopMindshareProps): Promise<MindshareResult[]> => {
  const data = (await queryFn({
    document: GetTopMindshareGql,
    variables,
  })) as GetTopMindshareQuery;

  return (data.getTopMindshare as MindshareResult[]) ?? [];
};

interface GetTopMindshareQueryOptionsProps extends GetTopMindshareProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<MindshareResult[]>, 'queryKey' | 'queryFn'>;
}

export const GetTopMindshareQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetTopMindshareQueryOptionsProps): UseQueryOptions<MindshareResult[]> => {
  return {
    queryKey: ['GetTopMindshareQuery', ...keys],
    queryFn: async () => await GetTopMindshare({ variables }),
    ...options,
  };
};

interface GetTopMindshareInfinitQueryOptionsProps extends GetTopMindshareProps {
  keys?: string[];
  options?: Omit<UseInfiniteQueryOptions<MindshareResult[] | []>, 'queryKey' | 'queryFn'>;
}

export const GetTopMindshareInfinitQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetTopMindshareInfinitQueryOptionsProps): UseInfiniteQueryOptions<MindshareResult[], any> => {
  return {
    queryKey: ['fetchUpcomingEvents', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await GetTopMindshare({
        variables: { ...variables, skip: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
