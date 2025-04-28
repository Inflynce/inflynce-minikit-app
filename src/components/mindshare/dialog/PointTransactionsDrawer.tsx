import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
  Stack,
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Point_Transactions } from '@/__generated__/graphql';
import {
  InfiniteData,
  useInfiniteQuery,
  DefinedUseInfiniteQueryResult,
} from '@tanstack/react-query';
import { GetPointTransactionsByFidInfiniteQueryOptions } from '@/queryFn/getPointTransactionByFid';
import { POINT_TRANSACTION_TYPE } from '@/utils/constants';
import { formatMindshare } from '@/utils/formatters';
interface PointTransactionsDrawerProps {
  open: boolean;
  onClose: () => void;
  fid: string;
}

export const PointTransactionsDrawer: React.FC<PointTransactionsDrawerProps> = ({
  open,
  onClose,
  fid,
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    GetPointTransactionsByFidInfiniteQueryOptions({
      keys: [fid.toString(), 'all'],
      variables: { fid: fid.toString(), type: POINT_TRANSACTION_TYPE.DAILY, limit: 20 },
      options: {
        enabled: !!fid && open,
      },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Point_Transactions[]>>;

  const transactions = data?.pages.flatMap((page) => page) || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getTransactionTitle = (type: string) => {
    if (POINT_TRANSACTION_TYPE.DAILY === type) {
      return 'Daily Rewarded IP';
    }
    return 'Point Transaction';
  };

  const getTransactionDescription = (type: string, transaction: Point_Transactions) => {
    if (POINT_TRANSACTION_TYPE.DAILY === type) {
      return `Daily Rewarded IP for Mindshare: ${formatMindshare(transaction.mindshare)}`;
    }
    return '';
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          background: '#1a1a2e',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Inflynce Point History</Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {transactions.map((transaction, index) => (
                <React.Fragment key={transaction.id || index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Inflynce" src="/logo.png" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body1">
                            {getTransactionTitle(transaction.type)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={transaction.points > 0 ? 'success.main' : 'error.main'}
                          >
                            {transaction.points > 0 ? '+' : ''}
                            {transaction.points}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            {getTransactionDescription(transaction.type, transaction)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(transaction.date)}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < transactions.length - 1 && (
                    <Divider component="li" sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  )}
                </React.Fragment>
              ))}
            </List>

            {hasNextPage && (
              <Box display="flex" justifyContent="center" my={2}>
                <Button
                  variant="outlined"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </Button>
              </Box>
            )}

            {transactions.length === 0 && (
              <Box textAlign="center" my={4}>
                <Typography variant="body1">No point transactions found</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default PointTransactionsDrawer;
