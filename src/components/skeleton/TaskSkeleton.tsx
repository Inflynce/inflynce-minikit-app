import React from 'react';
import {
  Typography,
  Box,
  Button,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Chip,
  Stack,
  Skeleton,
} from '@mui/material';

interface TaskSkeletonProps {
  count?: number;
}

const TaskSkeleton: React.FC<TaskSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from(new Array(count)).map((_, index) => (
        <ListItem
          key={index}
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1, mb: 1 }}
          secondaryAction={
            <Skeleton variant="rectangular" width={40} height={32} sx={{ borderRadius: 1 }} />
          }
        >
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText>
            <Skeleton variant="text" width="70%" height={24} sx={{ mb: 0.5 }} />
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 16 }} />
              <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 16 }} />
            </Stack>
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="60%" />
          </ListItemText>
        </ListItem>
      ))}
    </>
  );
};

export default TaskSkeleton;
