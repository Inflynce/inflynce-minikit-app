'use client';

import sdk, { type Context } from '@farcaster/frame-sdk';
import { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Skeleton,
  Stack,
  Button,
  IconButton,
} from '@mui/material';
import { UserInfoCard } from '@/components/user/UserInfoCard';
import { useQuery } from '@tanstack/react-query';
import { GetMindshareByFidQueryOptions } from '@/queryFn/getMindshareByFid';
import { styled, useTheme } from '@mui/material/styles';
import { BaseCard } from '@/components/common/BaseCard';
import { UserMindshareTable } from '@/components/mindshare/dialog/UserMindshareTable';
import { UserMindshareChart } from '@/components/mindshare/dialog/UserMindshareChart';
import { MindshareResult } from '@/__generated__/graphql';
import { useParams } from 'next/navigation';
import { textColor } from '@/utils/color';
import dynamic from 'next/dynamic';
import { VoteDrawer } from '@/sections/vote/VoteDrawer';
import { VoterVoteRecords } from '@/components/profile/VoterVoteRecords';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { UserPointChart } from '@/components/mindshare/dialog/UserPointChart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

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

const StyledCard = styled(BaseCard)({
  borderRadius: '16px',
  padding: '12px',
  background: '#1E1E1E',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  marginBottom: '12px',
  minHeight: '200px',
});

export default function Profile() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const params = useParams();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [pointTransactionsDrawerOpen, setPointTransactionsDrawerOpen] = useState(false);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

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
              <Tab label="Predictions" {...a11yProps(1)} />
              {/* <Tab label="Other Stats" {...a11yProps(2)} /> */}
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
          <StyledCard>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <AccessTimeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h5" fontWeight={600}>
                Predictions Coming Soon
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We are working on exciting predictions features that will help you earn more points.
                Check back soon for updates!
              </Typography>
            </Stack>
          </StyledCard>
          {/* <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={200} />}>
            <StyledCard>
              <Typography sx={{ color: 'white' }}>Ongoing Vote</Typography>
              <Vote fid={params?.fid as string} />
            </StyledCard>
          </Suspense>
          <StyledCard>
            <Typography sx={{ color: 'white' }}>My votes</Typography>
            <VoterVoteRecords voterId={params?.fid as string} />
          </StyledCard> */}
        </TabPanel>

        {/* <TabPanel value={tabValue} index={2} dir={theme.direction}>
          <StyledCard>
            <Typography sx={{ color: textColor }}>Other Statistics</Typography>
            <Box sx={{ p: 2 }}>
              <Typography>Additional user statistics will be displayed here.</Typography>
            </Box>
          </StyledCard>
        </TabPanel> */}
      </Box>
    </Box>
  );
}
