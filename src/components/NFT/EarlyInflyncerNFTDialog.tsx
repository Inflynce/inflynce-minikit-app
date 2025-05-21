import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Typography, Button, Box, IconButton } from '@mui/material';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { GetPointTransactionsByFidAndDirectionAndDateQueryOptions } from '@/queryFn/getPointTransactionByFid';
import { POINT_TRANSACTION_DIRECTION, TAB } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { getYesterday } from '@/utils/dateUtils';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import ShareIcon from '@mui/icons-material/Share';
import sdk from '@farcaster/frame-sdk';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface EarlyInflyncerNFTDialogProps {
  open: boolean;
  tokenId: string;
  onClose: () => void;
}

const EarlyInflyncerNFTDialog: React.FC<EarlyInflyncerNFTDialogProps> = ({
  open,
  tokenId,
  onClose,
}) => {
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

  const handleShare = async () => {
    try {
      const shareUrl = `${process.env.NEXT_PUBLIC_URL}/earlyInflyncer`;
      const shareText = `I’m officially an Early Inflyncer! 🚀 Social capital is onchain now.`;
      await sdk.actions.composeCast({
        text: shareText,
        embeds: [shareUrl],
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
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

      <DialogContent sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Image
            src="/Early_Inflyncer_NFT.png"
            alt="Early Inflyncer NFT"
            width={100}
            height={100}
            style={{
              width: '100%',
            }}
          />
          {/* <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Typography
              variant="h3"
              component="div"
              fontWeight="bold"
              sx={{
                my: 1,
                color: (theme) => theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
                #
              </Typography>
              {tokenId}
            </Typography>
          </motion.div> */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography variant="body1" textAlign="left" sx={{ mb: 1, color: 'text.secondary' }}>
              Congrats! 🎉
            </Typography>
            <Typography variant="body1" textAlign="left" sx={{ mb: 2, color: 'text.secondary' }}>
              You've officially become an Early Inflyncer. Your social influence is now onchain.
              Share it with your friends and claim your spot in the new reputation economy.
            </Typography>
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
              Share Your Early Inflyncer NFT <ShareIcon sx={{ fontSize: 14, ml: 1 }} />
            </Button>
          </motion.div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyInflyncerNFTDialog;
