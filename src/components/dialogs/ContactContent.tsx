import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChatIcon from '@mui/icons-material/Chat';

const ContactContent: React.FC = () => {
  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="body1" gutterBottom>
        Want to reach real users, not bots? Looking to build a community that actually cares? Let's
        talk. We help you reward contribution, not noise and coordinate trust at scale.
      </Typography>

      <Typography variant="body1" gutterBottom>
        We're lean, builder-friendly and here to help the next wave of onchain teams scale with
        purpose.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
        >
          <TelegramIcon sx={{ mr: 1, color: 'primary.main' }} /> Telegram
        </Typography>
        <Box sx={{ pl: 4 }}>
          <Typography variant="body1" component="div">
            →{' '}
            <Link
              href="https://t.me/alitiknazoglu"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              https://t.me/alitiknazoglu
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
        >
          <TwitterIcon sx={{ mr: 1, color: 'primary.main' }} /> Twitter
        </Typography>
        <Box sx={{ pl: 4 }}>
          <Typography variant="body1" component="div">
            →{' '}
            <Link
              href="https://x.com/inflynce"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              https://x.com/inflynce
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
        >
          <ChatIcon sx={{ mr: 1, color: 'primary.main' }} /> Farcaster
        </Typography>
        <Box sx={{ pl: 4 }}>
          <Typography variant="body1" component="div">
            →{' '}
            <Link
              href="https://warpcast.com/inflynce"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              https://warpcast.com/inflynce
            </Link>
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" gutterBottom fontWeight="bold">
        Let's shape the InfoFi era together.
      </Typography>
    </Box>
  );
};

export default ContactContent;
