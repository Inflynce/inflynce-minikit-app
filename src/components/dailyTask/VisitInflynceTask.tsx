import {
  Typography,
  Box,
  Button,
  ListItem,
  ListItemText,
  CardMedia,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  ListItemAvatar,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import { User_Tasks } from '@/__generated__/graphql';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import TodayIcon from '@mui/icons-material/Today';
import { LoadingButton } from '@mui/lab';

import { format } from 'date-fns';
interface VisitInflynceTaskProps {
  task: User_Tasks;
  onClaim: (taskId: string) => void;
  isPending?: boolean;
}

const VisitInflynceTask: React.FC<VisitInflynceTaskProps> = ({
  task,
  onClaim,
  isPending = false,
}) => {
  const { task: taskData } = task;

  console.log(task);

  const handleClaimClick = () => {
    onClaim(task.id);
  };

  return (
    <ListItem
      sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
      secondaryAction={
        <LoadingButton
          loading={isPending}
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleClaimClick}
          disabled={task.completed}
        >
          {task.completed ? 'Claimed' : 'Claim'}
        </LoadingButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <AssignmentTurnedInTwoToneIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="body1" gutterBottom>
          {taskData.title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={`+${taskData.rewardIp} IP`}
            size="small"
            sx={{ fontSize: '10px', color: 'text.secondary' }}
          />
          <Chip
            icon={<TodayIcon sx={{ fontSize: '12px !important', color: 'text.secondary' }} />}
            label={`${format(task.date, 'MMM dd')}`}
            size="small"
            sx={{ fontSize: '10px', color: 'text.secondary' }}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {taskData.description}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

export default VisitInflynceTask;
