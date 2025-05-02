import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { UserMindshareChart } from './UserMindshareChart';
import { UserMindshareTable } from './UserMindshareTable';
// import { UserVote } from '@/components/vote/UserVote';
import { MindshareResult, UserInfo } from '@/__generated__/graphql';
import { useQuery } from '@tanstack/react-query';
import { GetMindshareByFidQueryOptions } from '@/queryFn/getMindshareByFid';
import { Avatar, Box, Link, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { textColor } from '@/utils/color';
import ShareIconButton from '@/components/common/ShareIconButton';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  userInfo: UserInfo;
  userMindshare?: MindshareResult;
}

export const UserDialog: React.FC<UserDialogProps> = ({
  open,
  onClose,
  userInfo,
  userMindshare,
}) => {
  const { data: userMindshareData, isLoading: isLoadingMindshare } = useQuery(
    GetMindshareByFidQueryOptions({
      keys: [userInfo?.fid.toString()],
      variables: { fid: userInfo?.fid.toString() },
      options: { enabled: !userMindshare && !!userInfo?.fid },
    })
  );

  const mindshare = !!userMindshare ? userMindshare : userMindshareData;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
          color: '#fff',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          // maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle sx={{ p: 2 }}>
        <Box style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link href={`/profile/${userInfo?.fid}`}>
            <Avatar src={userInfo?.pfpUrl} alt={userInfo?.displayName} />
          </Link>
          <Box style={{ flex: 1 }}>
            <Link href={`/profile/${userInfo?.fid}`}>
              <Box
                sx={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {userInfo?.displayName}
              </Box>
            </Link>
            <div style={{ display: 'flex', gap: 2, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
              <span>@{userInfo?.username}</span>
            </div>
          </Box>
          <ShareIconButton
            fid={userInfo?.fid?.toString() ?? '0'}
            displayName={userInfo?.displayName}
            userName={userInfo?.username}
            mindshare={mindshare?.currentMindshare}
          />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        {/* <Divider
          variant="middle"
          sx={{
            '&::before, &::after': {
              borderColor: `${textColor} !important`,
              opacity: 0.3,
            },
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 12, color: 'white' }} gutterBottom>
            Vote
          </Typography>
        </Divider>
        <UserVote fid={userInfo?.fid.toString()} onClose={onClose} /> */}
        <Divider
          variant="middle"
          sx={{
            '&::before, &::after': {
              borderColor: `${textColor} !important`,
              opacity: 0.3,
            },
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 12, color: 'white' }} gutterBottom>
            Summary
          </Typography>
        </Divider>
        <UserMindshareTable
          isLoading={isLoadingMindshare}
          selectedUser={mindshare as MindshareResult}
        />
        <Divider
          variant="middle"
          sx={{
            '&::before, &::after': {
              borderColor: `${textColor} !important`,
              opacity: 0.3,
            },
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 12, color: 'white' }} gutterBottom>
            Daily Mindshare
          </Typography>
        </Divider>
        <UserMindshareChart
          isLoading={isLoadingMindshare}
          selectedUser={mindshare as MindshareResult}
        />
      </DialogContent>
    </Dialog>
  );
};
