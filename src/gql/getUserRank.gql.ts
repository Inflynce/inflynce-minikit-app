import { gql } from 'graphql-request';

export const GetUserRankGql = gql`
  query GetUserRank($fid: String!) {
    user_rank_view(where: { fid: { _eq: $fid } }) {
      fid
      rank
      totalPoints
    }
  }
`;
