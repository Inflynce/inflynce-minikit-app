import { gql } from '../__generated__/gql';

const GetTopMindshareGql = gql(/* GraphQL */ `
  query GetTopMindshare(
    $duration: String!
    $field: String!
    $limit: Int!
    $skip: Int!
    $desc: Boolean!
  ) {
    getTopMindshare(
      input: { duration: $duration, field: $field, limit: $limit, skip: $skip, desc: $desc }
    ) {
      ...MindshareResult
    }
  }
`);

export { GetTopMindshareGql };
