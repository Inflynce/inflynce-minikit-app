import { PostVoteRecordGql } from '@/gql/postVoteRecord.gql';
import { queryFn } from './queryFn';
import {
  PostVoteMutation,
  PostVoteMutationVariables,
  PostVoteOutput,
} from '@/__generated__/graphql';
import { UseMutationOptions } from '@tanstack/react-query';

export interface PostVoteRecordInput {
  variables: PostVoteMutationVariables;
}

export const PostVoteRecord = async ({
  variables,
}: PostVoteRecordInput): Promise<PostVoteOutput> => {
  const data = (await queryFn({
    document: PostVoteRecordGql,
    variables,
  })) as PostVoteMutation;

  return data.postVote ?? { status: 500 };
};

interface PostVoteRecordMutationOptionsProps {
  options?: Omit<
    UseMutationOptions<PostVoteOutput, Error, PostVoteMutationVariables>,
    'mutationFn'
  >;
}

export const PostVoteRecordMutationOptions = ({
  options,
}: PostVoteRecordMutationOptionsProps): UseMutationOptions<
  PostVoteOutput,
  Error,
  PostVoteMutationVariables
> => {
  return {
    mutationFn: async (variables) => await PostVoteRecord({ variables }),
    ...options,
  };
};
