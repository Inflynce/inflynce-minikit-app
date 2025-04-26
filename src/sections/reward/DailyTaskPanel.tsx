import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function DailyTaskPanel() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 2,
          p: 3,
          width: '100%',
          maxWidth: 500,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <AccessTimeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h5" fontWeight={600}>
            Daily Tasks Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We're working on exciting daily tasks that will help you earn more points. Check back
            soon for updates!
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
