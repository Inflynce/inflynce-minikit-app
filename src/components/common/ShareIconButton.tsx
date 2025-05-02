'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import sdk from '@farcaster/frame-sdk';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

interface ShareIconButtonProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fid?: string;
  displayName?: string;
  userName?: string;
  mindshare?: number;
}

export default function ShareIconButton({
  size = 'small',
  color = 'white',
  fid,
  displayName,
  userName,
  mindshare,
}: ShareIconButtonProps) {
  const { context } = useMiniKit();
  const handleClick = async () => {
    try {
      // Compose a cast with the URL
      const shareUrl = `${process.env.NEXT_PUBLIC_URL}/profile/${fid}`;
      let shareText;

      if (context?.user?.fid?.toString() === fid?.toString()) {
        shareText = `Check out my profile on @inflynce! What's your Mindshare Score and Inflynce Points?`;
      } else {
        shareText = `Check out @${userName}'s profile on @inflynce! What's your Mindshare Score and Inflynce Points?`;
      }


      await sdk.actions.composeCast({
        text: shareText,
        embeds: [shareUrl],
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      size={size}
      sx={{
        color,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        ml: 1,
      }}
    >
      <ShareIcon fontSize={size} />
    </IconButton>
  );
}
