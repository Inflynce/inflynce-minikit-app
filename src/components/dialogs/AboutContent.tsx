import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutContent: React.FC = () => {
  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="body1" gutterBottom>
        Inflynce Protocol is building the intelligence layer for the decentralized internet.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Likes, impressions and follower counts are no longer enough. We believe that attention
        should be measurable, influence should be programmable and contribution should be rewarded.
      </Typography>

      <Typography variant="body1" gutterBottom>
        That's why we created the InfoFi protocol - a stack that quantifies engagement, predicts
        mindshare and powers incentive models across Farcaster.
      </Typography>

      <Typography variant="body1" gutterBottom>
        We are not a platform. We are the infrastructure. Our mission is to help communities move
        from chaos to clarity - from speculation to signal.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Inflynce Protocol is where AI meets Web3 governance. Where reputation becomes capital. Where
        you finally know who matters - and why.
      </Typography>
    </Box>
  );
};

export default AboutContent;
