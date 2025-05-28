import {
  Avatar,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
  Chip,
  AvatarGroup,
} from '@mui/material';
import { Box } from '@mui/material';
import { Mindshare_Boosts } from '@/__generated__/graphql';
import { GetBoostsInfiniteQueryOptions } from '@/queryFn/getBoosts';
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { StyledCard } from '@/components/common/BaseCard';
import ShareBoostButton from '@/components/common/ShareBoostButton';
import { GetMindshareByFidQueryOptions } from '@/queryFn/getMindshareByFid';
import { useMiniKit, useOpenUrl } from '@coinbase/onchainkit/minikit';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardSkeleton from '@/components/skeleton/CardSkeleton';
import { useState } from 'react';
import { VerifyBoostRecastMutationOptions } from '@/queryFn/verifyBoostRecast';
import { useInflynceAuth } from '@/contexts/InflynceContext';
import { sdk } from '@farcaster/frame-sdk';
import { useSnackbar } from '@/contexts/SnackbarContext';

interface OngoingBoostsProps {}

const OngoingBoosts = ({}: OngoingBoostsProps) => {
  const { context } = useMiniKit();
  const openUrl = useOpenUrl();
  const { token, getToken } = useInflynceAuth();
  const { showSnackbar } = useSnackbar();

  const [verifyLoading, setVerifyLoading] = useState<string | null>(null);

  const { data: mindshareData, isLoading: mindshareLoading } = useQuery(
    GetMindshareByFidQueryOptions({
      keys: [`${context?.user?.fid ?? 0}`],
      variables: {
        fid: context?.user?.fid.toString() ?? '0',
      },
      options: {
        enabled: !!context?.user?.fid,
      },
    })
  );

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    GetBoostsInfiniteQueryOptions({
      keys: ['all'],
      variables: { limit: 10 },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Mindshare_Boosts[]>>;

  const boosts = data?.pages.flatMap((page) => page) || [];

  const { mutate: verifyBoostRecast } = useMutation(
    VerifyBoostRecastMutationOptions({
      token: token ?? '',
      options: {
        onSuccess: (response) => {
          if (response.status === 200) {
            showSnackbar('Recast verified successfully', 'success');
            refetch();
          } else {
            showSnackbar('Failed to verify recast', 'error');
          }
          setVerifyLoading(null);
        },
        onError: () => {
          setVerifyLoading(null);
          showSnackbar('Failed to verify recast', 'error');
        },
      },
    })
  );

  const calculateEarnings = (boost: Mindshare_Boosts): { value: string; isEligible: boolean } => {
    const { mindshareFilterDuration, minMindshare } = boost;

    if (!mindshareData) return { value: 'Not Eligible', isEligible: false };

    const mindshareMap = {
      3: mindshareData.last3dMindshare,
      7: mindshareData.last7dMindshare,
      30: mindshareData.last30dMindshare,
    };

    const currentMindshare = mindshareMap[mindshareFilterDuration as keyof typeof mindshareMap];

    if (currentMindshare * 100 >= minMindshare) {
      return {
        value: (currentMindshare * 100 * 0.5 * 0.9).toFixed(6),
        isEligible: true,
      };
    }

    return { value: 'Not Eligible', isEligible: false };
  };

  const handleRecast = async (boost: Mindshare_Boosts) => {
    openUrl(boost.castUrl);
  };

  const handleRecastVerify = async (boost: Mindshare_Boosts) => {
    try {
      setVerifyLoading(boost.id);
      const provider = await sdk.wallet.getEthereumProvider();
      const accounts = await provider?.request({ method: 'eth_accounts' });
      const userAddress = accounts?.[0];
      if (!userAddress) {
        showSnackbar('No user address found', 'error');
      }
      verifyBoostRecast({
        boostId: boost.id,
        userId: context?.user?.fid.toString() ?? '0',
        address: userAddress as string,
      });
    } catch (error) {
      console.error('Failed to verify recast:', error);
      showSnackbar('Failed to verify recast', 'error');
    }
  };

  return (
    <Box width="100%" height="100%" sx={{ color: 'white', bgcolor: '#121212' }}>
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
          <Box textAlign="center" p={10}>
            <Typography variant="body1" gutterBottom>
              {boosts.length === 0
                ? 'No ongoing boosts at the moment! Create a new boost to get started.'
                : 'You have seen all ongoing boosts!'}
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
                <Box width="100%" textAlign="right" mt={1}>
                  <Typography variant="body2" color="text.secondary" component="span">
                    {calculateEarnings(boost).isEligible ? 'Estimated Earnings: ' : ''}
                    <Box component="span" sx={{ color: 'primary.main' }}>
                      {calculateEarnings(boost).value}
                    </Box>
                    {calculateEarnings(boost).isEligible ? ' USDC' : ''}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <AvatarGroup total={boost.boostRecastRecords_aggregate?.aggregate?.count} max={4}>
                  {boost.boostRecastRecords?.map((recast) => (
                    <Avatar
                      sizes="small"
                      src={recast.user?.pfpUrl || ''}
                      alt={recast.user?.displayName || ''}
                    />
                  ))}
                </AvatarGroup>
                <ButtonGroup variant="outlined" size="small">
                  <Button
                    onClick={() => handleRecastVerify(boost)}
                    disabled={
                      verifyLoading === boost.id ||
                      boost.boostRecastRecords?.some(
                        (record) => record.recasterFid === context?.user?.fid.toString()
                      )
                    }
                    startIcon={verifyLoading === boost.id ? <CircularProgress size={20} /> : null}
                  >
                    {boost.boostRecastRecords?.some(
                      (record) => record.recasterFid === context?.user?.fid.toString()
                    )
                      ? 'Verified'
                      : 'Verify'}
                  </Button>
                  <Button sx={{ color: 'primary.main' }} onClick={() => handleRecast(boost)}>
                    View & Recast
                  </Button>
                </ButtonGroup>
              </Box>
            </StyledCard>
          ))
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default OngoingBoosts;
