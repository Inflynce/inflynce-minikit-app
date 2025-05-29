'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import sdk from '@farcaster/frame-sdk';

interface ShareIconButtonProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  boostId?: string;
  displayName?: string;
  userName?: string;
  mindshare?: number;
}

export default function ShareBoostButton({
  size = 'small',
  color = 'white',
  boostId,
}: ShareIconButtonProps) {
  const handleClick = async () => {
    try {
      const shareUrl = `${process.env.NEXT_PUBLIC_URL}/hub/boost/${boostId}`;
      const shareText = `My cast is now live with rewards on @inflynce! Tap, share and earn 🚀`;

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
      <ShareIcon fontSize={size} sx={{ fontSize: 12 }} />
    </IconButton>
  );
}
