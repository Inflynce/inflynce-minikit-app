import React, { useEffect, useState } from 'react';
import {
  Stack,
  Button,
  TextField,
  ButtonGroup,
  CircularProgress,
  Alert,
  Typography,
  Box,
} from '@mui/material';
import {
  useAccount,
  useChainId,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
  useSimulateContract,
  useConnect,
  useSwitchChain,
} from 'wagmi';
import { injected } from 'wagmi/connectors';
import { parseUnits, formatUnits } from 'viem';
import { base } from 'viem/chains';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PostVoteRecordMutationOptions } from '@/queryFn/postVoteRecord';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

const erc20Abi = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

if (!process.env.NEXT_PUBLIC_MULTISIG_ADDRESS?.startsWith('0x')) {
  throw new Error('NEXT_PUBLIC_MULTISIG_ADDRESS must be a valid hex address');
}
if (!process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS_BASE?.startsWith('0x')) {
  throw new Error('NEXT_PUBLIC_USDC_CONTRACT_ADDRESS_BASE must be a valid hex address');
}
if (!process.env.NEXT_PUBLIC_SOCIAL_CONTRACT_ADDRESS_BASE?.startsWith('0x')) {
  throw new Error('NEXT_PUBLIC_SOCIAL_CONTRACT_ADDRESS_BASE must be a valid hex address');
}

const MULTISIG_ADDRESS = process.env.NEXT_PUBLIC_MULTISIG_ADDRESS as `0x${string}`;
const TOKEN_ADDRESSES = {
  usdc: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS_BASE as `0x${string}`,
  social: process.env.NEXT_PUBLIC_SOCIAL_CONTRACT_ADDRESS_BASE as `0x${string}`,
} as const;

const BASE_CHAIN_ID = base.id;

interface VoteFormProps {
  voteType: 'upvote' | 'downvote';
  targetSnapshotId: string;
  user: any;
  onCancel: () => void;
  onSuccess?: () => void;
}

const VoteForm: React.FC<VoteFormProps> = ({
  voteType,
  targetSnapshotId,
  user,
  onCancel,
  onSuccess,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [token, setToken] = useState<'usdc' | 'social'>('usdc');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>();
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const [estimatedGas, setEstimatedGas] = useState<bigint>();
  const [isTransacting, setIsTransacting] = useState(false);
  const { context } = useMiniKit();
  const { showSnackbar } = useSnackbar();

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect } = useConnect();
  const { switchChain } = useSwitchChain();

  const { writeContractAsync: transferTokens } = useWriteContract();
  const { isLoading: isWaitingForTx, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: BASE_CHAIN_ID,
  });

  const tokenAddress = TOKEN_ADDRESSES[token];

  const { data: tokenBalance } = useBalance({
    address,
    token: tokenAddress,
    chainId: BASE_CHAIN_ID,
  });

  const { data: simulationData } = useSimulateContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [MULTISIG_ADDRESS, amount ? parseUnits(amount, token === 'usdc' ? 6 : 18) : BigInt(0)],
    account: address,
    chainId: BASE_CHAIN_ID,
  });

  useEffect(() => {
    if (simulationData?.request) {
      setEstimatedGas(simulationData.request.gas);
    }
  }, [simulationData]);

  useEffect(() => {
    if (isTxSuccess && onSuccess) {
      onSuccess();
    }
  }, [isTxSuccess, onSuccess]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || Number(value) >= 0) {
      setAmount(value);
      setError(undefined);
    }
  };

  const isValidAmount = (): boolean => {
    const numValue = Number(amount);
    if (!amount || isNaN(numValue)) return false;

    if (token === 'usdc') {
      return numValue >= 0.1 && numValue <= 500;
    } else {
      return numValue >= 600 && numValue <= 3000000;
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep(1);
  };

  const { mutate } = useMutation(PostVoteRecordMutationOptions({}));

  const handleConfirmTransaction = async () => {
    if (!amount || !transferTokens || chainId !== BASE_CHAIN_ID) return;
    if (!context?.user.fid) {
      return;
    }

    try {
      setError(undefined);
      setIsTransacting(true);

      const hash = await transferTokens({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [MULTISIG_ADDRESS, parseUnits(amount, token === 'usdc' ? 6 : 18)],
      });

      setTxHash(hash);
      mutate({
        input: {
          targetSnapshotId,
          txHash: hash,
          voteType: voteType === 'upvote' ? 'up' : 'down',
          tokenType: token,
          voterId: context.user.fid,
          amount: Number(amount),
          voterAddress: address || '',
        },
      });
      showSnackbar('Transaction successful', 'success', 3000);
    } catch (err) {
      console.error('Transaction failed:', err);
      setError('Transaction failed');
      setActiveStep(0);
    } finally {
      setIsTransacting(false);
    }
  };

  const handleMaxClick = () => {
    if (tokenBalance) {
      const maxAmount =
        token === 'usdc'
          ? Math.min(Number(formatUnits(tokenBalance.value, tokenBalance.decimals)), 500)
          : Math.min(Number(formatUnits(tokenBalance.value, tokenBalance.decimals)), 3000000);
      setAmount(maxAmount.toString());
    }
  };

  const formatTokenBalance = (balance: bigint | undefined, decimals: number, isUSDC: boolean) => {
    if (!balance) return '0.00';
    const formatted = Number(formatUnits(balance, decimals));
    return isUSDC
      ? formatted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : formatted.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const renderAmountStep = () => (
    <Stack spacing={2}>
      <Typography variant="subtitle2" sx={{ color: '#1a1a2e' }}>
        {voteType === 'upvote' ? 'Upvote' : 'Downvote'}
      </Typography>

      <ButtonGroup fullWidth variant="outlined" disabled={isWaitingForTx || isTransacting}>
        <Button
          onClick={() => setToken('usdc')}
          sx={{
            bgcolor: token === 'usdc' ? '#1a1a2e' : 'transparent',
            color: token === 'usdc' ? 'white' : '#1a1a2e',
            '&:hover': {
              bgcolor: token === 'usdc' ? '#1a1a2e' : 'rgba(26,26,46,0.1)',
            },
          }}
        >
          USDC
        </Button>
        <Button
          onClick={() => setToken('social')}
          sx={{
            bgcolor: token === 'social' ? '#1a1a2e' : 'transparent',
            color: token === 'social' ? 'white' : '#1a1a2e',
            '&:hover': {
              bgcolor: token === 'social' ? '#1a1a2e' : 'rgba(26,26,46,0.1)',
            },
          }}
        >
          SOCIAL
        </Button>
      </ButtonGroup>

      <Stack spacing={1}>
        <TextField
          fullWidth
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          disabled={isTransacting || isWaitingForTx}
          variant="outlined"
          error={!!error}
          helperText={error}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(26,26,46,0.05)',
              '& fieldset': {
                borderColor: 'rgba(26,26,46,0.1)',
              },
            },
          }}
        />
        <Stack spacing={0.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="textSecondary">
              Your {token.toUpperCase()} Balance: {token === 'usdc' ? '$' : ''}
              {tokenBalance
                ? formatTokenBalance(tokenBalance.value, tokenBalance.decimals, token === 'usdc')
                : '0.00'}
              {token === 'social' ? ' SOCIAL' : ''}
            </Typography>
            <Button onClick={handleMaxClick} size="small">
              Max
            </Button>
          </Stack>
          <Typography variant="caption" color="textSecondary">
            * Limits: {token === 'usdc' ? '$0.1 - $500' : '600 - 3M SOCIAL'}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button onClick={onCancel}>CANCEL</Button>
        <Button variant="contained" onClick={handleNext} disabled={!amount || !isValidAmount()}>
          NEXT
        </Button>
      </Stack>
    </Stack>
  );

  const renderConfirmationStep = () => (
    <Stack spacing={3}>
      <Typography variant="h6" align="center">
        Confirm {voteType?.toUpperCase()}
      </Typography>

      <Typography
        variant="h6"
        align="center"
        sx={{
          py: 4,
          borderTop: '1px solid rgba(26,26,46,0.1)',
          borderBottom: '1px solid rgba(26,26,46,0.1)',
        }}
      >
        Your vote for{' '}
        <Box component="span" sx={{ fontWeight: 'bold' }}>
          {user?.displayName}
        </Box>{' '}
        is for{' '}
        <Box component="span" sx={{ fontWeight: 'bold' }}>
          {token === 'usdc' ? `$${amount}` : `${amount} SOCIAL`}
        </Box>
      </Typography>

      {chainId !== BASE_CHAIN_ID && (
        <Alert severity="warning">
          Please switch to Base network to continue.{' '}
          <Button
            color="inherit"
            size="small"
            onClick={() => switchChain({ chainId: BASE_CHAIN_ID })}
          >
            Switch Network
          </Button>
        </Alert>
      )}

      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          variant="outlined"
          disabled={isTransacting || isWaitingForTx}
          sx={{
            color: '#1a1a2e',
            borderColor: 'rgba(26,26,46,0.1)',
            '&:hover': {
              borderColor: '#1a1a2e',
              bgcolor: 'rgba(26,26,46,0.05)',
            },
            px: 3,
          }}
        >
          BACK
        </Button>
        <Button
          onClick={handleConfirmTransaction}
          variant="contained"
          disabled={isTransacting || isWaitingForTx || chainId !== BASE_CHAIN_ID}
          sx={{
            bgcolor: '#1a1a2e',
            '&:hover': {
              bgcolor: 'rgba(26,26,46,0.8)',
            },
            px: 3,
          }}
        >
          {isTransacting || isWaitingForTx ? (
            <CircularProgress size={24} color="info" />
          ) : (
            'CONFIRM'
          )}
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ p: 2, bgcolor: 'white', color: 'primary.main', mt: 1, borderRadius: 2 }}>
      {activeStep === 0 ? renderAmountStep() : renderConfirmationStep()}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: activeStep === 0 ? '#1a1a2e' : 'rgba(26,26,46,0.2)',
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: activeStep === 1 ? '#1a1a2e' : 'rgba(26,26,46,0.2)',
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default VoteForm;
