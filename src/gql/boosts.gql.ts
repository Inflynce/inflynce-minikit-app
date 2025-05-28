import { gql } from 'graphql-request';

export const PostBoostGql = gql`
  mutation PostBoost(
    $castUrl: String!
    $creatorFid: String!
    $txHash: String!
    $mindshareFilterDuration: Int!
    $minMindshare: numeric!
    $campaignBudget: numeric!
  ) {
    insert_mindshare_boosts_one(
      object: {
        castUrl: $castUrl
        creatorFid: $creatorFid
        txHash: $txHash
        mindshareFilterDuration: $mindshareFilterDuration
        campaignBudget: $campaignBudget
        minMindshare: $minMindshare
      }
    ) {
      campaignBudget
      updatedAt
      txStatus
      txHash
      remainingBudget
      minMindshare
      mindshareFilterDuration
      id
      creatorFid
      createdAt
      costMultiplier
      castUrl
      campaignBudget
      boostStatus
    }
  }
`;

export const GetBoostsGql = gql`
  query GetBoosts($limit: Int, $offset: Int) {
    mindshare_boosts(
      where: { boostStatus: { _eq: "active" } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      user {
        displayName
        fid
        pfpUrl
        username
      }
      updatedAt
      txStatus
      txHash
      remainingBudget
      mindshareFilterDuration
      id
      minMindshare
      creatorFid
      createdAt
      costMultiplier
      castUrl
      campaignBudget
      boostStatus
      boostRecastRecords(limit: 5) {
        recasterFid
        user {
          fid
          pfpUrl
          username
          displayName
        }
      }
      boostRecastRecords_aggregate {
        aggregate {
          count(columns: boostId)
        }
      }
    }
  }
`;

export const VerifyBoostRecastGql = gql`
  mutation VerifyBoostRecast($boostId: String!, $userId: String!, $address: String!) {
    verifyBoostRecast(input: { boostId: $boostId, userId: $userId, address: $address }) {
      status
    }
  }
`;

export const GetBoostsByFidGql = gql`
  query GetBoostsByFid($fid: String!, $limit: Int, $offset: Int) {
    mindshare_boosts(
      where: { creatorFid: { _eq: $fid } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      user {
        displayName
        fid
        pfpUrl
        username
      }
      updatedAt
      txStatus
      txHash
      remainingBudget
      mindshareFilterDuration
      id
      minMindshare
      creatorFid
      createdAt
      costMultiplier
      castUrl
      campaignBudget
      boostStatus
      boostRecastRecords(limit: 5) {
        user {
          fid
          pfpUrl
          username
          displayName
        }
      }
      boostRecastRecords_aggregate {
        aggregate {
          count(columns: boostId)
        }
      }
    }
  }
`;

export const GetBoostRecastsByFidGql = gql`
  query GetBoostRecastsByFid($recasterFid: String!, $limit: Int, $offset: Int) {
    boost_recast_records(
      where: { recasterFid: { _eq: $recasterFid } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      transactionHash
      recasterFid
      earnedAmount
      mindshareBoost {
        minMindshare
        mindshareFilterDuration
        user {
          displayName
          username
          fid
          pfpUrl
        }
        boostStatus
      }
    }
  }
`;

export const GetBoostRecastsByBoostIdGql = gql`
  query GetBoostRecastsByBoostId($boostId: uuid!, $limit: Int, $offset: Int) {
    boost_recast_records(
      where: { boostId: { _eq: $boostId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      recasterFid
      createdAt
      mindshare
      user {
        displayName
        username
        fid
        pfpUrl
      }
    }
  }
`;
