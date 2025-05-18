import { Typography, ListItem, ListItemText, Chip, Stack } from '@mui/material';
import React from 'react';
import { User_Tasks } from '@/__generated__/graphql';
import { LoadingButton } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';
import { GetEarlyInflyncerNFTMindRecordByFidQueryOptions } from '@/queryFn/earlyInflyncerNFT';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useRouter } from 'next/navigation';
import { useInflynceAuth } from '@/contexts/InflynceContext';

interface EarlyInflyncerTaskProps {
  task: User_Tasks;
  onClaim: (taskId: string) => void;
  isPending?: boolean;
}

const EarlyInflyncerTask: React.FC<EarlyInflyncerTaskProps> = ({
  task,
  onClaim,
  isPending = false,
}) => {
  const router = useRouter();
  const { task: taskData } = task;
  const { token, getToken } = useInflynceAuth();
  const { context } = useMiniKit();

  const { data: earlyInflyncerNFTMindRecord } = useQuery(
    GetEarlyInflyncerNFTMindRecordByFidQueryOptions({
      variables: { fid: context?.user.fid.toString() ?? '' },
      keys: ['earlyInflyncerNFTMindRecord'],
      token: token ?? '',
    })
  );

  const isMinted = earlyInflyncerNFTMindRecord && earlyInflyncerNFTMindRecord.length > 0;

  const handleClaimClick = async () => {
    await getToken();
    onClaim(task.id);
  };

  const handleMintClick = () => {
    router.push(`/profile/${context?.user.fid}?tab=nft`);
  };

  return (
    <ListItem
      sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1, pr: 12, mb: 1 }}
      secondaryAction={
        isMinted || !token ? (
          <LoadingButton
            loading={isPending}
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleClaimClick}
            disabled={task.completed}
          >
            {task.completed ? 'Claimed' : 'Claim'}
          </LoadingButton>
        ) : (
          <LoadingButton variant="outlined" color="primary" size="small" onClick={handleMintClick}>
            Mint
          </LoadingButton>
        )
      }
    >
      <ListItemText>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Typography variant="body1" gutterBottom>
            {taskData.title}
          </Typography>
          <Chip
            label={`+${taskData.rewardIp} IP`}
            size="small"
            sx={{ fontSize: '10px', color: 'text.secondary' }}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {taskData.description}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

export default EarlyInflyncerTask;
