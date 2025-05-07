import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Typography, Button, Box, IconButton } from '@mui/material';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import { GetPointTransactionsByFidAndDirectionAndDateQueryOptions } from '@/queryFn/getPointTransactionByFid';
import { POINT_TRANSACTION_DIRECTION, TAB } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { getYesterday } from '@/utils/dateUtils';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { formatPoints } from '@/utils/formatters';
import ShareIcon from '@mui/icons-material/Share';
import sdk from '@farcaster/frame-sdk';
import { useRouter } from 'next/navigation';
interface YesterdayEarnProps {
  open: boolean;
  onClose: () => void;
}

const YesterdayEarn: React.FC<YesterdayEarnProps> = ({ open, onClose }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const { context } = useMiniKit();
  const userAvatar = context?.user?.pfpUrl || '';
  const userName = context?.user?.username || 'User';
  const router = useRouter();
  const fid = context?.user?.fid ?? '';

  const yesterday = getYesterday();

  const { data: pointsData } = useQuery(
    GetPointTransactionsByFidAndDirectionAndDateQueryOptions({
      keys: [`${fid}`, POINT_TRANSACTION_DIRECTION.EARN, 'latest'],
      variables: {
        fid: fid.toString(),
        direction: POINT_TRANSACTION_DIRECTION.EARN,
        date: yesterday,
      },
      options: {
        enabled: !!fid,
      },
    })
  );

  useEffect(() => {
    if (true) {
      setShowConfetti(true);
    }
  }, [open]);

  const points = pointsData?.reduce((acc, curr) => acc + curr.points, 0) ?? 0;

  const handleShare = async () => {
    try {
      const shareUrl = `${process.env.NEXT_PUBLIC_URL}/earnings/${fid}`;
      const shareText = `Check out my yesterday's earnings on @inflynce!`;
      await sdk.actions.composeCast({
        text: shareText,
        embeds: [shareUrl],
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  const handleCompleteDailyTasks = () => {
    onClose();
    router.push(`/rewards?tab=${TAB.TASKS}`);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: '#ffffff',
          color: '#333333',
          position: 'relative',
          overflow: 'hidden',
          minWidth: 320,
          maxWidth: 400,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        },
      }}
    >
      {showConfetti && (
        <Confetti width={width} height={height} recycle={true} numberOfPieces={50} />
      )}

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          borderRadius: '3px 3px 0 0',
          zIndex: 0,
        }}
      />

      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'white',
          zIndex: 2,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ pt: 8, pb: 4, px: 3, position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <Avatar
              src={userAvatar}
              alt={userName}
              sx={{
                width: 70,
                height: 70,
                mb: 2,
              }}
            />
          </motion.div>

          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            sx={{ mb: 1, color: 'primary.main' }}
          >
            Yesterday's Earnings
          </Typography>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Typography
              variant="h2"
              component="div"
              fontWeight="bold"
              sx={{
                my: 2,
                color: (theme) => theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {formatPoints(points)}
              <Typography
                component="span"
                sx={{
                  fontSize: '1rem',
                  ml: 1,
                  alignSelf: 'flex-end',
                  mb: 1.5,
                  color: 'text.secondary',
                }}
              >
                points
              </Typography>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              {points > 0
                ? "Fantastic progress! You're building momentum. Keep engaging to increase your streak!"
                : 'Looks like you missed out on earning points yesterday. Complete daily tasks today to start building your streak!'}
            </Typography>
            {points > 0 && (
              <Button
                variant="contained"
                onClick={handleShare}
                fullWidth
                sx={{
                  background: (theme) =>
                    `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                  color: 'white',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  mb: 1,
                  '&:hover': {
                    background: (theme) =>
                      `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    boxShadow: (theme) => `0 4px 15px ${theme.palette.primary.main}40`,
                  },
                }}
              >
                Share Your Earnings <ShareIcon sx={{ fontSize: 14, ml: 1 }} />
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={handleCompleteDailyTasks}
              fullWidth
              sx={{
                color: 'white',
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Complete Daily Tasks Today
            </Button>
          </motion.div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default YesterdayEarn;
