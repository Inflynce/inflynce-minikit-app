import React from 'react';
import { Box, Typography, Avatar, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BaseCard } from '@/components/common/BaseCard';
import { PointsChip } from './PointsChip';
import { MindshareChip } from './MindshareChip';
import { PointsEarnedTodayChip } from './PointsChip';
import { MindshareResult } from '@/__generated__/graphql';
import ShareIconButton from '@/components/common/ShareIconButton';

interface UserInfo {
  displayName?: string;
  username?: string;
  pfpUrl?: string;
  fid?: number;
  location?: {
    placeId: string;
    description: string;
  };
}

const StyledCard = styled(BaseCard)({
  zIndex: 1000,
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',
});

const StyledAvatar = styled(Avatar)(() => ({
  width: 48,
  height: 48,
}));

export const UserInfoCard: React.FC<{
  user: UserInfo;
  customElement?: React.ReactNode;
  mindshare?: MindshareResult;
}> = ({ user, customElement, mindshare }) => {
  return (
    <StyledCard elevation={0}>
      <Box py={2} px={1} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Stack direction="row" spacing={0} alignItems="flex-start" justifyContent="space-between">
          <StyledAvatar src={user.pfpUrl} alt={user.displayName} />

          <Box display="flex" flexDirection="column" justifyContent="space-between" px={1}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5, color: '#FFFFFF' }}>
              {user.displayName || 'Anonymous'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                mb: 1,
              }}
            >
              @{user.username || 'username'}
            </Typography>

            <Stack direction="row" spacing={1}>
              <PointsChip fid={user.fid ?? 0} />
              <PointsEarnedTodayChip fid={user.fid ?? 0} />
              <MindshareChip mindshare={mindshare?.currentMindshare} />
            </Stack>

            {user.location?.description && (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  mt: 1,
                }}
              >
                📍 {user.location.description}
              </Typography>
            )}
          </Box>

          <Box display="flex" alignItems="center">
            <ShareIconButton
              fid={user.fid?.toString() ?? '0'}
              displayName={user.displayName}
              userName={user.username}
              mindshare={mindshare?.currentMindshare}
              ml={0}
            />
          </Box>
        </Stack>
      </Box>
      {customElement}
    </StyledCard>
  );
};
