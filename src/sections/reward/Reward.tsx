'use client';

import { Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/common/Header';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LeaderboardTable from './LeaderboardTable';
import DailyTaskPanel from './DailyTaskPanel';
import { TAB } from '@/utils/constants';
import { useSearchParams } from 'next/navigation';

function TabContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [value, setValue] = useState(tab || TAB.REWARDS);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
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
          onChange={handleChange}
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
            label="Top List"
            value={TAB.REWARDS}
            sx={{ px: 0.5, mr: 1, fontWeight: 600, minWidth: 0, fontSize: 14 }}
          />
          <Tab
            label="Daily Task"
            value={TAB.TASKS}
            sx={{ px: 0.5, mr: 1, fontWeight: 600, minWidth: 0, fontSize: 14 }}
          />
        </TabList>
      </Box>
      <TabPanel value={TAB.REWARDS} sx={{ height: '100%', p: 1, backgroundColor: '#121212' }}>
        <Box
          sx={{
            height: '100%',
            minHeight: 'calc(100vh - 178px)',
            position: 'relative',
          }}
        >
          <LeaderboardTable />
        </Box>
      </TabPanel>
      <TabPanel value={TAB.TASKS} sx={{ height: 'auto', p: 1, backgroundColor: '#121212' }}>
        <Box
          sx={{
            height: '100%',
            minHeight: 'calc(100vh - 178px)',
            position: 'relative',
          }}
        >
          <DailyTaskPanel />
        </Box>
      </TabPanel>
    </TabContext>
  );
}

function LoadingFallback() {
  return (
    <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#121212', color: 'white' }}>
      Loading...
    </Box>
  );
}

export default function RewardSection() {
  return (
    <Box width="100%" height="auto" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Header showAvatar />
      <Suspense fallback={<LoadingFallback />}>
        <TabContent />
      </Suspense>
    </Box>
  );
}