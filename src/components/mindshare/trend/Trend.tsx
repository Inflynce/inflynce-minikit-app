/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { GetTopMindshareInfinitQueryOptions } from '@/queryFn/getTopMindshare';
import { MINDSHARE_DURATION, MINDSHARE_FIELDS } from '@/utils/constants';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Avatar, Select, MenuItem, Stack, Typography } from '@mui/material';
import { UserDialog } from '../dialog/UserDialog';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { MindshareResult } from '@/__generated__/graphql';
import InfiniteScroll from 'react-infinite-scroll-component';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import Header from '@/components/common/Header';

export interface TopGainerProps {
  width?: string;
  height?: string;
  minHeight?: number;
  color?: {
    title?: string;
  };
  desc?: boolean;
}

const Cell = ({ value, currentValue }: { value: number; currentValue: number }) => (
  <TableCell
    align="center"
    sx={{
      px: 0.5,
      color: value >= currentValue ? '#4ade80' : '#ff4d4d',
      fontFamily: 'monospace',
      fontSize: '12px',
      width: '30%',
    }}
  >
    {Math.abs(value * 100).toFixed(2)}%
  </TableCell>
);

const getMindshare = (duration: string, user: MindshareResult) => {
  switch (duration) {
    case MINDSHARE_DURATION.THREE:
      return user.last3dMindshare;
    case MINDSHARE_DURATION.SEVEN:
      return user.last7dMindshare;
    case MINDSHARE_DURATION.THIRTY:
      return user.last30dMindshare;
    default:
      return user.last7dMindshare;
  }
};

export const Trend = ({ desc = true }: TopGainerProps) => {
  const [duration, setDuration] = useState(MINDSHARE_DURATION.THREE);
  const [field] = useState(MINDSHARE_FIELDS.MINDSHARE);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    GetTopMindshareInfinitQueryOptions({
      keys: [field, duration, 'desc'],
      variables: {
        duration,
        field,
        limit: 20,
        desc,
      },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<MindshareResult[]>>;

  const items: MindshareResult[] = data?.pages.flatMap((page: MindshareResult[]) => page) || [];

  const handleDurationClick = (duration: string) => {
    setDuration(duration);
  };

  const handleItemClick = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <Box width="100%" height="auto">
      <Header showAvatar />
      <Box
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
                You have seen all trend!
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
                      width: '50%',
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      px: 0.5,
                      fontWeight: 600,
                      width: '20%',
                    }}
                  >
                    Current
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      px: 0.5,
                      fontWeight: 600,
                      width: '20%',
                    }}
                  >
                    <Select
                      value={duration}
                      onChange={(e) => handleDurationClick(e.target.value)}
                      sx={{ width: '100%', maxWidth: '100px' }}
                      size="small"
                      variant="outlined"
                    >
                      <MenuItem value={MINDSHARE_DURATION.THREE} sx={{ color: 'black' }}>
                        3D
                      </MenuItem>
                      <MenuItem value={MINDSHARE_DURATION.SEVEN} sx={{ color: 'black' }}>
                        7D
                      </MenuItem>
                      <MenuItem value={MINDSHARE_DURATION.THIRTY} sx={{ color: 'black' }}>
                        30D
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ width: '100%' }}>
                {isLoading ? (
                  <TableSkeleton rows={16} columns={4} includeAvatar={true} />
                ) : (
                  items.map((user: MindshareResult) => (
                    <TableRow
                      key={user.fid}
                      onClick={() => handleItemClick(user)}
                      sx={{ cursor: 'pointer', width: '100%' }}
                    >
                      <TableCell sx={{ px: 0.5, textAlign: 'center' }}>{user.rank}</TableCell>
                      <TableCell
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          position: 'relative',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        <Avatar
                          alt={user.userInfo.displayName}
                          src={user.userInfo.pfpUrl}
                          sx={{ width: 30, height: 30, flexShrink: 0, mr: 0.5 }}
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
                            {user.userInfo.displayName}
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
                            @{user.userInfo.username}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center" sx={{ px: 0.5 }}>
                        {(user.currentMindshare * 100).toFixed(2)}%
                      </TableCell>
                      <Cell
                        value={getMindshare(duration, user)}
                        currentValue={user.currentMindshare}
                      />
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </InfiniteScroll>
      </Box>
      <UserDialog
        open={open}
        onClose={() => setOpen(false)}
        userInfo={selectedUser?.userInfo}
        userMindshare={selectedUser}
      />
    </Box>
  );
};
