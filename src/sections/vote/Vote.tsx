/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client';

import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  Stack,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  Chip,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { UserDialog } from '@/components/mindshare/dialog/UserDialog';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { Vote_Snapshot, Order_By } from '@/__generated__/graphql';
import InfiniteScroll from 'react-infinite-scroll-component';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { GetVoteSnapshotInfinitQueryOptions } from '@/queryFn/getVoteSnapshot';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { VoteDrawer } from './VoteDrawer';
import VoteForm from '../../components/vote/VoteForm';
import { getCurrentWeekStart } from '@/utils/dateUtils';
import VoteCountdown from '@/components/vote/VoteCountdown';
import InfoMenu from '@/components/common/InfoMenu';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import VoteSnapshotCard from './VoteSnapshotCard';
import CardSkeleton from '@/components/skeleton/CardSkeleton';
import Header from '@/components/common/Header';

export const Vote = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedVoteSnapshot, setSelectedVoteSnapshot] = useState<Vote_Snapshot | null>(null);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [selectedVoteType, setSelectedVoteType] = useState<'upvote' | 'downvote'>('upvote');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    GetVoteSnapshotInfinitQueryOptions({
      keys: ['vote_snapshot'],
      variables: {
        limit: 20,
        order_by: { mindshare: Order_By.Desc },
        weekStart: getCurrentWeekStart(),
      },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Vote_Snapshot[]>>;

  const voteSnapshots: Vote_Snapshot[] = data?.pages.flatMap((page: Vote_Snapshot[]) => page) || [];

  const handleItemClick = (item: Vote_Snapshot) => {
    setSelectedUser(item.user);
    setOpen(true);
  };

  const handleOpenDrawer = (item: Vote_Snapshot) => {
    setSelectedVoteSnapshot(item);
    setDrawerOpen(true);
  };

  const handleVoteClick = (item: Vote_Snapshot, type: 'upvote' | 'downvote') => {
    setSelectedVoteSnapshot(item);
    setSelectedVoteType(type);
    setIsVoteDialogOpen(true);
    setSelectedUser(item.user);
  };

  const handleCloseDialog = () => {
    setIsVoteDialogOpen(false);
  };

  const handleVoteSuccess = () => {
    handleCloseDialog();
    // You can add additional logic here like refreshing the vote count
  };

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'table' | 'card' | null
  ) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  return (
    <Box width="100%" height="auto" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Header title="Vote" showTitle={true} showVoteCountdown={true} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton
            value="card"
            aria-label="card view"
            size="small"
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ViewModuleIcon sx={{ fontSize: 12 }} />
          </ToggleButton>
          <ToggleButton
            value="table"
            aria-label="table view"
            size="small"
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ViewListIcon sx={{ fontSize: 12 }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          height: 'auto',
          '& .MuiTable-root': {
            borderCollapse: 'separate',
            borderSpacing: 0,
          },
        }}
      >
        <InfiniteScroll
          dataLength={voteSnapshots.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
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
                You have seen all voters!
              </Typography>
            </Box>
          }
          scrollableTarget="scrollableDiv"
          scrollThreshold="90%"
        >
          {viewMode === 'table' ? (
            <Table
              sx={{
                tableLayout: 'fixed',
                '& .MuiTableCell-root': {
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  py: 1.5,
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      pl: 0,
                      pr: 0.5,
                      left: 0,
                      zIndex: 1,
                      maxWidth: '30px',
                      width: '30px',
                      fontWeight: 600,
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0.5, width: '30px', fontWeight: 600 }}>
                    Last Week
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0.5, width: '30px', fontWeight: 600 }}>
                    Up / Down
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0.5, width: '30px', fontWeight: 600 }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0.5, width: '20px', fontWeight: 600 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableSkeleton rows={10} columns={4} includeAvatar={true} />
                ) : (
                  voteSnapshots.map((item: Vote_Snapshot) => (
                    <TableRow key={item.fid}>
                      <TableCell
                        onClick={() => handleItemClick(item)}
                        align="center"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          gap: 1.5,
                          pl: 0,
                          pr: 0.5,
                          zIndex: 1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          height: '65px',
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                          },
                        }}
                      >
                        <Avatar
                          alt={item.user?.displayName || ''}
                          src={item.user?.pfpUrl || ''}
                          sx={{ width: 20, height: 20 }}
                        />
                        <div
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span style={{ fontWeight: 500 }}>{item.user?.displayName}</span>
                        </div>
                      </TableCell>
                      <TableCell align="center" sx={{ px: 0.5, width: '30px' }}>
                        {(item.mindshare * 100).toFixed(2)}%
                      </TableCell>
                      <TableCell align="center" sx={{ px: 0.5, width: '30px' }}>
                        <ButtonGroup
                          variant="outlined"
                          size="small"
                          aria-label="vote buttons"
                          disabled={item.status !== 'open'}
                        >
                          <Button
                            onClick={() => handleVoteClick(item, 'upvote')}
                            sx={{
                              minWidth: '32px',
                              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                            }}
                          >
                            <ThumbUpAltOutlinedIcon
                              color={item.status === 'open' ? 'success' : 'disabled'}
                              sx={{ fontSize: 14 }}
                            />
                          </Button>
                          <Button
                            onClick={() => handleVoteClick(item, 'downvote')}
                            sx={{ minWidth: '32px' }}
                          >
                            <ThumbDownOutlinedIcon
                              color={item.status === 'open' ? 'error' : 'disabled'}
                              sx={{ fontSize: 14 }}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="center" sx={{ px: 0.5, width: '30px' }}>
                        <Chip
                          label={item.status === 'open' ? 'Open' : 'Closed'}
                          size="small"
                          color={item.status === 'open' ? 'success' : 'error'}
                          variant="filled"
                          sx={{
                            fontSize: 10,
                            '& .MuiChip-label': {
                              padding: '0 8px',
                            },
                            cursor: 'default',
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ px: 0.5, width: '20px' }}>
                        <IconButton aria-label="details" onClick={() => handleOpenDrawer(item)}>
                          <KeyboardArrowRightIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          ) : (
            <Box>
              {isLoading ? (
                <CardSkeleton count={9} />
              ) : (
                voteSnapshots.map((item: Vote_Snapshot) => (
                  <VoteSnapshotCard key={item.id} snapshot={item} />
                ))
              )}
            </Box>
          )}
        </InfiniteScroll>
      </Box>
      <UserDialog open={open} onClose={() => setOpen(false)} userInfo={selectedUser} />

      <VoteDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        voteSnapshot={selectedVoteSnapshot}
        showVoteComponent={true}
      />
      <Dialog open={isVoteDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <VoteForm
          targetSnapshotId={selectedVoteSnapshot?.id}
          voteType={selectedVoteType}
          user={selectedUser}
          onCancel={handleCloseDialog}
          onSuccess={handleVoteSuccess}
        />
      </Dialog>

      <InfoMenu />
    </Box>
  );
};
