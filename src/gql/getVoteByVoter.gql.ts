import { gql } from '../__generated__/gql';

export const GetVoteByVoterGql = gql(`
  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {
    vote_records(
      where: {voterId: {_eq: $voterId}}
      limit: $limit
      offset: $offset
      order_by: {createdAt: desc}
    ) {
      id
      voterId
      voteType
      tokenType
      status
      amount
      createdAt
      vote_snapshot {
        id
        fid
        weekStart
        updatedAt
        status
        mindshare
        createdAt
        user {
          fid
          displayName
          username
          pfpUrl
        }
      }
    }
  }
`);
