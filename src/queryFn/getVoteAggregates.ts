import { GetVoteAggregatesQuery } from '@/__generated__/graphql';
import { GetVoteAggregatesGql } from '@/gql/getVoteAggregates.gql';
import { UseQueryOptions } from '@tanstack/react-query';
import { queryFn } from './queryFn';

interface VoteAggregate {
  count: number;
  sum: number;
}

export interface VoteAggregates {
  upvotes: {
    usdc: VoteAggregate;
    social: VoteAggregate;
  };
  downvotes: {
    usdc: VoteAggregate;
    social: VoteAggregate;
  };
}

interface GetVoteAggregatesProps {
  variables: {
    snapshotId: string;
  };
}

export const GetVoteAggregates = async ({
  variables,
}: GetVoteAggregatesProps): Promise<VoteAggregates> => {
  const data = (await queryFn({
    document: GetVoteAggregatesGql,
    variables,
  })) as GetVoteAggregatesQuery;

  return {
    upvotes: {
      usdc: {
        count: data.upvotes_usdc?.aggregate?.count || 0,
        sum: data.upvotes_usdc?.aggregate?.sum?.amount || 0,
      },
      social: {
        count: data.upvotes_social?.aggregate?.count || 0,
        sum: data.upvotes_social?.aggregate?.sum?.amount || 0,
      },
    },
    downvotes: {
      usdc: {
        count: data.downvotes_usdc?.aggregate?.count || 0,
        sum: data.downvotes_usdc?.aggregate?.sum?.amount || 0,
      },
      social: {
        count: data.downvotes_social?.aggregate?.count || 0,
        sum: data.downvotes_social?.aggregate?.sum?.amount || 0,
      },
    },
  };
};

interface GetVoteAggregatesQueryOptionsProps extends GetVoteAggregatesProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<VoteAggregates>, 'queryKey' | 'queryFn'>;
}

export const GetVoteAggregatesQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetVoteAggregatesQueryOptionsProps): UseQueryOptions<VoteAggregates> => {
  return {
    queryKey: ['GetVoteAggregatesQuery', variables.snapshotId, ...keys],
    queryFn: async () => await GetVoteAggregates({ variables }),
    ...options,
  };
};
