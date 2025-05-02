import { GetUserTasksQuery, GetUserTasksQueryVariables, User_Tasks } from '@/__generated__/graphql';
import { GetUserTasksGql } from '@/gql/getTasks.gql';
import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';

interface GetUserTasksProps {
  variables: GetUserTasksQueryVariables;
}

export const GetUserTasks = async ({ variables }: GetUserTasksProps): Promise<User_Tasks[]> => {
  const data = (await queryFn({
    document: GetUserTasksGql,
    variables,
  })) as GetUserTasksQuery;

  return (data.user_tasks as User_Tasks[]) ?? [];
};

interface GetUserTasksQueryOptionsProps extends GetUserTasksProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<User_Tasks[]>, 'queryKey' | 'queryFn'>;
}

export const GetUserTasksQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetUserTasksQueryOptionsProps): UseQueryOptions<User_Tasks[]> => {
  return {
    queryKey: ['GetUserTasksQuery', ...keys],
    queryFn: async () => await GetUserTasks({ variables }),
    ...options,
  };
};

interface GetUserTasksInfinitQueryOptionsProps extends GetUserTasksProps {
  keys?: string[];
  options?: Omit<
    UseInfiniteQueryOptions<User_Tasks[], any, any, any, any, any>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'getPreviousPageParam'
  >;
}

export const GetUserTasksInfinitQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetUserTasksInfinitQueryOptionsProps): UseInfiniteQueryOptions<User_Tasks[], any> => {
  return {
    queryKey: ['GetUserTasksInfinitQuery', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await GetUserTasks({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};
