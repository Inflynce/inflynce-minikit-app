'use client';

import { NFTMintCard, LifecycleStatus } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
// import { NFTAssetCost, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
// import type { TransactionReceipt } from 'viem';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  GetEarlyInflyncerNFTMindRecordByFidQueryOptions,
  //   InsertEarlyInflyncerNFTMindRecordMutationOptions,
} from '@/queryFn/earlyInflyncerNFT';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Button, Typography } from '@mui/material';
// import { reportCustomError } from '@/utils/sentry';
// import { useState } from 'react';
import { Box } from '@mui/material';
// import EarlyInflyncerNFTDialog from '@/components/NFT/EarlyInflyncerNFTDialog';
// import { useLoginToFrame } from '@privy-io/react-auth/farcaster';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import sdk from '@farcaster/frame-sdk';
import { useInflynceAuth } from '@/contexts/InflynceContext';

export default function NFT() {
  const { token, getToken } = useInflynceAuth();
  const { context } = useMiniKit();
  //   const [tokenId, setTokenId] = useState<string>('9');
  //   const [open, setOpen] = useState(false);

  const { data: earlyInflyncerNFTMindRecord } = useQuery(
    GetEarlyInflyncerNFTMindRecordByFidQueryOptions({
      variables: { fid: context?.user.fid.toString() ?? '' },
      keys: ['earlyInflyncerNFTMindRecord'],
      token: token ?? '',
    })
  );

  const isMinted = earlyInflyncerNFTMindRecord && earlyInflyncerNFTMindRecord.length > 0;

  //   const { mutate: insertEarlyInflyncerNFTMindRecord } = useMutation(
  //     InsertEarlyInflyncerNFTMindRecordMutationOptions({
  //       token: token ?? '',
  //       options: {
  //         onSuccess: (data) => {
  //           console.log('data', data);
  //         },
  //       },
  //     })
  //   );

  // Add a ref to track if we've already processed this transaction
  //   const [processedTxHashes, setProcessedTxHashes] = useState<Set<string>>(new Set());

  //   const handleSuccess = async (transactionReceipt?: TransactionReceipt) => {
  //     if (!transactionReceipt) return;

  //     // Check if we've already processed this transaction
  //     const txHash = transactionReceipt.transactionHash;
  //     if (processedTxHashes.has(txHash)) {
  //       console.log('Transaction already processed, skipping:', txHash);
  //       return;
  //     }

  //     // Mark this transaction as processed
  //     setProcessedTxHashes((prev) => new Set(prev).add(txHash));

  //     console.log('Processing transaction success:', txHash);
  //     const { logs, from } = transactionReceipt;

  //     // Look for Transfer event logs (common in ERC721/ERC1155 contracts)
  //     const transferLog = logs.find(
  //       (log) =>
  //         // Standard ERC721 Transfer event has 3 topics (event signature + 3 indexed params)
  //         log.topics.length === 4 &&
  //         // Check if it's a Transfer event by comparing the event signature (first topic)
  //         log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  //     );

  //     if (transferLog && transferLog.topics[3]) {
  //       console.log('Transfer log found:', transferLog);
  //       // The token ID is in the third topic (index 3) for standard ERC721 Transfer events
  //       const tokenIdHex = transferLog.topics[3];
  //       const tokenId = parseInt(tokenIdHex, 16);
  //       console.log('Minted NFT token ID:', tokenId);

  //       // Only insert if we don't already have a record for this user
  //       if (!earlyInflyncerNFTMindRecord || earlyInflyncerNFTMindRecord.length === 0) {
  //         console.log('Inserting new NFT mint record');
  //         await insertEarlyInflyncerNFTMindRecord({
  //           fid: context?.user.fid.toString() ?? '',
  //           address: from ?? '',
  //           tokenId: tokenId.toString(),
  //         });
  //       } else {
  //         console.log('NFT mint record already exists, skipping insert');
  //       }

  //       setTokenId(tokenId.toString());
  //       setOpen(true);
  //     } else {
  //       console.log('No Transfer event found in logs or missing tokenId');
  //       reportCustomError(
  //         'No Transfer event found in logs or missing tokenId',
  //         {
  //           transactionReceipt,
  //           context: {
  //             fid: context?.user.fid.toString() ?? '',
  //             address: from ?? '',
  //           },
  //         },
  //         'error'
  //       );
  //     }
  //   };

  // Use useCallback to prevent recreation of the function on re-renders
  //   const statusHandler = React.useCallback((status: LifecycleStatus) => {
  //     const { statusName, statusData } = status;
  //     switch (statusName) {
  //       case 'success':
  //       // handle success
  //       case 'error':
  //       // handle error
  //       default:
  //       // handle 'init' state
  //     }
  //   }, []);

  //   const handleSignIn = async () => {
  //     await getToken();
  //   };

  const handleShare = async () => {
    try {
      const shareUrl = `${process.env.NEXT_PUBLIC_URL}/earlyInflyncer`;
      const shareText = `I’m officially an Early Inflyncer! 🚀 Social capital is onchain now.`;
      await sdk.actions.composeCast({
        text: shareText,
        embeds: [shareUrl],
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <Box>
      {isMinted ? (
        <NFTMintCard
          contractAddress={process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`}
        >
          <NFTMedia />
          <Typography color="primary" textAlign="right">
            #{earlyInflyncerNFTMindRecord?.[0]?.tokenId}
          </Typography>
          <Button
            variant="contained"
            onClick={handleShare}
            fullWidth
            sx={{
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: 'white',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none',
              mb: 1,
              '&:hover': {
                background: (theme) =>
                  `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: (theme) => `0 4px 15px ${theme.palette.primary.main}40`,
              },
            }}
          >
            Your Social Influence, Onchain
            <ShareIcon sx={{ fontSize: 14, ml: 1 }} />
          </Button>
        </NFTMintCard>
      ) : (
        <Box
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            textAlign: 'left',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body1" gutterBottom>
            You just missed step 0 but you're right on time for what comes next.
          </Typography>

          <Typography variant="body1" gutterBottom>
            Early Inflyncer Genesis NFT is now sold out. It was proof of early trust and hundreds
            claimed it.
          </Typography>

          <Typography variant="body1" gutterBottom>
            But this was just the beginning. Your onchain journey starts here. New roles, new
            rewards and new missions are coming.
          </Typography>

          <Typography variant="body1" gutterBottom>
            ... and it's still early.
          </Typography>

          <Typography variant="body1" gutterBottom>
            Stay tuned, your influence is just getting started, onchain.
          </Typography>
        </Box>
      )}
      {/* <EarlyInflyncerNFTDialog open={open} onClose={() => {}} tokenId={tokenId} /> */}
    </Box>
  );
}
