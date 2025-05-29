'use client';

import { useState } from 'react';
import { Box, Typography, AppBar, Tabs, Tab, Stack, IconButton } from '@mui/material';
import { UserInfoCard } from '@/components/user/UserInfoCard';
import { useQuery } from '@tanstack/react-query';
import { GetMindshareByFidQueryOptions } from '@/queryFn/getMindshareByFid';
import { useTheme } from '@mui/material/styles';
import { StyledCard } from '@/components/common/BaseCard';
import { UserMindshareTable } from '@/components/mindshare/dialog/UserMindshareTable';
import { UserMindshareChart } from '@/components/mindshare/dialog/UserMindshareChart';
import { MindshareResult } from '@/__generated__/graphql';
import { useParams, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { UserPointChart } from '@/components/mindshare/dialog/UserPointChart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import NFT from './NFT';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

const PointTransactionsDrawer = dynamic(
  () => import('@/components/mindshare/dialog/PointTransactionsDrawer'),
  { ssr: false }
);

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ height: 'auto' }}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Profile() {
  const searchParams = useSearchParams();
  const { context } = useMiniKit();
  const params = useParams();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(searchParams.get('tab') === 'nft' ? 1 : 0);
  const [pointTransactionsDrawerOpen, setPointTransactionsDrawerOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { data, isLoading } = useQuery(
    GetMindshareByFidQueryOptions({
      keys: [`${context?.user?.fid ?? 0}`],
      variables: {
        fid: (params?.fid as string) ?? '0',
      },
      options: {
        enabled: !!params?.fid,
      },
    })
  );

  // const useNFTData = () => {
  //   return {
  //     title: 'My NFT',
  //     imageUrl: 'https://miniappdev.inflynce.com/logo.png',
  //     isMintable: true,
  //     isEligibleToMint: true,
  //     network: 'base',
  //   }
  // }

  return (
    <Box width="100%" height="100%" sx={{ bgcolor: '#121212', color: 'white' }}>
      <UserInfoCard
        user={
          data?.userInfo ?? {
            displayName: '',
            fid: 0,
            pfpUrl: '',
            username: '',
          }
        }
        mindshare={data}
        customElement={
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
              <Tab label="My Stats" {...a11yProps(0)} />
              <Tab label="NFT" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
        }
      />
      <Box p={1} sx={{ height: 'auto', bgcolor: '#121212' }}>
        <TabPanel value={tabValue} index={0} dir={theme.direction}>
          <StyledCard>
            <Typography sx={{ color: 'white' }}>Mindshare Summary</Typography>
            <UserMindshareTable
              isLoading={isLoading}
              selectedUser={data ?? ({} as MindshareResult)}
            />
          </StyledCard>
          <StyledCard>
            <Typography sx={{ color: 'white' }}>Daily Mindshare</Typography>
            <UserMindshareChart
              isLoading={isLoading}
              selectedUser={data ?? ({} as MindshareResult)}
            />
          </StyledCard>
          <StyledCard>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: 'white' }}>Daily Rewarded IP</Typography>
              <IconButton onClick={() => setPointTransactionsDrawerOpen(true)}>
                <ReadMoreIcon />
              </IconButton>
            </Stack>
            <UserPointChart fid={params?.fid as string} />
            <PointTransactionsDrawer
              open={pointTransactionsDrawerOpen}
              onClose={() => setPointTransactionsDrawerOpen(false)}
              fid={params?.fid as string}
            />
          </StyledCard>
        </TabPanel>
        <TabPanel value={tabValue} index={1} dir={theme.direction}>
          <NFT />
        </TabPanel>
      </Box>
    </Box>
  );
}
