import {
  Drawer,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Boost_Recast_Records } from '@/__generated__/graphql';
import {
  InfiniteData,
  DefinedUseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { GetBoostRecastRecordsByBoostInfiniteQueryOptions } from '@/queryFn/getBoostRecastsByBoost';
import InfiniteScroll from 'react-infinite-scroll-component';

interface RecastHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  boostId: string;
}

const RecastHistoryDialog = ({ open, onClose, boostId }: RecastHistoryDialogProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    GetBoostRecastRecordsByBoostInfiniteQueryOptions({
      variables: { boostId },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Boost_Recast_Records[]>>;

  const recastRecords = data?.pages.flatMap((page) => page) || [];

  console.log(isLoading);
  console.log(hasNextPage);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          background: '#121212',
          color: 'white',
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top={0}
        zIndex={1200}
        p={1}
        px={2}
        sx={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: '#121212',
        }}
      >
        <Typography variant="h6">Recast History</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box>
        <InfiniteScroll
          dataLength={recastRecords.length}
          next={fetchNextPage}
          hasMore={isLoading}
          loader={
            <Box textAlign="center" p={2}>
              <Typography variant="body1">Loading more...</Typography>
            </Box>
          }
          endMessage={
            <Box textAlign="center" p={2}>
              <Typography variant="body1">
                {recastRecords.length === 0
                  ? 'No recasts at the moment!'
                  : 'You have seen all recasts!'}
              </Typography>
            </Box>
          }
          scrollableTarget="scrollableDiv"
          scrollThreshold="90%"
          style={{ height: '100%' }}
        >
          <TableContainer>
            <Table sx={{ fontSize: 12 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>User</TableCell>
                  <TableCell>Mindshare</TableCell>
                  <TableCell>Recast Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recastRecords?.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Avatar
                        src={record.user?.pfpUrl || ''}
                        alt={record.user?.displayName || ''}
                        sx={{ width: 36, height: 36 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" flexDirection="column" gap={1}>
                        <Typography variant="body2" fontSize={12}>
                          {record.user?.displayName}
                        </Typography>
                        <Typography variant="body2" fontSize={10}>
                          @{record.user?.username}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: 12 }}>{record.mindshare * 100}%</TableCell>
                    <TableCell sx={{ fontSize: 12 }}>
                      {new Date(record.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </InfiniteScroll>
      </Box>
    </Drawer>
  );
};

export default RecastHistoryDialog;
