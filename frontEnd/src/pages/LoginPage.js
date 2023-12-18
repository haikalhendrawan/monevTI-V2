import { Helmet } from 'react-helmet-async';
import {useState, useEffect} from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Card, Alert, Box, LinearProgress} from '@mui/material';
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

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '720px', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  // backgroundImage:'url(/assets/bg.png)'
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
        <title> Login | MonevTI</title>
      </Helmet>

      <StyledRoot>
          <StyledSection>
            <Waterwave style={{position: 'absolute', top: 0, left:0 , width: '100%', height: '100%', objectFit: 'contain'}}>
              {({pause, play}) => (
                <img
                  src={'assets/logomonevti1.svg'}
                  alt="background"
                  style={{
                    width: '50%',
                    height: '100%',
                    background:'cover',
                    fill: '#FFFFFF',
                  }}
                />

              )}
            </Waterwave>
          </ StyledSection>
          
        <Container maxWidth="sm" >
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            <Typography variant="body" gutterBottom sx={{mb:5}}>
              gunakan username dan password masing2 kppn
            </Typography>

            <LoginForm />   {/* logika dihandle di komponen ini */}
            
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={0} sx={{bottom:10, position:'fixed', width:'38%'}}>
                {/* <Typography variant='body2'>Modul Monev TIK</Typography> */}
                <Typography variant='body2'>Copyright © 2023 Kanwil DJPb Prov Sumbar</Typography>
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
