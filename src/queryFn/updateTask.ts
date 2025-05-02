import { authQueryFn } from './queryFn';
import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
  UpdateTaskOutput,
} from '@/__generated__/graphql';
import { UseMutationOptions } from '@tanstack/react-query';
import { UpdateTaskGql } from '@/gql/updateTask.gql';

export interface UpdateTaskInput {
  variables: UpdateTaskMutationVariables;
  token: string;
}

export const UpdateTask = async ({
  variables,
  token,
}: UpdateTaskInput): Promise<UpdateTaskOutput> => {
  const data = (await authQueryFn({
    document: UpdateTaskGql,
    variables,
    token,
  })) as UpdateTaskMutation;

  return data.updateTask ?? { status: 500 };
};

interface UpdateTaskOptionsProps {
  variables: UpdateTaskMutationVariables;
  token: string;
  options?: Omit<
    UseMutationOptions<UpdateTaskOutput, Error, UpdateTaskMutationVariables>,
    'mutationFn'
  >;
}

export const UpdateTaskMutationOptions = ({
  token,
  options,
}: UpdateTaskOptionsProps): UseMutationOptions<
  UpdateTaskOutput,
  Error,
  UpdateTaskMutationVariables
> => {
  return {
    mutationFn: async (variables) => await UpdateTask({ variables, token }),
    ...options,
  };
};
