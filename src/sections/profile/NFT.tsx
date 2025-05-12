'use client';

import { NFTMintCard, LifecycleStatus } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import { useAccount } from 'wagmi';
import type { TransactionReceipt } from 'viem';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  GetEarlyInflyncerNFTMindRecordByFidQueryOptions,
  InsertEarlyInflyncerNFTMindRecordMutationOptions,
} from '@/queryFn/earlyInflyncerNFT';
import { useIdentityToken } from '@privy-io/react-auth';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Button, Typography } from '@mui/material';
import { reportCustomError } from '@/utils/sentry';
import { useState } from 'react';
import { Box } from '@mui/material';
import EarlyInflyncerNFTDialog from '@/components/NFT/EarlyInflyncerNFTDialog';
import { handleFarcasterLogin } from '@/utils/auth';
import { useLoginToFrame } from '@privy-io/react-auth/farcaster';

export default function NFT() {
  const { address } = useAccount();
  const { identityToken } = useIdentityToken();
  const { context } = useMiniKit();
  const [tokenId, setTokenId] = useState<string>('9');
  const [open, setOpen] = useState(false);
  const { initLoginToFrame, loginToFrame } = useLoginToFrame();

  const { data: earlyInflyncerNFTMindRecord } = useQuery(
    GetEarlyInflyncerNFTMindRecordByFidQueryOptions({
      variables: { fid: context?.user.fid.toString() ?? '' },
      keys: ['earlyInflyncerNFTMindRecord'],
      token: identityToken ?? '',
    })
  );

  const isMinted = earlyInflyncerNFTMindRecord && earlyInflyncerNFTMindRecord.length > 0;

  console.log('earlyInflyncerNFTMindRecord', earlyInflyncerNFTMindRecord);

  const { mutate: insertEarlyInflyncerNFTMindRecord } = useMutation(
    InsertEarlyInflyncerNFTMindRecordMutationOptions({
      token: identityToken ?? '',
      options: {
        onSuccess: (data) => {
          console.log('data', data);
        },
      },
    })
  );

  const handleSuccess = async (transactionReceipt?: TransactionReceipt) => {
    if (transactionReceipt) {
      console.log('success', transactionReceipt);
      const { logs, from } = transactionReceipt;
      console.log('logs', logs);
      console.log('from', from);
      // Look for Transfer event logs (common in ERC721/ERC1155 contracts)
      const transferLog = logs.find(
        (log) =>
          // Standard ERC721 Transfer event has 3 topics (event signature + 3 indexed params)
          log.topics.length === 4 &&
          // Check if it's a Transfer event by comparing the event signature (first topic)
          log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
      );

      if (transferLog && transferLog.topics[3]) {
        console.log('Transfer log found:', transferLog);
        // The token ID is in the third topic (index 3) for standard ERC721 Transfer events
        const tokenIdHex = transferLog.topics[3];
        const tokenId = parseInt(tokenIdHex, 16);
        console.log('Minted NFT token ID:', tokenId);

        await insertEarlyInflyncerNFTMindRecord({
          fid: context?.user.fid.toString() ?? '',
          address: from ?? '',
          tokenId: tokenId.toString(),
        });

        setTokenId(tokenId.toString());
        setOpen(true);
      } else {
        console.log('No Transfer event found in logs or missing tokenId');
        reportCustomError(
          'No Transfer event found in logs or missing tokenId',
          {
            transactionReceipt,
            context: {
              fid: context?.user.fid.toString() ?? '',
              address: from ?? '',
            },
          },
          'error'
        );
      }
    }
  };

  const statusHandler = (status: LifecycleStatus) => {
    const { statusName, statusData } = status;
    console.log('statusName', statusName);
    console.log('statusData', statusData);
    switch (statusName) {
      case 'success':
      // handle success
      case 'error':
      // handle error
      default:
      // handle 'init' state
    }
  };

  const handleSignIn = () => {
    handleFarcasterLogin(initLoginToFrame, loginToFrame);
  };

  return (
    <Box>
      {isMinted ? (
        <NFTMintCard
          contractAddress={process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`}
        >
          <NFTMedia />
          <Typography color='primary' textAlign="right">#{earlyInflyncerNFTMindRecord?.[0]?.tokenId}</Typography>
        </NFTMintCard>
      ) : (
        <NFTMintCard
          contractAddress={process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`}
          onStatus={statusHandler}
          onError={(error) => console.log('error', error)}
          onSuccess={handleSuccess}
        >
          <NFTMedia />
          <NFTAssetCost />
          {!!identityToken ? (
            <NFTMintButton disabled={isMinted} />
          ) : (
            <Button variant="outlined" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </NFTMintCard>
      )}
      <EarlyInflyncerNFTDialog open={open} onClose={() => {}} tokenId={tokenId} />
    </Box>
  );
}
