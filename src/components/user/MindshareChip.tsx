import React from 'react';
import { Chip, Avatar, ChipProps } from '@mui/material';

interface MindshareChipProps extends Omit<ChipProps, 'avatar' | 'label'> {
  showUnit?: boolean;
  avatarSrc?: string;
  mindshare?: number;
}

/**
 * A reusable component for displaying user points with an avatar
 */
export const MindshareChip: React.FC<MindshareChipProps> = ({
  showUnit = true,
  avatarSrc = '/point.png',
  size = 'small',
  sx,
  mindshare,
  ...chipProps
}) => {
  const label = mindshare ? `${(mindshare * 100).toFixed(2)}%` : '0%';

  return (
    <Chip
      label={label}
      size={size}
      avatar={
        <Avatar alt="Mindshare" color="primary">
          M
        </Avatar>
      }
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: 500,
        height: 24,
        ...sx,
      }}
      {...chipProps}
    />
  );
};
