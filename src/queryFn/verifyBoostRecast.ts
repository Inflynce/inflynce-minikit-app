import { authQueryFn } from './queryFn';
import {
  Mindshare_Boosts,
  VerifyBoostRecastMutation,
  VerifyBoostRecastMutationVariables,
  VerifyBoostRecastOutput,
} from '@/__generated__/graphql';
import { UseMutationOptions } from '@tanstack/react-query';
import { VerifyBoostRecastGql } from '@/gql/boosts.gql';

export interface VerifyBoostRecastInput {
  variables: VerifyBoostRecastMutationVariables;
  token: string;
}

export const verifyBoostRecast = async ({
  variables,
  token,
}: VerifyBoostRecastInput): Promise<VerifyBoostRecastOutput> => {
  const data = (await authQueryFn({
    token,
    document: VerifyBoostRecastGql,
    variables,
  })) as VerifyBoostRecastMutation;

  if (!data?.verifyBoostRecast) {
    throw new Error('Failed to insert boost');
  }

  return data.verifyBoostRecast;
};

interface VerifyBoostRecastMutationOptionsProps {
  token: string;
  options?: Omit<
    UseMutationOptions<VerifyBoostRecastOutput, Error, VerifyBoostRecastMutationVariables>,
    'mutationFn'
  >;
}

export const VerifyBoostRecastMutationOptions = ({
  token,
  options,
}: VerifyBoostRecastMutationOptionsProps): UseMutationOptions<
  VerifyBoostRecastOutput,
  Error,
  VerifyBoostRecastMutationVariables
> => {
  return {
    mutationFn: async (variables) => await verifyBoostRecast({ variables, token }),
    ...options,
  };
};
