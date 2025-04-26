import React from 'react';
import { Box, Typography, Tooltip, Stack } from '@mui/material';

interface VoteStatsBarProps {
  totalUpVoteAmount: number;
  totalDownVoteAmount: number;
  isDarkMode: boolean;
}

const VoteStatsBar: React.FC<VoteStatsBarProps> = ({
  totalUpVoteAmount,
  totalDownVoteAmount,
  isDarkMode,
}) => {
  const totalUpUsd = totalUpVoteAmount;

  const totalDownUsd = totalDownVoteAmount;
  const totalVoteUsd = Number(totalUpUsd) + Number(totalDownUsd);

  // Calculate percentages and multipliers
  const upPercentage = totalVoteUsd > 0 ? (totalUpUsd / totalVoteUsd) * 100 : 0;
  const downPercentage = totalVoteUsd > 0 ? (totalDownUsd / totalVoteUsd) * 100 : 0;

  const upMultiplier =
    totalUpUsd > 0 && totalDownUsd > 0 ? (totalVoteUsd / totalUpUsd).toFixed(2) : '∞';

  const downMultiplier =
    totalUpUsd > 0 && totalDownUsd > 0 ? (totalVoteUsd / totalDownUsd).toFixed(2) : '∞';

  const color = isDarkMode ? 'white' : 'black';

  return (
    <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
      {/* Stats summary */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Tooltip title="If you vote UP and win, you'll get this multiplier on your bet">
          <Box sx={{ textAlign: 'left', color: color }}>
            <Typography variant="caption" color={color}>
              UP Multiplier
            </Typography>
            <Typography variant="subtitle2" color="success.main">
              {upMultiplier}x
            </Typography>
          </Box>
        </Tooltip>

        <Tooltip title="If you vote DOWN and win, you'll get this multiplier on your bet">
          <Box sx={{ textAlign: 'right', color: color }}>
            <Typography variant="caption" color={color}>
              DOWN Multiplier
            </Typography>
            <Typography variant="subtitle2" color="error.main">
              {downMultiplier}x
            </Typography>
          </Box>
        </Tooltip>
      </Box>

      <Stack
        direction="row"
        sx={{
          height: '24px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: isDarkMode
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            width: `${upPercentage}%`,
            bgcolor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: upPercentage > 0 ? '40px' : '0px',
          }}
        >
          {upPercentage > 10 && (
            <Typography variant="caption" color="white" fontWeight="bold">
              {upPercentage.toFixed(2)}%
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: `${downPercentage}%`,
            bgcolor: 'error.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: downPercentage > 0 ? '40px' : '0px',
          }}
        >
          {downPercentage > 10 && (
            <Typography variant="caption" color="white" fontWeight="bold">
              {downPercentage.toFixed(2)}%
            </Typography>
          )}
        </Box>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Box>
          <Typography variant="caption" color={color}>
            Total UP
          </Typography>
          <Typography variant="body2" color={color}>
            ${totalUpUsd} USDC
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" color={color}>
            Total DOWN
          </Typography>
          <Typography variant="body2" color={color}>
            ${totalDownUsd} USDC
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VoteStatsBar;
