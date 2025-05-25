import React, { useRef, useState, useEffect } from 'react';
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  IconButton,
} from '@mui/material';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import InfoDialog from '@/components/dialogs/InfoDialog';
import {
  getDialogContent,
  DialogContentType,
  standardMenuItems,
} from '@/utils/dialogContentProvider';
import { useRouter } from 'next/navigation';

interface InfoMenuProps {
  buttonIcon?: React.ReactNode;
  menuItems?: Array<{
    label: string;
    key: string;
  }>;
  customGetDialogContent?: (key: string) => DialogContentType;
}

const InfoMenu: React.FC<InfoMenuProps> = ({
  buttonIcon = <MenuOutlined sx={{ color: 'white' }} />,
  menuItems = standardMenuItems,
  customGetDialogContent,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContentType>({
    title: '',
    content: null,
  });
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(openMenu);
  const router = useRouter();
  useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleMenuItemClick = (key: string) => {
    handleClose();
    const content = customGetDialogContent ? customGetDialogContent(key) : getDialogContent(key);
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleMySpaceClick = () => {
    router.push('/space');
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={openMenu ? 'composition-menu' : undefined}
        aria-expanded={openMenu ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{ color: 'white' }}
      >
        {buttonIcon}
      </IconButton>

      <Popper
        open={openMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 100001 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openMenu}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem
                    onClick={() => handleMySpaceClick()}
                    sx={{
                      color: 'black',
                    }}
                  >
                    My Space
                  </MenuItem>
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.key}
                      onClick={() => handleMenuItemClick(item.key)}
                      sx={{
                        color: 'black',
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <InfoDialog open={dialogOpen} onClose={handleDialogClose} dialogContent={dialogContent} />
    </>
  );
};

export default InfoMenu;
