import { Link as RouterLink } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Card, Typography, CardMedia, Box, Button, Link } from '@mui/material';
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


export default function ImageCarousel({ title, total, icon, color = 'primary', sx, ...other }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        boxShadow: 0,
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
        <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                background: `linear-gradient(to bottom, transparent, ${theme.palette.background.paper})`,
                zIndex: 1, 
              },
            }}
          >
            <CardMedia
              component="img"
              image="/assets/sd5.png"
              alt="green iguana"
              sx={{
                height: '100%',
                position: 'relative', 
                zIndex: 0, 
              }}
            />
          </Box>

          <Typography variant='h5' sx={{position: 'absolute', bottom: '8%', left: 0, width: '100%', padding: 2, zIndex:2, color:theme.palette.text.primary}}>
            How To Start
          </Typography>
          <Typography variant='body2' sx={{position: 'absolute', bottom: '2%', left: 0, width: '100%', padding: 2, zIndex:2, color:theme.palette.text.disabled}}>
            Need help? click here!
          </Typography>
        </Link>
    </Card>
  );
}
