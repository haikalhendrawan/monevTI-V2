// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

WelcomeCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function WelcomeCard({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card sx={{py: 5, boxShadow: 0, color: (theme) => theme.palette[color].darker, bgcolor: (theme) => theme.palette[color].lighter, ...sx,}} {...other}>
      <Grid container spacing={2} sx={{pl:4}}>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant='h4'>Welcome, </Typography>
          <Typography variant='h4'>KPPN Padang</Typography>
          <Typography variant='body1'>Welcome, </Typography>
          <Typography variant='body1'>KPPN Padang</Typography>
          <Typography variant='body1'>Welcome, </Typography>
          <Typography variant='body1'>KPPN Padang</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
        <Typography>ABC</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
