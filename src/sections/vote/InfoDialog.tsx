import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export interface DialogContentType {
  title: string;
  content: React.ReactNode;
}

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
  dialogContent: DialogContentType;
}

export const getDialogContent = (type: string): DialogContentType => {
  switch (type) {
    case 'how-it-works':
      return {
        title: 'How It Works',
        content: (
          <>
            <DialogContentText>
              Social Mindshare Prediction is a platform that allows users to predict the social
              influence of various accounts.
            </DialogContentText>
            <DialogContentText>1. Browse through the list of accounts</DialogContentText>
            <DialogContentText>
              2. Vote on whether you think their social mindshare will increase or decrease
            </DialogContentText>
            <DialogContentText>
              3. Track your predictions and see how accurate you are over time
            </DialogContentText>
          </>
        ),
      };
    case 'faq':
      return {
        title: 'Frequently Asked Questions',
        content: (
          <>
            <DialogContentText>
              <strong>What is social mindshare?</strong>
              <br />
              Social mindshare is a measure of an account's influence and presence in social
              conversations.
            </DialogContentText>
            <DialogContentText>
              <strong>How are predictions scored?</strong>
              <br />
              Predictions are scored based on the actual change in mindshare over the selected time
              period.
            </DialogContentText>
            <DialogContentText>
              <strong>Can I change my prediction?</strong>
              <br />
              Once submitted, predictions cannot be changed to ensure fair play.
            </DialogContentText>
          </>
        ),
      };
    case 'about':
      return {
        title: 'About Social Mindshare Prediction',
        content: (
          <DialogContentText>
            Social Mindshare Prediction was created to help understand and predict social influence
            trends. Our platform uses advanced analytics to track social mindshare across various
            platforms and provides users with tools to make and track predictions about future
            trends.
          </DialogContentText>
        ),
      };
    case 'contact':
      return {
        title: 'Contact Us',
        content: (
          <DialogContentText>
            Have questions or feedback? We'd love to hear from you!
            <br />
            <br />
            Email: contact@socialmindshare.com
            <br />
            Twitter: @SocialMindshare
            <br />
            Discord: discord.gg/socialmindshare
          </DialogContentText>
        ),
      };
    default:
      return { title: '', content: null };
  }
};

export const InfoDialog: React.FC<InfoDialogProps> = ({ open, onClose, dialogContent }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">{dialogContent.title}</DialogTitle>
      <DialogContent>{dialogContent.content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
