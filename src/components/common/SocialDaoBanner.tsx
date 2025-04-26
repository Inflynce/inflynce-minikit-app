import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { InfoDialog, getDialogContent, DialogContentType } from '@/sections/vote/InfoDialog';

export const SocialDaoBanner = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContentType>({
    title: '',
    content: null,
  });
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleMenuItemClick = (type: string) => {
    handleClose();
    const content = getDialogContent(type);
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
        bgcolor: 'white',
        py: 2,
        px: 3,
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h1" fontSize={24} fontWeight={700} color="#1a1a2e">
          $SOCIAL DAO
        </Typography>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={openMenu ? 'composition-menu' : undefined}
          aria-expanded={openMenu ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ minWidth: 'auto', p: 1 }}
        >
          <MenuIcon />
        </Button>
      </Stack>

      <Popper
        open={openMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openMenu}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem onClick={() => handleMenuItemClick('how-it-works')}>
                    How it works?
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('faq')}>FAQ</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('about')}>About</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('contact')}>Contact</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <InfoDialog open={dialogOpen} onClose={handleDialogClose} dialogContent={dialogContent} />
    </Box>
  );
};
