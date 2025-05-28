import {
  GetBoostRecastsByFidQueryVariables,
  GetBoostRecastsByFidQuery,
  Boost_Recast_Records,
} from '@/__generated__/graphql';
import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';
import { GetBoostRecastsByFidGql } from '@/gql/boosts.gql';

interface GetBoostRecastByFidProps {
  variables: GetBoostRecastsByFidQueryVariables;
}

export const getBoostRecastRecordsByFid = async ({
  variables,
}: GetBoostRecastByFidProps): Promise<Boost_Recast_Records[]> => {
  const data = (await queryFn({
    document: GetBoostRecastsByFidGql,
    variables,
  })) as GetBoostRecastsByFidQuery;

  return (data.boost_recast_records as Boost_Recast_Records[]) ?? [];
};
interface GetBoostRecastRecordsByFidInfinitQueryOptionsProps extends GetBoostRecastByFidProps {
  keys?: string[];
  variables: GetBoostRecastsByFidQueryVariables;
  options?: Omit<UseInfiniteQueryOptions<Boost_Recast_Records[]>, 'queryKey' | 'queryFn'>;
}

export const GetBoostRecastRecordsByFidInfiniteQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetBoostRecastRecordsByFidInfinitQueryOptionsProps): UseInfiniteQueryOptions<
  Boost_Recast_Records[],
  any
> => {
  return {
    queryKey: ['GetBoostRecastRecordsByFidQuery', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await getBoostRecastRecordsByFid({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
