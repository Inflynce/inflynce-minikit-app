import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { InfoDialog, getDialogContent, DialogContentType } from '@/sections/vote/InfoDialog';

export const MindshareFooter = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContentType>({
    title: '',
    content: null,
  });

  const handleReadMore = () => {
    const content = getDialogContent('how-it-works');
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        py: 4,
        mt: 4,
        borderTop: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="body1" color="textSecondary" mb={2}>
        Upvote or downvote for creator 7 days of mindshare, earn, engage and have fun with creators!
      </Typography>
      <Button
        variant="outlined"
        onClick={handleReadMore}
        sx={{
          color: '#1a1a2e',
          borderColor: '#1a1a2e',
          '&:hover': {
            borderColor: '#1a1a2e',
            bgcolor: 'rgba(26,26,46,0.05)',
          },
        }}
      >
        Read More
      </Button>

      <InfoDialog open={dialogOpen} onClose={handleDialogClose} dialogContent={dialogContent} />
    </Box>
  );
};
