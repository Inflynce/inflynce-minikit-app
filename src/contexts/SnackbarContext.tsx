'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, IconButton, SnackbarProps, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    severity?: 'success' | 'error' | 'warning' | 'info',
    duration?: number
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(6000);
  const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration: number = 6000
  ) => {
    setMessage(message);
    setDuration(duration);
    setSeverity(severity);
    setOpen(true);
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={action}
        sx={{
          zIndex: 9999,
        }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
