import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContentType } from '@/utils/dialogContentProvider';

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
  dialogContent: DialogContentType;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ open, onClose, dialogContent }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={true}>
      <DialogTitle sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        {dialogContent.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="primary"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>{dialogContent.content}</Box>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              minWidth: 120,
              borderRadius: 2,
            }}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
