import React from 'react';
import { Stack, Skeleton } from '@mui/material';

interface VoteButtonsSkeletonProps {
  width?: string | number;
  height?: number;
  color?: string;
  count?: number;
}

const VoteButtonsSkeleton: React.FC<VoteButtonsSkeletonProps> = ({
  width = '50%',
  height = 20,
  color = 'grey.600',
  count = 3,
}) => {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={`vote-skeleton-${index}`}
          variant="rectangular"
          width={width}
          height={height}
          sx={{ bgcolor: color }}
        />
      ))}
    </Stack>
  );
};

export default VoteButtonsSkeleton;
