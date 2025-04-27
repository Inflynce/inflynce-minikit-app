import { PostNotificationTokenGql } from '@/gql/postNotificationToken';
import { authQueryFn } from './queryFn';
import {
  PostNotificationTokenMutation,
  PostNotificationTokenMutationVariables,
  User_Notification_Tokens_Mutation_Response,
} from '@/__generated__/graphql';
import { UseMutationOptions } from '@tanstack/react-query';

export interface PostNotificationTokenInput {
  variables: PostNotificationTokenMutationVariables;
  token?: string;
}

export const PostNotificationToken = async ({
  variables,
  token,
}: PostNotificationTokenInput): Promise<User_Notification_Tokens_Mutation_Response> => {
  const data = (await authQueryFn({
    document: PostNotificationTokenGql,
    variables,
    token,
  })) as PostNotificationTokenMutation;

  return data.insert_user_notification_tokens ?? { affected_rows: 0, returning: [] };
};

interface PostNotificationTokenOptionsProps {
  options?: Omit<
    UseMutationOptions<
      User_Notification_Tokens_Mutation_Response,
      Error,
      PostNotificationTokenMutationVariables
    >,
    'mutationFn'
  >;
  token?: string;
}

export const PostNotificationTokenMutationOptions = ({
  options,
  token,
}: PostNotificationTokenOptionsProps): UseMutationOptions<
  User_Notification_Tokens_Mutation_Response,
  Error,
  PostNotificationTokenMutationVariables
> => {
  return {
    mutationFn: async (variables) => await PostNotificationToken({ variables, token }),
    ...options,
  };
};
