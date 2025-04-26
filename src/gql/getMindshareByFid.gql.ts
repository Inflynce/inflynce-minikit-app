import { gql } from '../__generated__/gql';

const GetMindshareByFidGql = gql(/* GraphQL */ `
  query GetMindshareByFid($fid: String!) {
    getMindshareByFid(input: { fid: $fid }) {
      ...MindshareResult
    }
  }
`);

export { GetMindshareByFidGql };
