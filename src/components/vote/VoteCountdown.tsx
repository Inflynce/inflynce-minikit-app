import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface VoteCountdownProps {
  weekStart: string;
  status: string;
  isDarkMode?: boolean;
}

const VoteCountdown: React.FC<VoteCountdownProps> = ({ weekStart, status, isDarkMode = true }) => {
  const [remainingTime, setRemainingTime] = useState<string>('');

  // Calculate remaining time for voting
  useEffect(() => {
    if (status !== 'open') {
      setRemainingTime('');
      return;
    }

    const calculateRemainingTime = () => {
      // Voting is from Monday to Wednesday (2 days after weekStart)
      const weekStartDate = new Date(weekStart);
      const votingEndTime = new Date(
        Date.UTC(
          weekStartDate.getUTCFullYear(),
          weekStartDate.getUTCMonth(),
          weekStartDate.getUTCDate() + 3, // Monday + 3 days = Thursday
          23,
          59,
          59 // End of day Wednesday in UTC
        )
      );

      const now = new Date();
      const timeDiff = votingEndTime.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setRemainingTime('Voting Period Ended');
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setRemainingTime(`${days}d ${hours}h ${minutes}m remaining`);
      } else if (hours > 0) {
        setRemainingTime(`${hours}h ${minutes}m remaining`);
      } else {
        setRemainingTime(`${minutes}m remaining`);
      }
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [weekStart, status]);

  if (!remainingTime) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={1} mb={1}>
      <Chip
        icon={<AccessTimeIcon style={{ fontSize: 14 }} />}
        label={remainingTime}
        size="small"
        sx={{
          height: 24,
          fontSize: 10,
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          color: isDarkMode ? 'white' : 'black',
          '& .MuiChip-icon': {
            color: isDarkMode ? 'white' : 'black',
            marginLeft: '8px',
          },
          borderRadius: 1,
        }}
      />
    </Box>
  );
};

export default VoteCountdown;
