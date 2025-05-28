import { Avatar, Chip, Typography } from '@mui/material';
import { Box } from '@mui/material';
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useMiniKit, useOpenUrl } from '@coinbase/onchainkit/minikit';
import { StyledCard } from '@/components/common/BaseCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardSkeleton from '@/components/skeleton/CardSkeleton';
import { GetBoostRecastRecordsByFidInfiniteQueryOptions } from '@/queryFn/getBoostRecastsByFid';
import { Boost_Recast_Records } from '@/__generated__/graphql';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShareBoostEarningButton from '@/components/common/ShareBoostEarningButton';

interface MyEarnProps {}

const MyEarn = ({}: MyEarnProps) => {
  const { context } = useMiniKit();
  const openUrl = useOpenUrl();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    GetBoostRecastRecordsByFidInfiniteQueryOptions({
      keys: ['all'],
      variables: { recasterFid: context?.user?.fid.toString() ?? '0' },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Boost_Recast_Records[]>>;

  const boosts = data?.pages.flatMap((page) => page) || [];
  console.log(boosts);
  return (
    <Box width="100%" height="100%" sx={{ color: 'white', bgcolor: 'transparent' }}>
      <Box height="auto" overflow="auto" sx={{ color: 'white' }} mt={2}>
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
            <Box textAlign="left" p={1}>
              <Typography variant="body1" gutterBottom>
                {boosts.length === 0 ? (
                  <>
                    <Typography variant="body1" gutterBottom>
                      No earnings yet but you're close. ⚡
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Check the Ongoing Boosts tab to find eligible tasks. Share high-signal casts
                      and start earning based on your Mindshare.
                    </Typography>
                  </>
                ) : (
                  'You have seen all your boosts!'
                )}
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
                    src={boost.mindshareBoost?.user?.pfpUrl || ''}
                    alt={boost.mindshareBoost?.user?.displayName || 'User'}
                    sx={{
                      mr: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1">
                      {boost.mindshareBoost?.user?.displayName || 'User'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      @{boost.mindshareBoost?.user?.username || 'user'}
                    </Typography>
                  </Box>
                  <Box ml="auto" display="flex" alignItems="center">
                    <Chip
                      label={boost.mindshareBoost?.boostStatus}
                      size="small"
                      color={
                        boost.mindshareBoost?.boostStatus === 'active'
                          ? 'success'
                          : boost.mindshareBoost?.boostStatus === 'pending'
                            ? 'warning'
                            : boost.mindshareBoost?.boostStatus === 'completed'
                              ? 'info'
                              : 'default'
                      }
                    />
                    <ShareBoostEarningButton recastId={boost.id} />
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
                      label={`${boost.mindshareBoost?.mindshareFilterDuration}D Mindshare`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={`Mindshare ≥ ${boost.mindshareBoost?.minMindshare}%`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body1" color="text.primary" gutterBottom>
                    Earned Amount:
                  </Typography>
                  <Box display="flex" gap={1} mb={1}>
                    <Chip
                      label={`${boost.earnedAmount} USDC`}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <Typography variant="body1" color="text.primary" gutterBottom>
                    Transaction:
                  </Typography>
                  <Chip
                    label={`${boost.transactionHash}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    deleteIcon={<OpenInNewIcon />}
                    onDelete={() => {
                      openUrl('https://basescan.org/tx/' + boost.transactionHash);
                    }}
                  />
                </Box>
                <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}></Box>
              </StyledCard>
            ))
          )}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default MyEarn;
