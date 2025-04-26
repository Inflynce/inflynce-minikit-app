import { gql } from 'graphql-request';

export const GetCryptoPriceGql = gql`
  query GetCryptoPrice($coinId: String!, $currency: String!) {
    getCryptoPrice(input: { coinId: $coinId, currency: $currency }) {
      phavercoin {
        usd
      }
    }
  }
`;
