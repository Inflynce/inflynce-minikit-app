import { gql } from '../__generated__/gql';

export const GetVoteAggregatesGql = gql(`
  query GetVoteAggregates($snapshotId: uuid!) {
    upvotes_usdc: vote_records_aggregate(
      where: {
        targetSnapshotId: {_eq: $snapshotId}, 
        voteType: {_eq: "up"}, 
        tokenType: {_eq: "usdc"}
        }
    ) {
      aggregate {
        count(columns: id)
        sum {
          amount
        }
      }
    }
    
    upvotes_social: vote_records_aggregate(
      where: {
        targetSnapshotId: {_eq: $snapshotId}, 
        voteType: {_eq: "up"}, 
        tokenType: {_eq: "social"}
      }
    ) {
      aggregate {
        count(columns: id)
        sum {
          amount
        }
      }
    }
    
    downvotes_usdc: vote_records_aggregate(
      where: {
        targetSnapshotId: {_eq: $snapshotId}, 
        voteType: {_eq: "down"}, 
        tokenType: {_eq: "usdc"}
      }
    ) {
      aggregate {
        count(columns: id)
        sum {
          amount
        }
      }
    }
    
    downvotes_social: vote_records_aggregate(
      where: {
        targetSnapshotId: {_eq: $snapshotId}, 
        voteType: {_eq: "down"}, 
        tokenType: {_eq: "social"}
      }
    ) {
      aggregate {
        count(columns: id)
        sum {
          amount
        }
      }
    }
  }
`);
