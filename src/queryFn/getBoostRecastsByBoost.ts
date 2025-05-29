import {
  Boost_Recast_Records,
  GetBoostRecastsByBoostIdQueryVariables,
  GetBoostRecastsByBoostIdQuery,
} from '@/__generated__/graphql';
import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';
import { GetBoostRecastsByBoostIdGql } from '@/gql/boosts.gql';

interface GetBoostRecastByBoostProps {
  variables: GetBoostRecastsByBoostIdQueryVariables;
}

export const getBoostRecastRecordsByBoost = async ({
  variables,
}: GetBoostRecastByBoostProps): Promise<Boost_Recast_Records[]> => {
  const data = (await queryFn({
    document: GetBoostRecastsByBoostIdGql,
    variables,
  })) as GetBoostRecastsByBoostIdQuery;

  return (data.boost_recast_records as Boost_Recast_Records[]) ?? [];
};

interface GetBoostRecastRecordsByBoostInfinitQueryOptionsProps extends GetBoostRecastByBoostProps {
  keys?: string[];
  variables: GetBoostRecastsByBoostIdQueryVariables;
  options?: Omit<UseInfiniteQueryOptions<Boost_Recast_Records[]>, 'queryKey' | 'queryFn'>;
}

export const GetBoostRecastRecordsByBoostInfiniteQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetBoostRecastRecordsByBoostInfinitQueryOptionsProps): UseInfiniteQueryOptions<
  Boost_Recast_Records[],
  any
> => {
  return {
    queryKey: ['GetBoostRecastRecordsByBoostQuery', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await getBoostRecastRecordsByBoost({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
