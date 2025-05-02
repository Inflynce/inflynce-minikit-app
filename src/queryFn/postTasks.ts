import { queryFn } from './queryFn';
import {
  PostTasksMutation,
  PostTasksMutationVariables,
  PostTasksOutput,
} from '@/__generated__/graphql';
import { UseMutationOptions } from '@tanstack/react-query';
import { PostTasksGql } from '@/gql/postTasks.gql';

export interface PostTasksInput {
  variables: PostTasksMutationVariables;
}

export const PostTasks = async ({ variables }: PostTasksInput): Promise<PostTasksOutput> => {
  const data = (await queryFn({
    document: PostTasksGql,
    variables,
  })) as PostTasksMutation;

  return data.postTasks ?? { status: 500 };
};

interface PostTasksOptionsProps {
  variables: PostTasksMutationVariables;
  options?: Omit<
    UseMutationOptions<PostTasksOutput, Error, PostTasksMutationVariables>,
    'mutationFn'
  >;
}

export const PostTasksMutationOptions = ({
  options,
}: PostTasksOptionsProps): UseMutationOptions<
  PostTasksOutput,
  Error,
  PostTasksMutationVariables
> => {
  return {
    mutationFn: async (variables) => await PostTasks({ variables }),
    ...options,
  };
};
