import {
  GetCryptoPriceQuery,
  Vote_Records,
  GetCryptoPriceQueryVariables,
  CryptoPriceOutput,
} from '@/__generated__/graphql';
import { UseQueryOptions } from '@tanstack/react-query';
import { queryFn } from './queryFn';
import { GetCryptoPriceGql } from '@/gql/getCryptoPrice.gql';

interface GetCryptoPriceProps {
  variables: GetCryptoPriceQueryVariables;
}

export const GetCryptoPrice = async ({
  variables,
}: GetCryptoPriceProps): Promise<CryptoPriceOutput> => {
  const data = (await queryFn({
    document: GetCryptoPriceGql,
    variables,
  })) as GetCryptoPriceQuery;

  return (data.getCryptoPrice as CryptoPriceOutput) ?? [];
};

interface GetCryptoPriceQueryOptionsProps extends GetCryptoPriceProps {
  keys?: string[];
  options?: Omit<UseQueryOptions<CryptoPriceOutput>, 'queryKey' | 'queryFn'>;
}

export const GetCryptoPriceQueryOptions = ({
  keys = [],
  variables,
  options,
}: GetCryptoPriceQueryOptionsProps): UseQueryOptions<CryptoPriceOutput> => {
  return {
    queryKey: ['GetCryptoPriceQuery', ...keys],
    queryFn: async () => await GetCryptoPrice({ variables }),
    ...options,
  };
};
