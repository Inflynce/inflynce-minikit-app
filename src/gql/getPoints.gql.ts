import { gql } from 'graphql-request';

export const GetPointsByFidGql = gql`
  query GetPointsByFid($fid: String!) {
    user_points_by_pk(fid: $fid) {
      fid
      totalPoints
    }
  }
`;

export const GetLeaderboardGql = gql`
  query GetLeaderboard($limit: Int!, $offset: Int!) {
    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {
      fid
      totalPoints
      user {
        displayName
        fid
        pfpUrl
        username
        isSmartUser
        proUser {
          isPro
        }
      }
    }
  }
`;
