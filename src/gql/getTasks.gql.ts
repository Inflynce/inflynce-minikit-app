import { gql } from 'graphql-request';

export const GetUserTasksGql = gql`
  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {
    user_tasks(
      where: { userId: { _eq: $userId }, date: { _eq: $date } }
      limit: $limit
      offset: $offset
    ) {
      completed
      date
      id
      progress
      taskId
      userId
      task {
        title
        target
        rewardIp
        isActive
        taskOrder
        description
        taskType {
          id
          name
        }
        actionType {
          id
          name
        }
      }
    }
  }
`;
