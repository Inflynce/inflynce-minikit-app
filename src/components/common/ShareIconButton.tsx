'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import sdk from '@farcaster/frame-sdk';

interface ShareIconButtonProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fid?: string;
  displayName?: string;
  mindshare?: number;
}

export default function ShareIconButton({
  size = 'small',
  color = 'white',
  fid,
  displayName,
  mindshare,
}: ShareIconButtonProps) {
  const handleClick = async () => {
    try {
      // Compose a cast with the URL
      const shareUrl = `${process.env.NEXT_PUBLIC_URL}/profile/${fid}`;
      const shareText = `Check out ${displayName}'s profile on Inflynce with a mindshare of ${((mindshare || 0) * 100).toFixed(2)}%!`;

      await sdk.actions.composeCast({
        text: encodeURIComponent(shareText),
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
