'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MindshareTreemap } from '@/components/mindshare/treemap';
import { Box, MenuItem, Select, SelectChangeEvent, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from '@/components/common/Header';
import { MINDSHARE_DURATION, MINDSHARE_FIELDS } from '@/utils/constants';

const TopGainer = dynamic(() => import('@/components/mindshare/topGainer'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [value, setValue] = useState('1');
  const [duration, setDuration] = useState(MINDSHARE_DURATION.THREE);
  const [field, setField] = useState(MINDSHARE_FIELDS.ABSOLUTE);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDurationChange = (event: SelectChangeEvent) => {
    setDuration(event.target.value);
  };

  const handleFieldChange = (event: SelectChangeEvent) => {
    setField(event.target.value);
  };

  return (
    <Box width="100%" height="100%" sx={{ bgcolor: '#121212', color: 'white' }}>
      <Header title="MindShare" showAvatar={true} />
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
          >
            <Tab
              label="MindShare"
              value="1"
              sx={{ px: 0.5, mr: 1, fontWeight: 600, minWidth: 0, fontSize: 14 }}
            />
            <Tab
              label="Top Gainer"
              value="2"
              sx={{ px: 0.5, mr: 1, fontWeight: 600, minWidth: 0, fontSize: 14 }}
            />
            <Tab
              label="Top Loser"
              value="3"
              sx={{ px: 0.5, mr: 1, fontWeight: 600, minWidth: 0, fontSize: 14 }}
            />
          </TabList>
          <Box mx={0.5}>
            {value === '1' ? (
              <Select
                value={duration}
                sx={{ width: '72px', fontSize: 12 }}
                onChange={handleDurationChange}
                variant="outlined"
                size="small"
              >
                <MenuItem value={MINDSHARE_DURATION.THREE} sx={{ color: 'black' }}>
                  3D
                </MenuItem>
                <MenuItem value={MINDSHARE_DURATION.SEVEN} sx={{ color: 'black' }}>
                  7D
                </MenuItem>
                <MenuItem value={MINDSHARE_DURATION.THIRTY} sx={{ color: 'black' }}>
                  30D
                </MenuItem>
              </Select>
            ) : (
              <Select
                value={field}
                sx={{ width: '100%', fontSize: 12 }}
                onChange={handleFieldChange}
                variant="outlined"
                size="small"
              >
                <MenuItem value={MINDSHARE_FIELDS.ABSOLUTE} sx={{ color: 'black' }}>
                  Δ Abosolute (bps)
                </MenuItem>
                <MenuItem value={MINDSHARE_FIELDS.RELATIVE} sx={{ color: 'black' }}>
                  Δ Relative (%)
                </MenuItem>
              </Select>
            )}
          </Box>
        </Box>
        <TabPanel value="1" sx={{ height: '100%', p: 1, backgroundColor: '#1E1E1E' }}>
          <Box
            sx={{
              height: '100%',
              position: 'relative',
            }}
          >
            <MindshareTreemap duration={duration} />
          </Box>
        </TabPanel>
        <TabPanel value="2" sx={{ height: 'auto', p: 1, backgroundColor: '#1E1E1E' }}>
          <Box
            sx={{
              height: 'auto',
              position: 'relative',
            }}
          >
            <TopGainer key={duration} field={field} />
          </Box>
        </TabPanel>
        <TabPanel value="3" sx={{ height: 'auto', p: 1, backgroundColor: '#1E1E1E' }}>
          <Box
            sx={{
              height: 'auto',
              position: 'relative',
            }}
          >
            <TopGainer key={duration} desc={false} field={field} />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
