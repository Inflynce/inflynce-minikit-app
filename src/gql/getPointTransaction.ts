import { gql } from 'graphql-request';

export const PointTransactionFieldsFragment = gql`
  fragment PointTransactionFields on point_transactions {
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
    userTask {
      task {
        title
      }
    }
  }
`;

export const GetPointTransactionByFidGql = gql`
  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {
    point_transactions(
      where: { fid: { _eq: $fid } }
      order_by: { date: desc }
      limit: $limit
      offset: $offset
    ) {
      ...PointTransactionFields
    }
  }
  ${PointTransactionFieldsFragment}
`;

export const GetPointTransactionByFidAndTypeGql = gql`
  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {
    point_transactions(
      where: { fid: { _eq: $fid }, type: { _eq: $type } }
      limit: $limit
      offset: $offset
    ) {
      ...PointTransactionFields
    }
  }
  ${PointTransactionFieldsFragment}
`;
