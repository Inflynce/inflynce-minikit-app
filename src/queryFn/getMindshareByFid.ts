import {
  GetMindshareByFidInput,
  GetMindshareByFidQuery,
  MindshareResult,
} from '@/__generated__/graphql';
import { GetMindshareByFidGql } from '@/gql/getMindshareByFid.gql';
import { UseQueryOptions } from '@tanstack/react-query';
import { queryFn } from './queryFn';

interface GetMindshareByFidProps {
  variables: GetMindshareByFidInput;
}

export const GetMindshareByFid = async ({
  variables,
}: GetMindshareByFidProps): Promise<MindshareResult> => {
  const data = (await queryFn({
    document: GetMindshareByFidGql,
    variables,
  })) as GetMindshareByFidQuery;

  return (data.getMindshareByFid as MindshareResult) ?? [];
};

interface GetMindshareByFidQueryOptionsProps extends GetMindshareByFidProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<MindshareResult>, 'queryKey' | 'queryFn'>;
}

export const GetMindshareByFidQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetMindshareByFidQueryOptionsProps): UseQueryOptions<MindshareResult> => {
  return {
    queryKey: ['GetMindshareByFidQuery', ...keys],
    queryFn: async () => await GetMindshareByFid({ variables }),
    ...options,
  };
};
