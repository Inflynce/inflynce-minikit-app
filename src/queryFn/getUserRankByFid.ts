import {
  GetUserRankQueryVariables,
  User_Rank_View,
  GetUserRankQuery,
} from '@/__generated__/graphql';
import { UseQueryOptions } from '@tanstack/react-query';
import { queryFn } from './queryFn';
import { GetUserRankGql } from '@/gql/getUserRank.gql';

interface GetUserRankByFidProps {
  variables: GetUserRankQueryVariables;
}

export const GetUserRankByFid = async ({
  variables,
}: GetUserRankByFidProps): Promise<User_Rank_View[]> => {
  const data = (await queryFn({
    document: GetUserRankGql,
    variables,
  })) as GetUserRankQuery;

  return (data.user_rank_view as User_Rank_View[]) ?? [];
};

interface GetUserRankByFidQueryOptionsProps extends GetUserRankByFidProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<User_Rank_View[]>, 'queryKey' | 'queryFn'>;
}

export const GetUserRankByFidQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetUserRankByFidQueryOptionsProps): UseQueryOptions<User_Rank_View[]> => {
  return {
    queryKey: ['GetUserRankByFidQuery', ...keys],
    queryFn: async () => await GetUserRankByFid({ variables }),
    ...options,
  };
};
