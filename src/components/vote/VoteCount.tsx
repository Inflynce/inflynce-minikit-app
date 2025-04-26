import React from 'react';
import { Stack, Typography } from '@mui/material';
import VoteButtonsSkeleton from '@/components/skeleton/VoteButtonsSkeleton';

interface VoteCountProps {
  voteData: {
    social: { count: number; sum: number };
    usdc: { count: number; sum: number };
  };
  isLoading: boolean;
  color: string;
  socialUsdPrice: number;
}

const VoteCount: React.FC<VoteCountProps> = ({ voteData, isLoading, color, socialUsdPrice }) => {
  if (isLoading) {
    return <VoteButtonsSkeleton width="50%" height={20} color="grey.600" count={3} />;
  }

  const totalCount = (voteData?.social.count ?? 0) + (voteData?.usdc.count ?? 0);
  const usdcSum = voteData?.usdc.sum ?? 0;
  const socialSum = voteData?.social.sum ?? 0;
  const totalValue = (socialSum * socialUsdPrice + usdcSum).toFixed(2);

  return (
    <>
      <Typography
        variant="body1"
        textAlign="center"
        mt={1}
        fontSize={12}
        fontWeight={700}
        color={color}
      >
        {totalCount} votes
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        mt={0.5}
        fontSize={12}
        fontWeight={700}
        color={color}
      >
        {`${usdcSum} USDC voted`}
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        mt={0.5}
        fontSize={12}
        fontWeight={700}
        color={color}
      >
        {`${socialSum} $SOCIAL voted`}
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        mt={0.5}
        fontSize={12}
        fontWeight={700}
        color={color}
      >
        {`${totalValue} USDC voted total`}
      </Typography>
    </>
  );
};

export default VoteCount;
