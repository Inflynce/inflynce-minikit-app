import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutContent: React.FC = () => {
  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="body1" gutterBottom>
        Inflynce Protocol is the coordination layer for the onchain social graph. We transform
        social signals into reputation scores, helping projects filter noise, reach real users and
        distribute rewards meaningfully.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Built on Farcaster, Inflynce powers programmable reputation: scoring every cast, follow and
        like to help protocols activate contributors, not crowds.
      </Typography>

      <Typography variant="body1" gutterBottom>
        We are not a platform. We are infrastructure. Whether you're launching an NFT campaign,
        distributing tokens or building on Base, Inflynce helps you reach the people who matter and
        prove it onchain.
      </Typography>
    </Box>
  );
};

export default AboutContent;
