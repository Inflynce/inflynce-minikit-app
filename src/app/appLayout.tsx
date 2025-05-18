'use client';
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Box, Container, Paper } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeFilledIcon from '@mui/icons-material/Home';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import LocalFireDepartmentFilledIcon from '@mui/icons-material/LocalFireDepartment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleFilledIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useMiniKit, useAddFrame } from '@coinbase/onchainkit/minikit';
import { useMutation } from '@tanstack/react-query';
import { PostNotificationTokenMutationOptions } from '@/queryFn/postNotificationToken';
import YesterdayEarn from '@/components/mindshare/dialog/YesterdayEarn';
import { useYesterdayEarnDialog } from '@/hooks/useYesterdayEarnDialog';
import { useInflynceAuth } from '@/contexts/InflynceContext';
interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { context, isFrameReady } = useMiniKit();
  const addFrame = useAddFrame();
  const pathname = usePathname();

  const { token, getToken } = useInflynceAuth();

  const { open, handleClose } = useYesterdayEarnDialog({ points: 100, enabled: true });

  const { mutate: postNotificationToken } = useMutation(
    PostNotificationTokenMutationOptions({
      token: token ?? '',
      options: {
        onSuccess: (data) => {
          // TODO: handle success
        },
      },
    })
  );

  useEffect(() => {
    if (isFrameReady && !token) {
      const login = async () => {
        await getToken();
      };
      login();
    }
  }, [isFrameReady, token]);

  useEffect(() => {
    const checkAddFrame = async () => {
      const result = await addFrame();
      if (result && result.url && result.token) {
        postNotificationToken({
          userId: context?.user?.fid?.toString() ?? '',
          url: result.url,
          token: result.token,
        });
      }
    };

    if (!context?.client.added && !!token) {
      checkAddFrame();
    }
  }, [context, token]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };

  return (
    <Box
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          paddingBottom: '56px',
          bgcolor: 'black',
        }}
      >
        {/* Main Content */}
        <Container
          sx={{ flexGrow: 1, height: '100%', overflowY: 'auto', px: 0, bgcolor: 'black' }}
          id="scrollableDiv"
        >
          {children}
        </Container>
        <YesterdayEarn open={open} onClose={handleClose} />
        {/* Bottom Navigation */}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            value={pathname}
            onChange={handleChange}
            sx={{ backgroundColor: '#1E1E1E', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <BottomNavigationAction
              label="Mindshare"
              value="/"
              icon={pathname === '/' ? <HomeFilledIcon /> : <HomeOutlinedIcon />}
            />
            <BottomNavigationAction
              label="Trend"
              value="/trend"
              icon={
                pathname === '/trend' ? (
                  <LocalFireDepartmentFilledIcon />
                ) : (
                  <LocalFireDepartmentOutlinedIcon />
                )
              }
            />
            <BottomNavigationAction
              label="Rewards"
              value="/rewards"
              icon={pathname === '/rewards' ? <CardGiftcardIcon /> : <CardGiftcardIcon />}
            />
            <BottomNavigationAction
              label="Profile"
              value={`/profile/${context?.user?.fid}`}
              icon={
                pathname.includes('/profile') ? (
                  <AccountCircleFilledIcon />
                ) : (
                  <AccountCircleOutlinedIcon />
                )
              }
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </Box>
  );
};

export default AppLayout;
