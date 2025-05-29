import { Typography, ListItem, ListItemText, Chip, Stack } from '@mui/material';
import React from 'react';
import { User_Tasks } from '@/__generated__/graphql';
import { LoadingButton } from '@mui/lab';

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
  const handleClaimClick = () => {
    onClaim(task.id);
  };

  return (
    <ListItem
      sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1, pr: 12, mb: 1 }}
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
      <ListItemText>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Typography variant="body1" gutterBottom>
            {taskData.title}
          </Typography>
          <Chip
            label={`+${taskData.rewardIp} IP`}
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
