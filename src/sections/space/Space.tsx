'use client';

import Box from '@mui/material/Box';
import Header from '@/components/common/Header';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AppBar, Tabs, Tab, useTheme, Typography } from '@mui/material';
import { TabPanel, a11yProps } from '@/utils/tab';
import { useState } from 'react';
import { CreateTask } from './CreateTask';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function Space() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [taskId, setTaskId] = useState('');
  const { context } = useMiniKit();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box width="100%" height="auto" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Header
        showAvatar
        showTotalPoints={false}
        leftContent={
          <Button
            variant="outlined"
            color="primary"
            size="small"
            endIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              setTaskId('');
              setCreateTaskOpen(true);
            }}
          >
            Create Task
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
          <Tab label="Ongoing Tasks" {...a11yProps(0)} />
          <Tab label="Past Tasks" {...a11yProps(1)} />
          <Tab label="Draft Tasks" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Box p={1} sx={{ height: 'auto', bgcolor: '#121212' }}>
        <TabPanel value={tabValue} index={0} dir={theme.direction}>
          <Typography>Ongoing Tasks</Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1} dir={theme.direction}>
          <Typography>Past Tasks</Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={2} dir={theme.direction}>
          <Typography>Draft Tasks</Typography>
        </TabPanel>
      </Box>
      <CreateTask
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        fid={context?.user?.fid?.toString() ?? ''}
        taskId={taskId}
      />
    </Box>
  );
}
