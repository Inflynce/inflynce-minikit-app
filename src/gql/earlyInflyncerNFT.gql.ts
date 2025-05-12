import { gql } from 'graphql-request';

export const INSERT_EARLY_INFLYNCER_NFT_MIND_RECORD = gql`
  mutation InsertEarlyInflyncerNFTMindRecord($fid: String!, $address: String!, $tokenId: String!) {
    insert_early_inflyncer_nft_mind_records_one(
      object: { fid: $fid, address: $address, tokenId: $tokenId }
    ) {
      id
      fid
      address
      tokenId
      createdAt
    }
  }
`;

export const GET_EARLY_INFLYNCER_NFT_MIND_RECORD_BY_FID = gql`
  query GetEarlyInflyncerNFTMindRecordByFid($fid: String!) {
    early_inflyncer_nft_mind_records(where: { fid: { _eq: $fid } }) {
      id
      fid
      address
      tokenId
      createdAt
    }
  }
`;
