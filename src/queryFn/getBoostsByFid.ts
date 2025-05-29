import {
  Mindshare_Boosts,
  GetBoostsByFidQuery,
  GetBoostsByFidQueryVariables,
} from '@/__generated__/graphql';
import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';
import { GetBoostsByFidGql } from '@/gql/boosts.gql';

interface GetBoostsByFidProps {
  variables: GetBoostsByFidQueryVariables;
}

export const getBoostsByFid = async ({
  variables,
}: GetBoostsByFidProps): Promise<Mindshare_Boosts[]> => {
  const data = (await queryFn({
    document: GetBoostsByFidGql,
    variables,
  })) as GetBoostsByFidQuery;

  return (data.mindshare_boosts as Mindshare_Boosts[]) ?? [];
};

interface GetBoostsByFidInfinitQueryOptionsProps extends GetBoostsByFidProps {
  keys?: string[];
  variables: GetBoostsByFidQueryVariables;
  options?: Omit<UseInfiniteQueryOptions<Mindshare_Boosts[]>, 'queryKey' | 'queryFn'>;
}

export const GetBoostsByFidInfiniteQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetBoostsByFidInfinitQueryOptionsProps): UseInfiniteQueryOptions<Mindshare_Boosts[], any> => {
  return {
    queryKey: ['GetBoostsByFidQuery', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await getBoostsByFid({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
