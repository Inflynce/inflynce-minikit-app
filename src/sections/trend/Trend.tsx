'use client';

import Trend from '@/components/mindshare/trend';
import { Box } from '@mui/material';

export default function TrendSection() {
  return (
    <Box width="100%" height="auto" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Trend />
    </Box>
  );
}
