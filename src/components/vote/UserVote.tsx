import React, { useState } from 'react';
import { Box, Typography, Skeleton, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetVoteSnapshotByFidAndWeekQueryOptions } from '@/queryFn/getVoteSnapshotByFidAndWeek';
import { GetVoteAggregatesQueryOptions } from '@/queryFn/getVoteAggregates';
import VoteButtons from './VoteButtons';
import VoteForm from './VoteForm';
import { textColor } from '@/utils/color';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { VoteDrawer } from '@/sections/vote/VoteDrawer';
import { getCurrentWeekStart } from '@/utils/dateUtils';
import { GetCryptoPriceQueryOptions } from '@/queryFn/getCryptoPrice';
import VoteStatsBar from './VoteStatsBar';

interface UserVoteProps {
  fid: string;
  isDarkMode?: boolean;
  onClose?: () => void;
}

export const UserVote: React.FC<UserVoteProps> = ({ fid, isDarkMode = true, onClose }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [voteType, setVoteType] = useState<'upvote' | 'downvote'>('upvote');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const color = isDarkMode ? textColor : 'black';

  // Fetch vote snapshot
  const { data, isLoading: isLoadingVoteSnapshot } = useQuery(
    GetVoteSnapshotByFidAndWeekQueryOptions({
      variables: {
        fid,
        weekStart: getCurrentWeekStart(),
      },
      options: { enabled: !!fid },
    })
  );

  const voteSnapshot = data?.[0] || null;

  const { data: voteAggregates, isLoading: isLoadingVoteAggregates } = useQuery(
    GetVoteAggregatesQueryOptions({
      variables: { snapshotId: voteSnapshot?.id },
      options: { enabled: !!voteSnapshot?.id },
    })
  );

  const { data: priceData } = useQuery(
    GetCryptoPriceQueryOptions({
      variables: {
        coinId: 'phavercoin',
        currency: 'usd',
      },
      options: {
        staleTime: 2 * 60 * 1000,
      },
    })
  );
  const socialUsdPrice = priceData?.phavercoin?.usd || 0;

  const usdcUpSum = voteAggregates?.upvotes?.usdc?.sum ?? 0;
  const socialUpSum = voteAggregates?.upvotes?.social?.sum ?? 0;
  const totalUpValue = (socialUpSum * socialUsdPrice + usdcUpSum).toFixed(2);

  const usdcDownSum = voteAggregates?.downvotes?.usdc?.sum ?? 0;
  const socialDownSum = voteAggregates?.downvotes?.social?.sum ?? 0;
  const totalDownValue = (socialDownSum * socialUsdPrice + usdcDownSum).toFixed(2);

  const handleDownvote = () => {
    setIsVoting(true);
    setVoteType('downvote');
  };

  const handleUpvote = () => {
    setIsVoting(true);
    setVoteType('upvote');
  };

  const handleCancel = () => {
    setIsVoting(false);
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  if (
    !isLoadingVoteSnapshot &&
    (!voteSnapshot || Number((voteSnapshot.mindshare * 100).toFixed(2)) < 0.01)
  ) {
    return (
      <Box
        py={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderRadius: 2,
          px: 2,
        }}
      >
        <Typography variant="body2" align="center" color={color}>
          Heads up! Your Neynar score is currently below 0.5 or your mindshare is below 0.01%, which
          means you can't vote for yourself just yet. This is an early testing phase with a limited
          userbase, and we'll gradually loosen this filter over time. In the meantime, feel free to
          vote for others or keep engaging to increase your score and unlock full functionality.
        </Typography>
      </Box>
    );
  }

  return (
    <Box py={2}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          variant="body1"
          textAlign="center"
          flexDirection="column"
          alignItems="center"
          display="flex"
          justifyContent="center"
          sx={{ color: isDarkMode ? 'white' : 'black', fontWeight: 700, fontSize: 12 }}
        >
          {isLoadingVoteSnapshot ? (
            <Skeleton variant="rectangular" width="50%" sx={{ bgcolor: 'grey.600' }} />
          ) : (
            `Last Week Mindshare: ${voteSnapshot?.mindshare ? (voteSnapshot.mindshare * 100).toFixed(2) : 0}%`
          )}
        </Typography>
      </Box>

      {/* Display vote status */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: isDarkMode ? 'white' : 'black',
            fontSize: 11,
            opacity: 0.8,
            fontStyle: voteSnapshot?.status === 'open' ? 'normal' : 'italic',
          }}
        >
          {isLoadingVoteSnapshot ? (
            <Skeleton variant="text" width="80px" sx={{ bgcolor: 'grey.600' }} />
          ) : (
            `Status: ${voteSnapshot?.status === 'open' ? 'Voting Open' : 'Voting Closed'}`
          )}
        </Typography>
      </Box>

      {/* Display remaining time */}
      {/* {voteSnapshot && (
        <VoteCountdown 
          weekStart={voteSnapshot.weekStart} 
          status={voteSnapshot.status}
          isDarkMode={isDarkMode}
        />
      )} */}

      <VoteButtons
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        voteAggregates={voteAggregates}
        isLoading={isLoadingVoteAggregates}
        isDarkMode={isDarkMode}
        isVoting={voteSnapshot?.status === 'open'}
      />

      <VoteStatsBar
        totalUpVoteAmount={Number(totalUpValue)}
        totalDownVoteAmount={Number(totalDownValue)}
        isDarkMode={isDarkMode}
      />

      {isVoting && (
        <VoteForm
          targetSnapshotId={voteSnapshot?.id}
          voteType={voteType}
          user={voteSnapshot?.user}
          onCancel={handleCancel}
          onSuccess={onClose}
        />
      )}

      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="text"
          size="small"
          onClick={handleOpenDrawer}
          endIcon={<KeyboardArrowRightIcon />}
          sx={{
            color: isDarkMode ? textColor : 'text.primary',
            fontSize: 12,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Vote History
        </Button>
      </Box>

      <VoteDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        voteSnapshot={voteSnapshot}
        showVoteComponent={false} // Don't show UserVote in drawer to avoid recursion
      />
    </Box>
  );
};

export default UserVote;
