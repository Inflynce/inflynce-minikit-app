import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
  styled,
  stepConnectorClasses,
  StepConnector,
  TextField,
  Stack,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import CardGiftcardSharpIcon from '@mui/icons-material/CardGiftcardSharp';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
  fid: string;
  taskId: string;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ open, onClose, fid, taskId }) => {
  const steps = ['General Info', 'Rewards', 'Tasks', 'Bot Filters'];
  const [activeStep, setActiveStep] = useState(0);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [startTime, setStartTime] = React.useState<Date | null>(null);
  const [endTime, setEndTime] = React.useState<Date | null>(null);

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
  }));

  
  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.completed,
        style: {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        },
      },
    ],
  }));
  

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    const icons: { [index: string]: React.ReactElement<unknown> } = {
      1: <SettingsIcon />,
      2: <CardGiftcardSharpIcon />,
      3: <AssignmentSharpIcon />,
      4: <TuneSharpIcon />,
    };
  
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3} sx={{ mt: 2, px: 1 }}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Write a name of your task. Max. 50 characters."
              inputProps={{ maxLength: 50 }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description for your task. Max. 250 characters."
              inputProps={{ maxLength: 250 }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            />

            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Cover Image
              </Typography>
              <Box
                sx={{
                  border: '1px dashed rgba(255, 255, 255, 0.3)',
                  borderRadius: 2,
                  p: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }
                }}
              >
                <CloudUploadIcon sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.5)' }} />
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  style={{ display: 'none' }}
                  id="cover-image-upload"
                />
                <label htmlFor="cover-image-upload" style={{ cursor: 'pointer' }}>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    1920x1080 px
                  </Typography>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    .png .jpeg .jpg is allowed
                  </Typography>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    Maximum 5 mb.
                  </Typography>
                </label>
              </Box>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Frame Image
              </Typography>
              <Box
                sx={{
                  border: '1px dashed rgba(255, 255, 255, 0.3)',
                  borderRadius: 2,
                  p: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }
                }}
              >
                <CloudUploadIcon sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.5)' }} />
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  style={{ display: 'none' }}
                  id="frame-image-upload"
                />
                <label htmlFor="frame-image-upload" style={{ cursor: 'pointer' }}>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    3:2 aspect ratio
                  </Typography>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    .png .jpeg .jpg is allowed
                  </Typography>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    Maximum 5 mb.
                  </Typography>
                </label>
              </Box>
            </Stack>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Typography variant="subtitle2" color="text.secondary">
                Duration
              </Typography>
              <Stack direction="row" spacing={2}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  sx={{ 
                    flex: 1,
                  }}
                />
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  sx={{ 
                    flex: 1,
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  sx={{ 
                    flex: 1,
                  }}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  sx={{ 
                    flex: 1,
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={3} sx={{ mt: 2, px: 1 }}>
            <TextField
              fullWidth
              label="Name"
              placeholder="Write a name of your NFT. Max. 50 characters."
              inputProps={{ maxLength: 50 }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Metadata Description"
              placeholder="Write a description for NFT. This text-only description will be part of the NFT metadata. Max 500 characters."
              inputProps={{ maxLength: 500 }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            />

            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                NFT Image
              </Typography>
              <Box
                sx={{
                  border: '1px dashed rgba(255, 255, 255, 0.3)',
                  borderRadius: 2,
                  p: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }
                }}
              >
                <CloudUploadIcon sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.5)' }} />
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg,.gif"
                  style={{ display: 'none' }}
                  id="nft-image-upload"
                />
                <label htmlFor="nft-image-upload" style={{ cursor: 'pointer' }}>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    1:1 aspect ratio
                  </Typography>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    .png .jpeg .jpg .gif is allowed
                  </Typography>
                  <Typography align="center" color="text.secondary" sx={{ fontSize: 14 }}>
                    Maximum 5 mb.
                  </Typography>
                </label>
              </Box>
            </Stack>

            <TextField
              fullWidth
              label="Payout Address"
              placeholder="0x..."
              helperText="When users pay for minting the NFT, you'll receive the funds on this wallet address."
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            />

            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Availability
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  Non-transferable
                </Button>
                <Button 
                  variant="contained" 
                  fullWidth
                  color="primary"
                >
                  Transferable
                </Button>
              </Stack>
            </Stack>

            <TextField
              fullWidth
              label="Supply"
              placeholder="If you write 0, it means unlimited."
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            />

            <TextField
              fullWidth
              label="Claiming per address"
              placeholder="We suggest 1 to engage with more users."
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            />

            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Token
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  $ETH
                </Button>
                <Button 
                  variant="contained" 
                  fullWidth
                  color="primary"
                >
                  $USDC
                </Button>
              </Stack>
            </Stack>

            <TextField
              fullWidth
              label="Price"
              placeholder="If you write 0, it means free."
              helperText="Collectors will pay an additional 0.0001ETH Guild minting fee. Learn more"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            />
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={3} sx={{ mt: 2, px: 1 }}>
            {/* Tasks form fields */}
          </Stack>
        );
      case 3:
        return (
          <Stack spacing={3} sx={{ mt: 2, px: 1 }}>
            {/* Bot Filters form fields */}
          </Stack>
        );
      default:
        return 'Unknown step';
    }
  };

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
        sx={{ 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: '#121212',
        }}
      >
        <Typography variant="h6">
          <Button variant="outlined" color="primary" size="small">
            Save Draft
          </Button>
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%" p={1}>
        <Stack spacing={3}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, gap: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Next
            </Button>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CreateTask;
