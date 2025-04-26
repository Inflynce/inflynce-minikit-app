import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
} from '@mui/material';
import {
  InfiniteData,
  DefinedUseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { GetVoteByVoterInfinitQueryOptions } from '@/queryFn/getVoteByVoter';
import { Vote_Records } from '@/__generated__/graphql';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { formatDistanceToNow, format } from 'date-fns';
import { textColor } from '@/utils/color';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';

interface VoterVoteRecordsProps {
  voterId: string;
  maxHeight?: string | number;
}

export const VoterVoteRecords: React.FC<VoterVoteRecordsProps> = ({
  voterId,
  maxHeight = '500px',
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState<Vote_Records | null>(null);

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery(
    GetVoteByVoterInfinitQueryOptions({
      variables: {
        voterId: voterId,
        limit: 5,
        offset: 0,
      },
      keys: [voterId],
      options: {
        enabled: !!voterId,
      },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Vote_Records[]>>;

  const voteHistory = React.useMemo(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data]);

  const handleLoadMore = async () => {
    await fetchNextPage();
  };

  const handleOpenDialog = (vote: Vote_Records) => {
    setSelectedVote(vote);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={3}>
        <Typography sx={{ color: 'white' }}>
          Failed to load vote records. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!voteHistory || voteHistory.length === 0) {
    return (
      <Box textAlign="center" py={3}>
        <Typography sx={{ color: 'white' }}>No vote records found for this user.</Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'transparent',
        borderRadius: '12px',
      }}
    >
      <Box
        sx={{
          height: '100%',
          maxHeight: maxHeight,
          overflow: 'auto',
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
        <List disablePadding>
          {voteHistory.map((record, index) => (
            <React.Fragment key={record.id}>
              <ListItem
                disablePadding
                sx={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  width="100%"
                  justifyContent="space-around"
                >
                  <Avatar
                    src={record.vote_snapshot?.user?.pfpUrl || ''}
                    alt={record.vote_snapshot?.user?.displayName || ''}
                    sx={{ width: 40, height: 40 }}
                  />
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="white">
                          {record.voteType === 'up' ? 'Upvoted' : 'Downvoted'}{' '}
                          {record.vote_snapshot.user?.displayName}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color={textColor}>
                          {record.amount} {record.tokenType === 'usdc' ? 'USDC' : '$SOCIAL'} |{' '}
                          {record.status ? capitalizeFirstLetter(record.status) : ''}
                        </Typography>
                        <Typography variant="body2" color={textColor}>
                          {formatDistanceToNow(new Date(record.createdAt), { addSuffix: true })}
                        </Typography>
                      </>
                    }
                  />
                </Box>
                <ListItemIcon
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minWidth: 40,
                  }}
                >
                  {record.voteType === 'up' ? (
                    <ThumbUpAltOutlinedIcon color="success" sx={{ fontSize: 24 }} />
                  ) : (
                    <ThumbDownOutlinedIcon color="error" sx={{ fontSize: 24 }} />
                  )}
                </ListItemIcon>
                {/* <ListItemIcon sx={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}> */}
                <IconButton size="small" color="secondary" onClick={() => handleOpenDialog(record)}>
                  <ArticleIcon />
                </IconButton>
                {/* </ListItemIcon> */}
              </ListItem>
              {index < voteHistory.length - 1 && <Divider sx={{ opacity: 0.2 }} />}
            </React.Fragment>
          ))}
        </List>

        <Box display="flex" justifyContent="center" p={1}>
          <Button
            variant="text"
            size="small"
            onClick={handleLoadMore}
            endIcon={<KeyboardArrowDownIcon />}
            // disabled={isLoadingMore || voteHistory.length < limit}
            startIcon={isLoading ? <CircularProgress size={16} /> : null}
            sx={{
              color: textColor,
              fontSize: 12,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      </Box>

      {/* Vote Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'white',
            color: 'black',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: '1px solid #eee',
            pb: 2,
            color: 'black', // This ensures the title text is black
          }}
        >
          Vote Details
          <IconButton
            aria-label="close"
            onClick={() => setDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedVote && (
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  src={selectedVote.vote_snapshot?.user?.pfpUrl || ''}
                  alt={selectedVote.vote_snapshot?.user?.displayName || ''}
                  sx={{ width: 60, height: 60 }}
                />
                <Box>
                  <Typography variant="h6">
                    {selectedVote.vote_snapshot?.user?.displayName}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    @{selectedVote.vote_snapshot?.user?.username}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textPrimary">
                  Vote Type
                </Typography>
                <Chip
                  icon={
                    selectedVote.voteType === 'up' ? (
                      <ThumbUpAltOutlinedIcon fontSize="small" />
                    ) : (
                      <ThumbDownOutlinedIcon fontSize="small" />
                    )
                  }
                  label={selectedVote.voteType === 'up' ? 'Upvote' : 'Downvote'}
                  color={selectedVote.voteType === 'up' ? 'success' : 'error'}
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textPrimary">
                  Status
                </Typography>
                <Chip
                  label={
                    selectedVote.status ? capitalizeFirstLetter(selectedVote.status) : 'Unknown'
                  }
                  color={
                    selectedVote.status === 'completed'
                      ? 'success'
                      : selectedVote.status === 'pending'
                        ? 'warning'
                        : selectedVote.status === 'failed'
                          ? 'error'
                          : 'default'
                  }
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textPrimary">
                  Amount
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {selectedVote.amount} {selectedVote.tokenType === 'usdc' ? 'USDC' : '$SOCIAL'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textPrimary">
                  Date
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {format(new Date(selectedVote.createdAt), 'PPP p')}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textPrimary">
                  Transaction ID
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    wordBreak: 'break-all',
                    mt: 1,
                  }}
                >
                  {selectedVote.id}
                </Typography>
              </Grid>

              {selectedVote.vote_snapshot?.weekStart && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textPrimary">
                    Week Start
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {format(new Date(selectedVote.vote_snapshot.weekStart), 'PPP')}
                  </Typography>
                </Grid>
              )}

              {selectedVote.vote_snapshot?.mindshare && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textPrimary">
                    Voted mindshare
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {(selectedVote.vote_snapshot.mindshare * 100).toFixed(2)}%
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default VoterVoteRecords;
