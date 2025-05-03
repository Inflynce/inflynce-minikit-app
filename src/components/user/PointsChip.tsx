import React from 'react';
import {
  Chip,
  Avatar,
  ChipProps,
  DialogTitle,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { GetPointsByFidQueryOptions } from '@/queryFn/getPoints';
import { useQuery } from '@tanstack/react-query';
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined';
import { InflyncePointsInfo } from '@/components/dialogs/FAQContent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { GetPointTransactionsByFidQueryOptions } from '@/queryFn/getPointTransactionByFid';
import { POINT_TRANSACTION_TYPE } from '@/utils/constants';
import dynamic from 'next/dynamic';
import { formatPoints } from '@/utils/formatters';

const PointTransactionsDrawer = dynamic(
  () => import('@/components/mindshare/dialog/PointTransactionsDrawer'),
  { ssr: false }
);

interface PointsChipProps extends Omit<ChipProps, 'avatar' | 'label'> {
  showUnit?: boolean;
  avatarSrc?: string;
  fid: number | string;
  showInfoIcon?: boolean;
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
  showInfoIcon = true,
  ...chipProps
}) => {
  const { data: pointsData } = useQuery(
    GetPointsByFidQueryOptions({
      keys: [`${fid}`],
      variables: { fid: fid.toString() },
    })
  );
  const points = pointsData?.totalPoints ?? 0;
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const label = showUnit ? `${formatPoints(points)} IP` : formatPoints(points);

  const handleInfoClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setInfoDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setInfoDialogOpen(false);
  };

  const handleOpenDrawer = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
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
        onClick={handleOpenDrawer}
        onDelete={handleInfoClick}
        deleteIcon={showInfoIcon ? <InfoOutlineIcon /> : undefined}
        {...chipProps}
      />

      <Dialog open={infoDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Inflynce Points</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <InflyncePointsInfo />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <PointTransactionsDrawer fid={fid.toString()} open={drawerOpen} onClose={handleCloseDrawer} />
    </>
  );
};

export const PointsEarnedTodayChip: React.FC<PointsChipProps> = ({
  fid,
  showUnit = true,
  size = 'small',
  sx,
  showInfoIcon = true,
  ...chipProps
}) => {
  const { data: pointsData } = useQuery(
    GetPointTransactionsByFidQueryOptions({
      keys: [`${fid}`, POINT_TRANSACTION_TYPE.DAILY, '1'],
      variables: { fid: fid.toString(), type: POINT_TRANSACTION_TYPE.DAILY, limit: 1 },
    })
  );
  const pointEarnedToday = pointsData?.[0] ?? null;

  const label = showUnit
    ? `${formatPoints(pointEarnedToday?.points ?? 0)} IP`
    : formatPoints(pointEarnedToday?.points ?? 0);
  return (
    <>
      <Chip
        label={label}
        size={size}
        avatar={<TrendingUpIcon sx={{ color: `green !important` }} />}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.9)',
          fontWeight: 500,
          height: 24,
          ...sx,
        }}
        {...chipProps}
      />
    </>
  );
};
