import { gql } from 'graphql-request';

export const UpdateTaskGql = gql`
  mutation UpdateTask($taskId: String!) {
    updateTask(input: { taskId: $taskId }) {
      status
    }
  }
`;
