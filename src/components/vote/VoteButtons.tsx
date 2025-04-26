import React from 'react';
import { Stack, Button, Typography, Skeleton } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { textColor } from '@/utils/color';
import VoteCount from '@/components/vote/VoteCount';
import VoteStatsBar from '@/components/vote/VoteStatsBar';

interface VoteButtonsProps {
  onUpvote: () => void;
  onDownvote: () => void;
  voteAggregates: any;
  isLoading: boolean;
  isDarkMode?: boolean;
  isVoting: boolean;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  onUpvote,
  onDownvote,
  voteAggregates,
  isLoading,
  isDarkMode = true,
  isVoting = false,
}) => {
  const color = isDarkMode ? textColor : 'text.primary';

  return (
    <>
      <Stack direction="row" justifyContent="space-around" spacing={2} mt={2}>
        <Stack width="50%">
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={onUpvote}
            disabled={!isVoting}
            sx={{
              borderRadius: 6,
              '&.Mui-disabled': {
                color: 'white',
                backgroundColor: 'grey.400',
              },
            }}
          >
            <ThumbUpAltOutlinedIcon sx={{ color: 'white', fontSize: 12 }} />
            <Typography
              variant="body1"
              textAlign="center"
              ml={0.5}
              fontSize={12}
              sx={{ color: 'white' }}
            >
              Up
            </Typography>
          </Button>
          {/* <Stack direction="column" justifyContent="center" alignItems="center">
            <VoteCount
              voteData={voteAggregates?.upvotes}
              isLoading={isLoading}
              color={color}
              socialUsdPrice={socialUsdPrice}
            />
          </Stack> */}
        </Stack>
        <Stack width="50%">
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={onDownvote}
            disabled={!isVoting}
            sx={{
              borderRadius: 6,
              backgroundColor: isVoting ? undefined : 'grey.600',
              '&.Mui-disabled': {
                color: 'white',
                backgroundColor: 'grey.400',
              },
            }}
          >
            <ThumbDownOutlinedIcon sx={{ color: 'white', fontSize: 12 }} />
            <Typography variant="body1" textAlign="center" ml={0.5} fontSize={12}>
              Down
            </Typography>
          </Button>
          {/* <Stack direction="column" justifyContent="center" alignItems="center">
            <VoteCount
              voteData={voteAggregates?.downvotes}
              isLoading={isLoading}
              color={color}
              socialUsdPrice={socialUsdPrice}
            />
          </Stack> */}
        </Stack>
      </Stack>
    </>
  );
};

export default VoteButtons;
