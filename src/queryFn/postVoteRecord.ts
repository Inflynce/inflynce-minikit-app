import { PostVoteRecordGql } from '@/gql/postVoteRecord';
import { queryFn } from './queryFn';
import {
  PostVoteRecordMutation,
  PostVoteRecordMutationVariables,
  PostVoteRecordOutput,
} from '@/__generated__/graphql';
import { UseMutationOptions } from '@tanstack/react-query';

export interface PostVoteRecordInput {
  variables: PostVoteRecordMutationVariables;
}

export const PostVoteRecord = async ({
  variables,
}: PostVoteRecordInput): Promise<PostVoteRecordOutput> => {
  const data = (await queryFn({
    document: PostVoteRecordGql,
    variables,
  })) as PostVoteRecordMutation;

  return data.postVoteRecord ?? { status: 500 };
};

interface PostVoteRecordMutationOptionsProps {
  options?: Omit<
    UseMutationOptions<PostVoteRecordOutput, Error, PostVoteRecordMutationVariables>,
    'mutationFn'
  >;
}

export const PostVoteRecordMutationOptions = ({
  options,
}: PostVoteRecordMutationOptionsProps): UseMutationOptions<
  PostVoteRecordOutput,
  Error,
  PostVoteRecordMutationVariables
> => {
  return {
    mutationFn: async (variables) => await PostVoteRecord({ variables }),
    ...options,
  };
};
