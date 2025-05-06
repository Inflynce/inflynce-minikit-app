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
  userName?: string;
  mindshare?: number;
}

export default function ShareRankButton({
  size = 'small',
  color = 'white',
  fid,
}: ShareIconButtonProps) {
  const handleClick = async () => {
    try {
      let shareText;
      let shareUrl;

      if (fid) {
        shareUrl = `${process.env.NEXT_PUBLIC_URL}/rank/${fid}`;
        shareText = `Check out my rank on @inflynce! What's your Inflynce Points?`;
      } else {
        shareUrl = `${process.env.NEXT_PUBLIC_URL}/rewards`;
        shareText = `Check out the leaderboard on @inflynce! What's your Inflynce Points?`;
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
      <ShareIcon fontSize={size} sx={{ fontSize: 12 }} />
    </IconButton>
  );
}
