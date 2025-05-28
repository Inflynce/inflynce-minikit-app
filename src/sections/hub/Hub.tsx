'use client';

import Box from '@mui/material/Box';
import Header from '@/components/common/Header';
import Button from '@mui/material/Button';
import { AppBar, Tabs, Tab, useTheme, Typography, IconButton } from '@mui/material';
import { TabPanel, a11yProps } from '@/utils/tab';
import { useState } from 'react';
import BoltIcon from '@mui/icons-material/Bolt';
import MyBoosts from './MyBoosts';
import BoostDialog from './BoostsDialog';
import OngoingBoosts from './ongoingBoosts';
import MyEarn from './MyEarn';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Hub() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const [myBoostsOpen, setMyBoostsOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  const handleCreateBoostClick = () => {
    setMyBoostsOpen(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box width="100%" height="auto" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Header
        title="Influence Hub"
        showTitle
        showAvatar
        showTotalPoints={false}
        showTitleInfo={true}
        infoContent={
          <IconButton onClick={() => setInfoDialogOpen(true)}>
            <InfoOutlined />
          </IconButton>
        }
        rightContent={
          <Button
            variant="outlined"
            color="primary"
            size="small"
            endIcon={<BoltIcon />}
            onClick={handleCreateBoostClick}
          >
            Boost
          </Button>
        }
      />
      <AppBar
        position="static"
        sx={{
          overflow: 'hidden',
          borderTopLeftRadius: 'none',
          borderTopRightRadius: 'none',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          backgroundColor: 'transparent',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="profile tabs"
        >
          <Tab label="Ongoing Boosts" {...a11yProps(0)} />
          <Tab label="My Boosts" {...a11yProps(1)} />
          <Tab label="My Earnings" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Box p={1} sx={{ height: 'auto', bgcolor: '#121212' }}>
        <TabPanel value={tabValue} index={0} dir={theme.direction}>
          <OngoingBoosts />
        </TabPanel>
        <TabPanel value={tabValue} index={1} dir={theme.direction}>
          <MyBoosts onBoostClick={handleCreateBoostClick} />
        </TabPanel>
        <TabPanel value={tabValue} index={2} dir={theme.direction}>
          <MyEarn />
        </TabPanel>
      </Box>
      <Dialog 
        open={infoDialogOpen} 
        onClose={() => setInfoDialogOpen(false)}
        PaperProps={{
          sx: { bgcolor: '#121212', color: 'white' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BoltIcon color="primary" /> Welcome to Inflynce Hub
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>
            This is where real attention meets value. Use this space to:
          </Typography>
          <Typography component="ul" sx={{ pl: 2 }}>
            <li>Earn by recasting high-signal posts</li>
            <li>Launch your own boost campaigns to gain real visibility</li>
            <li>Track your reward history and campaign performance</li>
          </Typography>
          <Typography paragraph sx={{ mt: 2 }}>
            Boosting is eligibility-based. The more Mindshare you earn, the more you can unlock.
          </Typography>
          <Typography>
            This is not just another task feed. It's a coordination layer built on reputation.
          </Typography>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => setInfoDialogOpen(false)}
            sx={{ mt: 3 }}
          >
            CLOSE
          </Button>
        </DialogContent>
      </Dialog>
      <BoostDialog open={myBoostsOpen} onClose={() => setMyBoostsOpen(false)} />
    </Box>
  );
}
