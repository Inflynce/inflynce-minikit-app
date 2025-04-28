import { gql } from 'graphql-request';

export const GetPointTransactionByFidGql = gql`
  query GetPointTransactionByFid($fid: String!, $type: String!, $limit: Int, $offset: Int) {
    point_transactions(
      where: { fid: { _eq: $fid }, type: { _eq: $type } }
      order_by: { date: desc }
      limit: $limit
      offset: $offset
    ) {
      date
      createdAt
      direction
      fid
      id
      mindshare
      points
      reason
      type
      usdcAmount
    }
  }
`;
