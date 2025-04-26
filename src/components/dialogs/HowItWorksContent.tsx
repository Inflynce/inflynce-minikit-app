import React from 'react';
import { Typography, Box } from '@mui/material';

const HowItWorksContent: React.FC = () => {
  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="h5" gutterBottom>
        Predict Social Momentum. Earn Based on Mindshare.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Social Voting is a real-time prediction market built on top of social signals. Instead of
        betting on tokens, you're voting on attention.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Here's how it works:
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>1. Track Users:</strong>
        <br />
        Each Farcaster profile receives a dynamic Mindshare Score, calculated by our AI-powered
        algorithm based on real-time engagement, influence, and network activity.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>2. Make Your Vote:</strong>
        <br />
        Every Monday to Wednesday, you can vote on whether a user's mindshare will go up or down for
        the next 7-day cycle. Use $SOCIAL or USDC to participate, min. $0.1 USDC and 600 $SOCIAL.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>3. Let the Data Decide:</strong>
        <br />
        At the end of the week, our system finalizes scores. If you were on the winning side, you
        split the rewards from the losing pool.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>4. Distribution:</strong>
        <br />
        Next Monday at 1 pm UTC, users from the winning pool will get their base investment and
        earned amount automatically to their wallets.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>5. Earn Real Yield:</strong>
        <br />
        10% of every round's losing pool is redistributed to ecosystem, token holders and voted
        users. Social capital finally becomes measurable and monetizable.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Social Mindshare Prediction is not about popularity. It’s about real signal.
      </Typography>
    </Box>
  );
};

export default HowItWorksContent;
