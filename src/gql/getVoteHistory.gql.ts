import { gql } from '../__generated__/gql';

export const GetVoteHistoryGql = gql(`
  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {
    vote_records(
      where: {targetSnapshotId: {_eq: $targetSnapshotId}}
      limit: $limit
      offset: $offset
      order_by: {createdAt: desc}
    ) {
      id
      createdAt
      amount
      targetSnapshotId
      voteType
      voter {
        fid
        displayName
        pfpUrl
        username
      }
    }
  }
`);
