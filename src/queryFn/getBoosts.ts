import { GetBoostsQueryVariables, Mindshare_Boosts, GetBoostsQuery } from '@/__generated__/graphql';
import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';
import { GetBoostsGql } from '@/gql/boosts.gql';

interface GetBoostsProps {
  variables: GetBoostsQueryVariables;
}

export const getBoosts = async ({ variables }: GetBoostsProps): Promise<Mindshare_Boosts[]> => {
  const data = (await queryFn({
    document: GetBoostsGql,
    variables,
  })) as GetBoostsQuery;

  return (data.mindshare_boosts as Mindshare_Boosts[]) ?? [];
};

interface GetBoostsInfinitQueryOptionsProps extends GetBoostsProps {
  keys?: string[];
  variables: GetBoostsQueryVariables;
  options?: Omit<UseInfiniteQueryOptions<Mindshare_Boosts[]>, 'queryKey' | 'queryFn'>;
}

export const GetBoostsInfiniteQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetBoostsInfinitQueryOptionsProps): UseInfiniteQueryOptions<Mindshare_Boosts[], any> => {
  return {
    queryKey: ['GetBoostsQuery', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await getBoosts({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
