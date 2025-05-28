'use client';

import Box from '@mui/material/Box';
import Header from '@/components/common/Header';
import Button from '@mui/material/Button';
import { useTheme, Typography, IconButton } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
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
    console.log('newValue', newValue);
    setTabValue(newValue);
  };

  return (
    <Box width="100%" height="100%" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Header
        title="Inflynce Hub"
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
            startIcon={<BoltIcon />}
            onClick={handleCreateBoostClick}
          >
            Boost
          </Button>
        }
      />
      <TabContext value={tabValue}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: '#1E1E1E',
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <TabList
            onChange={handleTabChange}
            sx={{
              width: '100%',
              px: 1,
              color: 'white',
              '.Mui-selected': {
                color: 'white',
              },
            }}
            variant="fullWidth"
          >
            <Tab
              label="Ongoing Boosts"
              value={0}
              sx={{ px: 0.5, mr: 1, fontWeight: 600, minWidth: 0, fontSize: 14 }}
            />
            <Tab
              label="My Boosts"
              value={1}
              sx={{ px: 0.5, mr: 1, fontWeight: 600, minWidth: 0, fontSize: 14 }}
            />
            <Tab
              label="My Earnings"
              value={2}
              sx={{ px: 0.5, mr: 1, fontWeight: 600, minWidth: 0, fontSize: 14 }}
            />
          </TabList>
        </Box>
        <Box p={1} sx={{ height: 'auto' }}>
          <TabPanel value={0} sx={{ height: '100%', p: 1 }}>
            <OngoingBoosts />
          </TabPanel>
          <TabPanel value={1} sx={{ height: '100%', p: 1 }}>
            <MyBoosts onBoostClick={handleCreateBoostClick} />
          </TabPanel>
          <TabPanel value={2} sx={{ height: '100%', p: 1 }}>
            <MyEarn />
          </TabPanel>
        </Box>
      </TabContext>
      <Dialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        PaperProps={{
          sx: { bgcolor: '#121212', color: 'white' },
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
