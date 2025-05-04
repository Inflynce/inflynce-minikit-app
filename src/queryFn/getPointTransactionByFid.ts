import {
  GetPointTransactionByFidQuery,
  Point_Transactions,
  GetPointTransactionByFidQueryVariables,
  GetPointTransactionByFidAndDirectionAndDateQuery,
  GetPointTransactionByFidAndDirectionQuery,
  GetPointTransactionByFidAndDirectionDateRangeQuery,
} from '@/__generated__/graphql';
import {
  GetPointTransactionByFidAndTypeGql,
  GetPointTransactionByFidGql,
  GetPointTransactionByFidAndDirectionAndDateGql,
  GetPointTransactionByFidAndDirectionGql,
  GetPointTransactionByFidAndDirectionDateRangeGql,
} from '@/gql/getPointTransaction';
import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { queryFn, getNextPageParam, getPreviousPageParam } from './queryFn';

interface GetPointTransactionsByFidProps {
  variables: GetPointTransactionByFidQueryVariables & { type?: string };
}

export const GetPointTransactionsByFid = async ({
  variables,
}: GetPointTransactionsByFidProps): Promise<Point_Transactions[]> => {
  const data = (await queryFn({
    document: variables.type ? GetPointTransactionByFidAndTypeGql : GetPointTransactionByFidGql,
    variables,
  })) as GetPointTransactionByFidQuery;

  return (data.point_transactions as Point_Transactions[]) ?? [];
};

interface GetPointTransactionsByFidQueryOptionsProps extends GetPointTransactionsByFidProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Point_Transactions[]>, 'queryKey' | 'queryFn'>;
}

export const GetPointTransactionsByFidQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetPointTransactionsByFidQueryOptionsProps): UseQueryOptions<Point_Transactions[]> => {
  return {
    queryKey: ['GetPointTransactionsByFidQuery', ...keys],
    queryFn: async () => await GetPointTransactionsByFid({ variables }),
    ...options,
  };
};

interface GetPointTransactionsByFidInfiniteQueryOptionsProps
  extends GetPointTransactionsByFidProps {
  keys?: string[];
  options?: Omit<
    UseInfiniteQueryOptions<Point_Transactions[]>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'getPreviousPageParam'
  >;
}

export const GetPointTransactionsByFidInfiniteQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetPointTransactionsByFidInfiniteQueryOptionsProps): UseInfiniteQueryOptions<
  Point_Transactions[],
  any
> => {
  return {
    queryKey: ['GetPointTransactionsByFidInfiniteQuery', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await GetPointTransactionsByFid({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};

interface GetPointTransactionsProps {
  variables: { limit: number; offset?: number };
}

export const GetPointTransactions = async ({
  variables,
}: GetPointTransactionsProps): Promise<Point_Transactions[]> => {
  const data = (await queryFn({
    document: GetPointTransactionByFidGql,
    variables,
  })) as GetPointTransactionByFidQuery;

  return (data.point_transactions as Point_Transactions[]) ?? [];
};

interface GetPointTransactionsQueryOptionsProps extends GetPointTransactionsProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Point_Transactions[]>, 'queryKey' | 'queryFn'>;
}

export const GetPointTransactionsQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetPointTransactionsQueryOptionsProps): UseQueryOptions<Point_Transactions[]> => {
  return {
    queryKey: ['GetPointTransactionsQuery', ...keys],
    queryFn: async () => await GetPointTransactions({ variables }),
    ...options,
  };
};

interface GetPointTransactionsInfiniteQueryOptionsProps extends GetPointTransactionsProps {
  keys?: string[];
  options?: Omit<UseInfiniteQueryOptions<Point_Transactions[]>, 'queryKey' | 'queryFn'>;
}

export const GetPointTransactionsInfiniteQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetPointTransactionsInfiniteQueryOptionsProps): UseInfiniteQueryOptions<
  Point_Transactions[],
  any
> => {
  return {
    queryKey: ['GetPointTransactionsInfiniteQuery', ...keys],
    queryFn: async ({ pageParam = 0 }) =>
      await GetPointTransactions({
        variables: { ...variables, offset: (pageParam as number) * (variables?.limit ?? 10) },
      }),
    initialPageParam: 0,
    getNextPageParam,
    getPreviousPageParam,
    ...options,
  };
};

interface GetPointTransactionsByFidAndDirectionAndDateProps {
  variables: { fid: string; direction: string; date: string };
}

export const GetPointTransactionsByFidAndDirectionAndDate = async ({
  variables,
}: GetPointTransactionsByFidAndDirectionAndDateProps): Promise<Point_Transactions[]> => {
  const data = (await queryFn({
    document: GetPointTransactionByFidAndDirectionAndDateGql,
    variables,
  })) as GetPointTransactionByFidAndDirectionAndDateQuery;

  return (data.point_transactions as Point_Transactions[]) ?? [];
};

interface GetPointTransactionsByFidAndDirectionAndDateQueryOptionsProps
  extends GetPointTransactionsByFidAndDirectionAndDateProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Point_Transactions[]>, 'queryKey' | 'queryFn' | 'enabled'>;
}

export const GetPointTransactionsByFidAndDirectionAndDateQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetPointTransactionsByFidAndDirectionAndDateQueryOptionsProps): UseQueryOptions<
  Point_Transactions[]
> => {
  return {
    queryKey: ['GetPointTransactionsByFidAndDirectionAndDateQuery', ...keys],
    queryFn: async () => await GetPointTransactionsByFidAndDirectionAndDate({ variables }),
    ...options,
  };
};

interface GetPointTransactionsByFidAndDirectionProps {
  variables: { fid: string; direction: string; limit: number; offset?: number };
}

export const GetPointTransactionsByFidAndDirection = async ({
  variables,
}: GetPointTransactionsByFidAndDirectionProps): Promise<Point_Transactions[]> => {
  const data = (await queryFn({
    document: GetPointTransactionByFidAndDirectionGql,
    variables,
  })) as GetPointTransactionByFidAndDirectionQuery;

  return (data.point_transactions as Point_Transactions[]) ?? [];
};

interface GetPointTransactionsByFidAndDirectionQueryOptionsProps
  extends GetPointTransactionsByFidAndDirectionProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Point_Transactions[]>, 'queryKey' | 'queryFn'>;
}

export const GetPointTransactionsByFidAndDirectionQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetPointTransactionsByFidAndDirectionQueryOptionsProps): UseQueryOptions<
  Point_Transactions[]
> => {
  return {
    queryKey: ['GetPointTransactionsByFidAndDirectionQuery', ...keys],
    queryFn: async () => await GetPointTransactionsByFidAndDirection({ variables }),
    ...options,
  };
};

interface GetPointTransactionByFidAndDirectionDateRangeProps {
  variables: { fid: string; direction: string; startDate: string; endDate: string };
}

export const GetPointTransactionByFidAndDirectionDateRange = async ({
  variables,
}: GetPointTransactionByFidAndDirectionDateRangeProps): Promise<Point_Transactions[]> => {
  const data = (await queryFn({
    document: GetPointTransactionByFidAndDirectionDateRangeGql,
    variables,
  })) as GetPointTransactionByFidAndDirectionDateRangeQuery;
  return (data.point_transactions as Point_Transactions[]) ?? [];
};

interface GetPointTransactionByFidAndDirectionDateRangeQueryOptionsProps
  extends GetPointTransactionByFidAndDirectionDateRangeProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<Point_Transactions[]>, 'queryKey' | 'queryFn'>;
}

export const GetPointTransactionByFidAndDirectionDateRangeQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetPointTransactionByFidAndDirectionDateRangeQueryOptionsProps): UseQueryOptions<
  Point_Transactions[]
> => {
  return {
    queryKey: ['GetPointTransactionByFidAndDirectionDateRangeQuery', ...keys],
    queryFn: async () => await GetPointTransactionByFidAndDirectionDateRange({ variables }),
    ...options,
  };
};
