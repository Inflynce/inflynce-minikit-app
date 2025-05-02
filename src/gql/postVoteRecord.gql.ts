import { gql } from 'graphql-request';

export const PostVoteRecordGql = gql`
  mutation PostVoteRecord($input: PostVoteRecordInput!) {
    postVoteRecord(input: $input) {
      status
    }
  }
`;
