import { GetPointsByFidQuery, User_Points, GetLeaderboardQuery } from '@/__generated__/graphql';
import { GetLeaderboardGql, GetPointsByFidGql } from '@/gql/getPoints.gql';
import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';

interface GetPointsByFidProps {
  variables: { fid: string };
}

export const GetPointsByFid = async ({ variables }: GetPointsByFidProps): Promise<User_Points> => {
  const data = (await queryFn({
    document: GetPointsByFidGql,
    variables,
  })) as GetPointsByFidQuery;

  return (data.user_points_by_pk as User_Points) ?? [];
};

interface GetPointsByFidQueryOptionsProps extends GetPointsByFidProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<User_Points>, 'queryKey' | 'queryFn'>;
}

export const GetPointsByFidQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetPointsByFidQueryOptionsProps): UseQueryOptions<User_Points> => {
  return {
    queryKey: ['GetPointsByFidQuery', ...keys],
    queryFn: async () => await GetPointsByFid({ variables }),
    ...options,
  };
};

interface GetLeaderboardProps {
  variables: { limit: number; offset?: number };
}

export const GetLeaderboard = async ({
  variables,
}: GetLeaderboardProps): Promise<User_Points[]> => {
  const data = (await queryFn({
    document: GetLeaderboardGql,
    variables,
  })) as GetLeaderboardQuery;

  return (data.user_points as User_Points[]) ?? [];
};

interface GetLeaderboardQueryOptionsProps extends GetLeaderboardProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<User_Points[]>, 'queryKey' | 'queryFn'>;
}

export const GetLeaderboardQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetLeaderboardQueryOptionsProps): UseQueryOptions<User_Points[]> => {
  return {
    queryKey: ['GetLeaderboardQuery', ...keys],
    queryFn: async () => await GetLeaderboard({ variables }),
    ...options,
  };
};

interface GetLeaderBoardInfinitQueryOptionsProps extends GetLeaderboardProps {
  keys?: string[];
  options?: Omit<UseInfiniteQueryOptions<User_Points[]>, 'queryKey' | 'queryFn'>;
}

export const GetLeaderBoardInfinitQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetLeaderBoardInfinitQueryOptionsProps): UseInfiniteQueryOptions<User_Points[], any> => {
  return {
    queryKey: ['GetLeaderBoardInfinitQuery', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await GetLeaderboard({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
