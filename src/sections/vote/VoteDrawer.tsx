import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Vote_Snapshot, Vote_Records } from '@/__generated__/graphql';
import { formatDistanceToNow } from 'date-fns';
import { GetVoteHistoryInfinitQueryOptions } from '@/queryFn/getVoteHistory';
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import dynamic from 'next/dynamic';
import { ListItemAvatar } from '@mui/material';

// Dynamically import UserVote to avoid circular dependencies
const UserVote = dynamic(() => import('@/components/vote/UserVote'), {
  loading: () => (
    <Box display="flex" justifyContent="center" py={2}>
      <CircularProgress size={24} />
    </Box>
  ),
  ssr: false,
});

interface VoteDrawerProps {
  open: boolean;
  onClose: () => void;
  voteSnapshot: Vote_Snapshot | null;
  showVoteComponent?: boolean;
}

export const VoteDrawer: React.FC<VoteDrawerProps> = ({
  open,
  onClose,
  voteSnapshot,
  showVoteComponent = false,
}) => {
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useInfiniteQuery(
    GetVoteHistoryInfinitQueryOptions({
      variables: {
        targetSnapshotId: voteSnapshot?.id || '',
        limit: 10,
      },
      keys: [voteSnapshot?.id || ''],
      options: {
        enabled: !!voteSnapshot?.id && open,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Vote_Records[]>>;

  const voteHistory = React.useMemo(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data]);

  if (!voteSnapshot) return null;

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          boxSizing: 'border-box',
          p: 2,
        },
        zIndex: 9998,
      }}
    >
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Vote History</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box mb={3}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              src={voteSnapshot.user?.pfpUrl || ''}
              alt={voteSnapshot.user?.displayName || ''}
              sx={{ width: 60, height: 60 }}
            />
            <Box>
              <Typography variant="h6">{voteSnapshot.user?.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">
                @{voteSnapshot.user?.username}
              </Typography>
            </Box>
          </Box>
        </Box>

        {showVoteComponent && voteSnapshot.user?.fid && (
          <Box mb={3}>
            <UserVote fid={voteSnapshot.user.fid.toString()} isDarkMode={false} />
          </Box>
        )}

        <Typography variant="h6" mb={2}>
          Voting History
        </Typography>

        <Box flex={1}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress size={24} />
            </Box>
          ) : error ? (
            <Typography color="error" align="center" my={2}>
              Failed to load vote history. Please try again later.
            </Typography>
          ) : !voteHistory || voteHistory.length === 0 ? (
            <Typography color="text.secondary" align="center" my={2}>
              No voting history found for this user.
            </Typography>
          ) : (
            <Box
              id="scrollableVoteHistory"
              sx={{
                height: '100%',
                // overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                  boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                  webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,.1)',
                  borderRadius: '10px',
                },
              }}
            >
              <InfiniteScroll
                dataLength={voteHistory.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                  <Box display="flex" justifyContent="center" py={2}>
                    <CircularProgress size={24} />
                  </Box>
                }
                scrollableTarget="scrollableVoteHistory"
              >
                <List>
                  {voteHistory.map((record, index) => (
                    <React.Fragment key={record.id}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            {record.voteType === 'up' ? (
                              <ThumbUpAltOutlinedIcon color="success" />
                            ) : (
                              <ThumbDownOutlinedIcon color="error" />
                            )}
                          </ListItemIcon>
                          <ListItemAvatar>
                            <Avatar
                              src={record.voter?.pfpUrl || ''}
                              alt={record.voter?.displayName || ''}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">
                                  {record.voter?.displayName}{' '}
                                  {record.voteType === 'up' ? 'upvoted' : 'downvoted'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {record.amount} {record.tokenType}
                                </Typography>
                              </Box>
                            }
                            secondary={formatDistanceToNow(new Date(record.createdAt), {
                              addSuffix: true,
                            })}
                          />
                        </ListItemButton>
                      </ListItem>
                      {index < voteHistory.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </InfiniteScroll>
            </Box>
          )}
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};
