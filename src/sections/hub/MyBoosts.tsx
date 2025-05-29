import { Avatar, AvatarGroup, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import { Box } from '@mui/material';
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { Mindshare_Boosts } from '@/__generated__/graphql';
import { GetBoostsByFidInfiniteQueryOptions } from '@/queryFn/getBoostsByFid';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { StyledCard } from '@/components/common/BaseCard';
import ShareBoostButton from '@/components/common/ShareBoostButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardSkeleton from '@/components/skeleton/CardSkeleton';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState } from 'react';
import RecastHistoryDialog from '@/sections/hub/RecastHistoryDialog';
interface MyBoostsProps {
  onBoostClick: () => void;
}

const MyBoosts = ({ onBoostClick }: MyBoostsProps) => {
  const { context } = useMiniKit();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    GetBoostsByFidInfiniteQueryOptions({
      keys: ['all'],
      variables: { fid: context?.user?.fid.toString() ?? '0' },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Mindshare_Boosts[]>>;

  const boosts = data?.pages.flatMap((page) => page) || [];

  const [selectedBoost, setSelectedBoost] = useState<Mindshare_Boosts | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (boost: Mindshare_Boosts) => {
    setSelectedBoost(boost);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBoost(null);
  };

  return (
    <Box width="100%" height="100%" sx={{ color: 'white' }}>
      <Button
        variant="contained"
        size="large"
        fullWidth
        startIcon={<BoltIcon />}
        onClick={onBoostClick}
      >
        Create a New Boost
      </Button>
      <Box height="100%" overflow="auto" sx={{ color: 'white' }} mt={2}>
        <InfiniteScroll
          dataLength={boosts.length}
          next={fetchNextPage}
          hasMore={isLoading || hasNextPage}
          loader={
            <Box textAlign="center" p={10}>
              <Typography variant="body1" gutterBottom>
                Loading more...
              </Typography>
            </Box>
          }
          endMessage={
            <Box textAlign="center" p={1}>
              <Typography variant="body1" gutterBottom>
                {boosts.length === 0
                  ? "You haven't created any boosts yet!"
                  : 'You have seen all your boosts!'}
              </Typography>
            </Box>
          }
          scrollableTarget="scrollableDiv"
          scrollThreshold="90%"
          style={{ width: '100%' }}
        >
          {isLoading ? (
            <CardSkeleton count={9} />
          ) : (
            boosts.map((boost) => (
              <StyledCard key={boost.id}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={boost.user?.pfpUrl || ''}
                    alt={boost.user?.displayName || 'User'}
                    sx={{
                      mr: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1">{boost.user?.displayName || 'User'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      @{boost.user?.username || 'user'}
                    </Typography>
                  </Box>
                  <Box ml="auto" display="flex" alignItems="center">
                    <Chip
                      label={boost.boostStatus}
                      size="small"
                      color={
                        boost.boostStatus === 'active'
                          ? 'success'
                          : boost.boostStatus === 'pending'
                            ? 'warning'
                            : boost.boostStatus === 'completed'
                              ? 'info'
                              : 'default'
                      }
                    />
                    <ShareBoostButton boostId={boost.id} />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mt={2}
                  width="100%"
                >
                  <Typography variant="body1" color="text.primary" gutterBottom>
                    Requirement:
                  </Typography>
                  <Box display="flex" gap={1} mb={1}>
                    <Chip
                      label={`${boost.mindshareFilterDuration}D Mindshare`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={`Mindshare ≥ ${boost.minMindshare}%`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body1" color="text.primary" gutterBottom>
                    Remaining Budget / Total Budget:
                  </Typography>
                  <Chip
                    label={`${boost.remainingBudget} / ${boost.campaignBudget} USDC`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography variant="body1" color="text.primary" gutterBottom>
                      Recaster:
                    </Typography>
                    <IconButton aria-label="Recast History" onClick={() => handleOpenDialog(boost)}>
                      <ManageSearchIcon fontSize="small" sx={{ color: '#ccc' }} />
                    </IconButton>
                  </Stack>
                  <AvatarGroup
                    total={boost.boostRecastRecords_aggregate?.aggregate?.count}
                    max={10}
                  >
                    {boost.boostRecastRecords?.map((recast) => (
                      <Avatar
                        src={recast.user?.pfpUrl || ''}
                        alt={recast.user?.displayName || ''}
                      />
                    ))}
                  </AvatarGroup>
                </Box>
              </StyledCard>
            ))
          )}
        </InfiniteScroll>
      </Box>
      <RecastHistoryDialog
        onClose={handleCloseDialog}
        open={openDialog}
        boostId={selectedBoost?.id}
      />
    </Box>
  );
};

export default MyBoosts;
