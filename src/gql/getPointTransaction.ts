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
      order_by: { createdAt: desc }
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
      order_by: { createdAt: desc }
      where: { fid: { _eq: $fid }, type: { _eq: $type } }
      limit: $limit
      offset: $offset
    ) {
      ...PointTransactionFields
    }
  }
  ${PointTransactionFieldsFragment}
`;

export const GetPointTransactionByFidAndDirectionAndDateGql = gql`
  query GetPointTransactionByFidAndDirectionAndDate(
    $fid: String!
    $direction: String!
    $date: date!
  ) {
    point_transactions(
      where: { fid: { _eq: $fid }, direction: { _eq: $direction }, date: { _eq: $date } }
      order_by: { createdAt: desc }
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
    }
  }
`;

export const GetPointTransactionByFidAndDirectionGql = gql`
  query GetPointTransactionByFidAndDirection(
    $fid: String!
    $direction: String!
    $limit: Int
    $offset: Int
  ) {
    point_transactions(
      where: { fid: { _eq: $fid }, direction: { _eq: $direction } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...PointTransactionFields
    }
  }
  ${PointTransactionFieldsFragment}
`;

export const GetPointTransactionByFidAndDirectionDateRangeGql = gql`
  query GetPointTransactionByFidAndDirectionDateRange(
    $fid: String!
    $direction: String!
    $startDate: date!
    $endDate: date!
    $limit: Int
    $offset: Int
  ) {
    point_transactions(
      where: {
        fid: { _eq: $fid }
        direction: { _eq: $direction }
        date: { _gte: $startDate, _lte: $endDate }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...PointTransactionFields
    }
  }
  ${PointTransactionFieldsFragment}
`;
