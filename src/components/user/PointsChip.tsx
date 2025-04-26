import React from 'react';
import { Chip, Avatar, ChipProps } from '@mui/material';
import { GetPointsByFidQueryOptions } from '@/queryFn/getPoints';
import { useQuery } from '@tanstack/react-query';

interface PointsChipProps extends Omit<ChipProps, 'avatar' | 'label'> {
  showUnit?: boolean;
  avatarSrc?: string;
  fid: number | string;
}

/**
 * A reusable component for displaying user points with an avatar
 */
export const PointsChip: React.FC<PointsChipProps> = ({
  fid,
  showUnit = true,
  avatarSrc = '/point.png',
  size = 'small',
  sx,
  ...chipProps
}) => {
  const { data: pointsData } = useQuery(
    GetPointsByFidQueryOptions({
      keys: [`${fid}`],
      variables: { fid: fid.toString() },
    })
  );
  const points = pointsData?.totalPoints ?? 0;

  const formatPoints = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)}B`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    } else {
      return value.toString();
    }
  };

  const label = showUnit ? `${formatPoints(points)} IP` : formatPoints(points);

  return (
    <Chip
      label={label}
      size={size}
      avatar={<Avatar src={avatarSrc} alt="Points" />}
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
