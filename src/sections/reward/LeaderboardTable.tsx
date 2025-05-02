import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import Box from '@mui/material/Box';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { User_Points } from '@/__generated__/graphql';
import InfiniteScroll from 'react-infinite-scroll-component';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { GetLeaderBoardInfinitQueryOptions } from '@/queryFn/getPoints';
import { GetUserRankByFidQueryOptions } from '@/queryFn/getUserRankByFid';
import { UserDialog } from '@/components/mindshare/dialog/UserDialog';
import { useState } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
interface LeaderboardTableProps {}

export default function LeaderboardTable({}: LeaderboardTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { context } = useMiniKit();
  const fid = context?.user?.fid.toString() ?? '';

  const { data: userRank, isLoading: isUserRankLoading } = useQuery(
    GetUserRankByFidQueryOptions({
      keys: [fid],
      variables: {
        fid,
      },
      options: {
        enabled: !!fid,
      },
    })
  );

  console.log(userRank);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    GetLeaderBoardInfinitQueryOptions({
      keys: [],
      variables: {
        limit: 20,
      },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<User_Points[]>>;

  const items: User_Points[] = data?.pages.flatMap((page: User_Points[]) => page) || [];

  const handleItemClick = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <Box
      id="scrollableDivTrend"
      sx={{
        height: 'auto',
        width: '100%',
        '& .MuiTable-root': {
          borderCollapse: 'separate',
          borderSpacing: 0,
        },
        bgcolor: '#121212',
      }}
    >
      <Box sx={{ width: '100%', p: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isUserRankLoading ? (
          <Skeleton variant="text" width="100%" height={20} />
        ) : userRank && userRank[0]?.rank ? (
          <Typography variant="body1">🎉 Your rank: #{userRank[0].rank}</Typography>
        ) : (
          <Typography variant="body1">You don't have a rank yet. Start earning points! 🚀</Typography>
        )}
      </Box>
      <InfiniteScroll
        dataLength={items.length}
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
              You have seen all leaderboard!
            </Typography>
          </Box>
        }
        scrollableTarget="scrollableDiv"
        scrollThreshold="90%"
        style={{ width: '100%' }}
      >
        <Box sx={{ width: '100%' }}>
          <Table
            sx={{
              width: '100%',
              tableLayout: 'fixed',
              '& .MuiTableCell-root': {
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                py: 1.5,
                fontWeight: 600,
                padding: '8px 4px',
              },
              borderCollapse: 'collapse',
              borderSpacing: 0,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    px: 0.5,
                    fontWeight: 600,
                    width: '10%',
                  }}
                >
                  Rank
                </TableCell>
                <TableCell
                  sx={{
                    px: 0.5,
                    fontWeight: 600,
                    width: '60%',
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    px: 0.5,
                    fontWeight: 600,
                    width: '30%',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                    <Avatar src="/point.png" alt="Points" sx={{ width: 24, height: 24 }} />
                    <Typography variant="body1" fontWeight={600}>
                      IP
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ width: '100%' }}>
              {isLoading ? (
                <TableSkeleton rows={16} columns={3} includeAvatar={true} />
              ) : (
                items.map((userPoints: User_Points, index: number) => (
                  <TableRow
                    key={userPoints.fid}
                    sx={{ cursor: 'pointer', width: '100%' }}
                    onClick={() => handleItemClick(userPoints)}
                  >
                    <TableCell sx={{ px: 0.5, textAlign: 'center' }}>{index + 1}</TableCell>
                    <TableCell
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        pl: 0.5,
                        pr: 0.5,
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <Avatar
                        alt={userPoints.user?.displayName ?? ''}
                        src={userPoints.user?.pfpUrl ?? ''}
                        sx={{ width: 30, height: 30, flexShrink: 0 }}
                      />
                      <Stack
                        direction="column"
                        spacing={0.5}
                        sx={{
                          width: '100%',
                          overflow: 'hidden',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                          }}
                        >
                          {userPoints.user?.displayName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.7)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                          }}
                        >
                          @{userPoints.user?.username}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ px: 0.5 }}>
                      {userPoints.totalPoints}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </InfiniteScroll>
      <UserDialog open={open} onClose={() => setOpen(false)} userInfo={selectedUser?.user} />
    </Box>
  );
}
