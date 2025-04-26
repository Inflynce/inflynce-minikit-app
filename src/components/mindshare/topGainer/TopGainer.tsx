/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { GetTopMindshareInfinitQueryOptions } from '@/queryFn/getTopMindshare';
import { MINDSHARE_DURATION, MINDSHARE_FIELDS } from '@/utils/constants';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Skeleton, Stack, Typography } from '@mui/material';
import { UserDialog } from '../dialog/UserDialog';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { MindshareResult } from '@/__generated__/graphql';
import InfiniteScroll from 'react-infinite-scroll-component';
import Avatar from '@mui/material/Avatar';
import TableSkeleton from '@/components/skeleton/TableSkeleton';

export interface TopGainerProps {
  width?: string;
  height?: string;
  minHeight?: number;
  color?: {
    title?: string;
  };
  desc?: boolean;
  field?: string;
}

const getDeltaColor = (value: number) => {
  return value >= 0 ? '#4ade80' : '#ff4d4d';
};

const DeltaCell = ({ value, isRelative }: { value: number; isRelative: boolean }) => (
  <TableCell
    align="center"
    sx={{
      px: 0.5,
      color: getDeltaColor(value),
      fontFamily: 'monospace',
      fontSize: '12px',
    }}
  >
    {value >= 0 ? '▲' : '▼'}
    {Math.abs(value).toFixed(0)}
    {isRelative ? '%' : 'bps'}
  </TableCell>
);

export const TopGainer = ({ desc = true, field = MINDSHARE_FIELDS.ABSOLUTE }: TopGainerProps) => {
  const [duration, setDuration] = useState(MINDSHARE_DURATION.THREE);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const isAbsolute = field === MINDSHARE_FIELDS.ABSOLUTE;

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    GetTopMindshareInfinitQueryOptions({
      keys: [field, duration, desc ? 'desc' : 'asc'],
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
    <Box width="100%" height="100%">
      <Box
        sx={{
          '& .MuiTable-root': {
            borderCollapse: 'separate',
            borderSpacing: 0,
          },
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
                {`You have seen all top ${desc ? 'gainers' : 'losers'}!`}
              </Typography>
            </Box>
          }
          scrollableTarget="scrollableDiv"
          scrollThreshold="70%"
        >
          <Table
            sx={{
              tableLayout: 'fixed',
              minWidth: 420, // Ensure table is wider than container to enable scroll
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
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    maxWidth: '40px',
                    width: '40px',
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
                  # Name
                </TableCell>
                <TableCell align="center" sx={{ px: 0.5, width: '30px' }}>
                  Current
                </TableCell>
                <TableCell align="center" sx={{ px: 0.5, width: '30px' }}>
                  <Button
                    fullWidth
                    size="small"
                    onClick={() => handleDurationClick(MINDSHARE_DURATION.THREE)}
                    variant={duration === MINDSHARE_DURATION.THREE ? 'contained' : 'outlined'}
                  >
                    Δ3D
                  </Button>
                </TableCell>
                <TableCell align="center" sx={{ px: 0.5, width: '30px' }}>
                  <Button
                    fullWidth
                    size="small"
                    onClick={() => handleDurationClick(MINDSHARE_DURATION.SEVEN)}
                    variant={duration === MINDSHARE_DURATION.SEVEN ? 'contained' : 'outlined'}
                  >
                    Δ7D
                  </Button>
                </TableCell>
                <TableCell align="center" sx={{ px: 0.5, width: '30px' }}>
                  <Button
                    fullWidth
                    size="small"
                    onClick={() => handleDurationClick(MINDSHARE_DURATION.THIRTY)}
                    variant={duration === MINDSHARE_DURATION.THIRTY ? 'contained' : 'outlined'}
                  >
                    Δ30D
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableSkeleton rows={10} columns={5} includeAvatar={true} />
              ) : (
                items.map((user: any, index: number) => (
                  <TableRow
                    key={user.fid}
                    onClick={() => handleItemClick(user)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        pl: 0,
                        pr: 0.5,
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
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
                      <span>{index + 1}</span>
                      <Avatar
                        alt={user.userInfo.displayName}
                        src={user.userInfo.pfpUrl}
                        sx={{ width: 20, height: 20 }}
                      />
                      <div
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span style={{ fontWeight: 500 }}>{user.userInfo.displayName}</span>
                        {/* <span
                        style={{
                          color: 'rgba(255,255,255,0.5)',
                          marginLeft: 8,
                          fontSize: '12px',
                        }}
                      >
                        @{user.userInfo.username}
                      </span> */}
                      </div>
                    </TableCell>
                    <TableCell align="center" sx={{ px: 0.5, width: '30px' }}>
                      {(user.currentMindshare * 100).toFixed(2)}%
                    </TableCell>
                    <DeltaCell
                      value={isAbsolute ? user.change3d : user.changeRatio3d}
                      isRelative={!isAbsolute}
                    />
                    <DeltaCell
                      value={isAbsolute ? user.change7d : user.changeRatio7d}
                      isRelative={!isAbsolute}
                    />
                    <DeltaCell
                      value={isAbsolute ? user.change30d : user.changeRatio30d}
                      isRelative={!isAbsolute}
                    />
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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
