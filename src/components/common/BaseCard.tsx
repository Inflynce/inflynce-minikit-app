import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BaseCard = styled(Card)(({ theme }) => ({
  background: '#1E1E1E',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  // padding: theme.spacing(2.5),
  width: '100%',
}));

export const StyledCard = styled(BaseCard)({
  borderRadius: '16px',
  padding: '12px',
  // background: '#1E1E1E',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  marginBottom: '12px',
  minHeight: '200px',
});
