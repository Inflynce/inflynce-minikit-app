import { authQueryFn } from './queryFn';
import {
  PostBoostMutation,
  PostBoostMutationVariables,
  Mindshare_Boosts,
} from '@/__generated__/graphql';
import { UseMutationOptions } from '@tanstack/react-query';
import { PostBoostGql } from '@/gql/boosts.gql';

export interface PostBoostInput {
  variables: PostBoostMutationVariables;
  token: string;
}

export const PostBoost = async ({
  variables,
  token,
}: PostBoostInput): Promise<
  Omit<Mindshare_Boosts, 'boostRecastRecords' | 'boostRecastRecords_aggregate'>
> => {
  const data = (await authQueryFn({
    token,
    document: PostBoostGql,
    variables,
  })) as PostBoostMutation;

  if (!data?.insert_mindshare_boosts_one) {
    throw new Error('Failed to insert boost');
  }

  return data.insert_mindshare_boosts_one;
};

interface PostBoostMutationOptionsProps {
  token: string;
  options?: Omit<
    UseMutationOptions<
      Omit<Mindshare_Boosts, 'boostRecastRecords' | 'boostRecastRecords_aggregate'>,
      Error,
      PostBoostMutationVariables
    >,
    'mutationFn'
  >;
}

export const PostBoostMutationOptions = ({
  token,
  options,
}: PostBoostMutationOptionsProps): UseMutationOptions<
  Omit<Mindshare_Boosts, 'boostRecastRecords' | 'boostRecastRecords_aggregate'>,
  Error,
  PostBoostMutationVariables
> => {
  return {
    mutationFn: async (variables) => await PostBoost({ variables, token }),
    ...options,
  };
};
