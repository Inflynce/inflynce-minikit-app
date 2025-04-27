import { gql } from 'graphql-request';

export const PostNotificationTokenGql = gql`
  mutation PostNotificationToken($userId: String!, $url: String!, $token: String!) {
    insert_user_notification_tokens(
      objects: { userId: $userId, url: $url, token: $token }
      on_conflict: { constraint: user_notification_tokens_pkey }
    ) {
      affected_rows
      returning {
        id
        token
        url
        userId
        createdAt
        updatedAt
        provider
      }
    }
  }
`;
