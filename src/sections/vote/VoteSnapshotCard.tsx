import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip, Stack, Divider } from '@mui/material';
import { formatDate, formatCurrency, formatNumber } from '../../utils/formatters';
import { Vote_Snapshot } from '@/__generated__/graphql';
import UserVote from '@/components/vote/UserVote';

interface VoteSnapshotCardProps {
  snapshot: Vote_Snapshot;
}

const VoteSnapshotCard: React.FC<VoteSnapshotCardProps> = ({ snapshot }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // transition: 'transform 0.2s, box-shadow 0.2s',
        borderRadius: 0,
        // border: '1px solid #e0e0e0',
        mb: 1,
        p: 0,
        bgcolor: '#1E1E1E',
        color: 'white',
      }}
    >
      <Box sx={{ flexGrow: 1, p: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={snapshot.user?.pfpUrl || undefined}
            alt={snapshot.user?.displayName || undefined}
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{ color: 'white', fontSize: 16, fontWeight: 600 }}
            >
              {snapshot?.user?.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ color: 'white' }}>
              @{snapshot?.user?.username}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Stack spacing={1} sx={{ mb: 0 }}>
          <UserVote fid={snapshot.user?.fid || ''} isDarkMode={true} />
        </Stack>
      </Box>
    </Card>
  );
};

export default VoteSnapshotCard;
