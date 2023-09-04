import { Helmet } from 'react-helmet-async';
import {useState} from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Card, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [showAlert, setShowAlert] = useState(false);

  const handleClick=()=>{
    setShowAlert((prevState)=>{return !prevState})
  }

  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />
        
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to MonevTI
            </Typography>
            <Typography variant="body" gutterBottom>
              Press button below to show mock account!
            </Typography>

            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <Button size="large" color="inherit" variant="outlined" sx={{mb:2}} onClick={handleClick}>
                <Iconify icon="line-md:account" color="#2065D1" width={22} height={22} />
            </Button>
            {showAlert?(
              <Alert 
                variant="outlined" 
                severity="info"   
                sx={{
                  position: 'relative',
                  bottom: '7px', 
                }}
              > Use <strong>"admin/admin" </strong>as password and username
              </Alert>):null}
            </Stack>

            <Divider />

            <LoginForm />   {/* logika dihandle di komponen ini */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
