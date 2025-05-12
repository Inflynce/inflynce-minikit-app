import { gql } from 'graphql-request';

export const PostVoteRecordGql = gql`
  mutation PostVote($input: PostVoteInput!) {
    postVote(input: $input) {
      status
    }
  }
`;
