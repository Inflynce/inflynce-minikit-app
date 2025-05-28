import { useState } from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Button,
  Stack,
  TextField,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { PostBoostMutationOptions } from '@/queryFn/postBoost';
import { useInflynceAuth } from '@/contexts/InflynceContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { parseUnits, formatUnits } from 'viem';
import { sdk } from '@farcaster/frame-sdk';

interface BoostDialogProps {
  open: boolean;
  onClose: () => void;
}

if (!process.env.NEXT_PUBLIC_BOOSTS_ADDRESS?.startsWith('0x')) {
  throw new Error('NEXT_PUBLIC_BOOSTS_ADDRESS must be a valid hex address');
}
const BOOSTS_ADDRESS = process.env.NEXT_PUBLIC_BOOSTS_ADDRESS as `0x${string}`;

const boostSchema = z.object({
  budget: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), 'Budget must be a number')
    .refine((val) => parseFloat(val) >= 0, 'Budget must be greater than 0'),
  castUrl: z
    .string()
    .url('Must be a valid URL')
    .refine((url) => url.includes('farcaster.xyz'), 'Must be a Farcaster cast URL'),
  duration: z.enum(['3', '7', '30']),
  mindsharePercentage: z.number().min(0).max(1),
});

type BoostFormData = z.infer<typeof boostSchema>;

export const BoostDialog = ({ open, onClose }: BoostDialogProps) => {
  const [budget, setBudget] = useState<string>('1');
  const [duration, setDuration] = useState<string>('3');
  const [mindsharePercentage, setMindsharePercentage] = useState<number>(0.1);
  const [multiplier, setMultiplier] = useState<number>(0.5);
  const [castUrl, setCastUrl] = useState<string>('https://farcaster.xyz/inflynce/0x352001ec');
  const [errors, setErrors] = useState<Partial<Record<keyof BoostFormData, string>>>({});
  const { token, getToken } = useInflynceAuth();
  const { showSnackbar } = useSnackbar();
  const { context } = useMiniKit();

  const { mutate: postBoost } = useMutation(
    PostBoostMutationOptions({
      token: token ?? '',
      options: {
        onSuccess: (data) => {
          // TODO: handle success
          onClose();
          showSnackbar('Boost created successfully', 'success');
        },
        onError: (error: any) => {
          console.error('Error creating boost:', error);
          showSnackbar('Error creating boost', 'error');
        },
      },
    })
  );

  const validateForm = () => {
    try {
      boostSchema.parse({
        budget,
        castUrl,
        duration,
        mindsharePercentage,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce(
          (acc, curr) => {
            const path = curr.path[0] as keyof BoostFormData;
            acc[path] = curr.message;
            return acc;
          },
          {} as Partial<Record<keyof BoostFormData, string>>
        );
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const result = await sdk.actions.sendToken({
          token: 'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
          amount: parseUnits(budget, 6).toString(),
          recipientAddress: BOOSTS_ADDRESS,
        });

        if (!result.success) {
          showSnackbar('Failed to send tokens', 'error');
          return;
        }

        postBoost({
          castUrl,
          creatorFid: context?.user.fid.toString() ?? '',
          txHash: result.send.transaction,
          mindshareFilterDuration: parseInt(duration),
          campaignBudget: parseFloat(budget),
          minMindshare: mindsharePercentage,
        });
      } catch (error) {
        console.error('Transaction failed:', error);
        showSnackbar('Transaction failed', 'error');
      }
    }
  };

  const handleDurationChange = (event: React.MouseEvent<HTMLElement>, newDuration: string) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, ''); // Remove all non-numeric characters except decimal
    if (value === '' || !isNaN(parseFloat(value))) {
      setBudget(value);
      setErrors({});
    }
  };

  const handleBudgetQuickSelect = (amount: string) => {
    setBudget(amount);
    setErrors({});
  };

  const budgetOptions = [
    [1, 5, 10],
    [25, 50, 100],
  ];

  const BudgetButton = ({ amount }: { amount: number }) => (
    <Button
      variant="contained"
      size="small"
      onClick={() => handleBudgetQuickSelect(amount.toString())}
      sx={{
        flex: 1,
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
      }}
    >
      ${amount}
    </Button>
  );

  const calculateCostPerRecast = () => {
    return mindsharePercentage * multiplier;
  };

  const toggleButtonSx = {
    color: 'white',
    '&.Mui-selected': {
      bgcolor: '#FF6B00',
      color: 'white',
      '&:hover': { bgcolor: '#FF8533' },
    },
  };

  const durations = ['3', '7', '30'];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          background: '#121212',
          color: 'white',
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top={0}
        zIndex={1200}
        p={1}
        px={2}
        sx={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: '#121212',
        }}
      >
        <Typography variant="h6">Mindshare Boosting</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="auto" p={2}>
        <Stack spacing={3}>
          <Box p={2} bgcolor="#1E1E1E" borderRadius={1}>
            <Typography variant="subtitle1" gutterBottom>
              Total Budget:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Set your total campaign budget. This amount will be used to reward eligible users.
            </Typography>
            <TextField
              fullWidth
              value={`$${budget}`}
              onChange={handleBudgetChange}
              error={!!errors.budget}
              helperText={errors.budget}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                '& input': {
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '1.5rem',
                },
                '& .MuiFormHelperText-root': {
                  color: '#ff4444',
                },
              }}
            />
            {budgetOptions.map((row, i) => (
              <Stack key={i} direction="row" spacing={1} sx={{ mb: i === 0 ? 1 : 0 }}>
                {row.map((amount) => (
                  <BudgetButton key={amount} amount={amount} />
                ))}
              </Stack>
            ))}

            {/* <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#FF6B00',
                color: 'white',
                mt: 2,
                '&:hover': { bgcolor: '#FF8533' },
              }}
            >
              Approve USDC
            </Button> */}
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Mindshare Filter:
            </Typography>
            <ToggleButtonGroup
              value={duration}
              exclusive
              size="small"
              onChange={handleDurationChange}
              aria-label="duration"
              fullWidth
              sx={{ mb: 2 }}
            >
              {durations.map((value) => (
                <ToggleButton key={value} value={value} sx={toggleButtonSx}>
                  {value} days
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Set the minimum Mindshare required to join this boost:
            </Typography>
            <Slider
              value={mindsharePercentage}
              onChange={(_, newValue) => setMindsharePercentage(newValue as number)}
              min={0}
              max={1}
              step={0.01}
              sx={{
                color: '#FF6B00',
                '& .MuiSlider-thumb': {
                  width: 20,
                  height: 20,
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" align="left">
              Mindshare: {mindsharePercentage.toFixed(2)}%
            </Typography>
          </Box>

          {/* <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Cost Multiplier:
            </Typography>
            <Select
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
              fullWidth
              size="small"
            >
              <MenuItem value={0.25}>0.25x</MenuItem>
              <MenuItem value={0.5}>0.5x</MenuItem>
              <MenuItem value={1}>1x</MenuItem>
              <MenuItem value={2}>2x</MenuItem>
            </Select>
          </Box> */}

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Minimum cost per recast:
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ color: '#FF6B00' }}>
              ${calculateCostPerRecast().toFixed(2)}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Cost per recast = Mindshare × 100 × multiplier
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A user with 0.40% Mindshare → 0.40% × 100 × 0.5 = $0.20 per recast (10% of this cost
              is charged as a protocol service fee.)
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Cast URL:
            </Typography>
            <TextField
              fullWidth
              value={castUrl}
              onChange={(e) => setCastUrl(e.target.value)}
              placeholder="Paste the link to the cast you want to boost"
              error={!!errors.castUrl}
              helperText={errors.castUrl}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                '& input': {
                  color: 'white',
                },
                '& .MuiFormHelperText-root': {
                  color: '#ff4444',
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              E.g. https://farcaster.xyz/inflynce/0x352001ec
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={
              Object.keys(errors).length > 0 || !castUrl || !budget || parseFloat(budget) <= 0
            }
            sx={{
              bgcolor: '#FF6B00',
              color: 'white',
              py: 1.5,
              mb: 2,
              '&:hover': { bgcolor: '#FF8533' },
              '&.Mui-disabled': {
                bgcolor: 'rgba(255, 107, 0, 0.3)',
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Start Boosting
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default BoostDialog;
