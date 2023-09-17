import { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Grid, Box, LinearProgress } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from '../dashboard/header';
import Nav from '../dashboard/nav';
import {useAuth} from "../../hooks/useAuth"

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------
 
export default function RequireAuthLayout({allowedRoles}) {
  const {auth} = useAuth();  //  { username: xxx, role:xxx, accessToken,msg:xxx}
  const [open, setOpen] = useState(false);
  const location = useLocation();

  if (!auth || !auth.accessToken){
    return <Navigate to="/login" state={{from:location}} replace />
  }

  if (allowedRoles.includes(auth.role)){
    return (
    <StyledRoot> 
    <Header onOpenNav={() => setOpen(true)} />
    <Nav openNav={open} onCloseNav={() => setOpen(false)} />
    <Main>
      <Outlet />
    </Main>
    </StyledRoot>)
  }
  
  return <Navigate to="/404" state={{from:location}} replace /> // if login (Y), allowed Role (X)

  
}