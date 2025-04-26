import { gql } from '../__generated__/gql';

export const GetVoteSnapshotGql = gql(`
  query GetVoteSnapshot(
    $limit: Int!
    $offset: Int
    $order_by: [vote_snapshot_order_by!]
    $weekStart: date!
  ) {
    vote_snapshot(
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: {
        weekStart: {_eq: $weekStart}
        mindshare: {_gte: 0.0001}
      }
    ) {
      createdAt
      fid
      id
      mindshare
      status
      updatedAt
      weekStart
      user {
        displayName
        fid
        pfpUrl
        username
      }
    }
  }
`);

export const GetVoteSnapshotByFidGql = gql(`
  query GetVoteSnapshotByFid(
    $fid: String!, 
    $status: String = "open"
  ) {
    vote_snapshot(
      order_by: { weekStart: desc }
      where: {
        fid: {_eq: $fid}
        status: {_eq: $status}
      }
    ) {
      createdAt
      fid
      id
      mindshare
      status
      updatedAt
      weekStart
      user {
        displayName
        fid
        pfpUrl
        username
      }
    }
  }
`);

export const GetVoteSnapshotByFidAndWeekGql = gql(`
  query GetVoteSnapshotByFidAndWeek(
    $fid: String!, 
    $weekStart: date!
  ) {
    vote_snapshot(
      order_by: { weekStart: desc }
      where: {
        fid: {_eq: $fid}
        weekStart: {_eq: $weekStart}
      }
    ) {
      createdAt
      fid
      id
      mindshare
      status
      updatedAt
      weekStart
      user {
        displayName
        fid
        pfpUrl
        username
      }
    }
  }
`);
