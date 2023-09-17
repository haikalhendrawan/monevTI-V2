import { Helmet } from 'react-helmet-async';
import {useState, useEffect} from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Card, Alert, Box, LinearProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// hooks
import PuffLoader from "react-spinners/PuffLoader";
import Waterwave from "react-water-wave";
import SimpleBackdrop from "../components/loading/simpleBackdrop";
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

// const StyledSection = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: 720,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   // backgroundColor: theme.palette.background.default,
//   backgroundColor: "#e5e5f7",
//   opacity: 0.8,
//   backgroundImage: radial-gradient(circle at center center, #413fc3, #e5e5f7), repeating-radial-gradient(circle at center center, #413fc3, #413fc3, 10px, transparent 20px, transparent 10px),
//   backgroundBlendMode: multiply,
// }));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '720px', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: "#e5e5f7",
  opacity: 0.8,
  background: 'linear-gradient(to bottom, #f0f2f0, #000c40)',
  backgroundBlendMode: 'multiply' 
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
      
          <StyledSection>
            <Waterwave  style={{position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', margin:'100'}}>
              {({pause, play}) => (
                <div />
              )}
            </Waterwave>
          </ StyledSection >
          
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to MonevTI
            </Typography>
            <Typography variant="body" gutterBottom>
              Press icon below to show mock account!
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
              > Use <strong>"root/index"</strong>as username/password
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
