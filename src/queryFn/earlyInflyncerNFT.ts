import { authQueryFn } from './queryFn';
import {
  InsertEarlyInflyncerNftMindRecordMutation,
  InsertEarlyInflyncerNftMindRecordMutationVariables,
  Early_Inflyncer_Nft_Mind_Records,
  GetEarlyInflyncerNftMindRecordByFidQuery,
  GetEarlyInflyncerNftMindRecordByFidQueryVariables,
} from '@/__generated__/graphql';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import {
  GET_EARLY_INFLYNCER_NFT_MIND_RECORD_BY_FID,
  INSERT_EARLY_INFLYNCER_NFT_MIND_RECORD,
} from '@/gql/earlyInflyncerNFT.gql';

export interface InsertEarlyInflyncerNFTMindRecordInput {
  variables: InsertEarlyInflyncerNftMindRecordMutationVariables;
  token: string;
}

export const InsertEarlyInflyncerNFTMindRecord = async ({
  variables,
  token,
}: InsertEarlyInflyncerNFTMindRecordInput): Promise<Early_Inflyncer_Nft_Mind_Records> => {
  const data = (await authQueryFn({
    document: INSERT_EARLY_INFLYNCER_NFT_MIND_RECORD,
    variables,
    token,
  })) as InsertEarlyInflyncerNftMindRecordMutation;

  return (
    data.insert_early_inflyncer_nft_mind_records_one ?? {
      fid: '',
      address: '',
      id: '',
      tokenId: '',
    }
  );
};

interface InsertEarlyInflyncerNFTMindRecordOptionsProps {
  token: string;
  options?: Omit<
    UseMutationOptions<
      Early_Inflyncer_Nft_Mind_Records,
      Error,
      InsertEarlyInflyncerNftMindRecordMutationVariables
    >,
    'mutationFn'
  >;
}

export const InsertEarlyInflyncerNFTMindRecordMutationOptions = ({
  token,
  options,
}: InsertEarlyInflyncerNFTMindRecordOptionsProps): UseMutationOptions<
  Early_Inflyncer_Nft_Mind_Records,
  Error,
  InsertEarlyInflyncerNftMindRecordMutationVariables
> => {
  return {
    mutationFn: async (variables) => await InsertEarlyInflyncerNFTMindRecord({ variables, token }),
    ...options,
  };
};

// Get Early Inflyncer NFT Mind Record By Fid

interface GetEarlyInflyncerNFTMindRecordByFidProps {
  variables: GetEarlyInflyncerNftMindRecordByFidQueryVariables;
  token: string;
}

export const getEarlyInflyncerNFTMindRecordByFid = async ({
  variables,
  token,
}: GetEarlyInflyncerNFTMindRecordByFidProps): Promise<Early_Inflyncer_Nft_Mind_Records[]> => {
  const data = (await authQueryFn({
    document: GET_EARLY_INFLYNCER_NFT_MIND_RECORD_BY_FID,
    variables: { fid: variables.fid },
    token,
  })) as GetEarlyInflyncerNftMindRecordByFidQuery;

  return data.early_inflyncer_nft_mind_records ?? [];
};

interface GetEarlyInflyncerNFTMindRecordByFidOptionsProps
  extends GetEarlyInflyncerNFTMindRecordByFidProps {
  keys: string[];
  token: string;
  options?: Omit<UseQueryOptions<Early_Inflyncer_Nft_Mind_Records[]>, 'queryKey' | 'queryFn'>;
}

export const GetEarlyInflyncerNFTMindRecordByFidQueryOptions = ({
  keys = [],
  variables,
  token,
  options,
}: GetEarlyInflyncerNFTMindRecordByFidOptionsProps): UseQueryOptions<
  Early_Inflyncer_Nft_Mind_Records[]
> => {
  return {
    queryKey: ['GetEarlyInflyncerNFTMindRecordByFidQuery', ...keys],
    queryFn: async () => await getEarlyInflyncerNFTMindRecordByFid({ variables, token }),
    ...options,
  };
};
