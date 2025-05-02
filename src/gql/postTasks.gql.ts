import { gql } from 'graphql-request';

export const PostTasksGql = gql`
  mutation PostTasks($userId: String!) {
    postTasks(input: { userId: $userId }) {
      status
    }
  }
`;
