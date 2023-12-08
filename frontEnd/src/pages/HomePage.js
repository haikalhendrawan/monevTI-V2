import {useEffect, useRef} from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, LinearProgress, Button, Box } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {AppOrderTimeline, AppWidgetSummary} from '../sections/@dashboard/app';
import WelcomeCard from "../sections/@dashboard/home/WelcomeCard";

import {useAuth} from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

// ----------------------------------------------------------------------

export default function HomePage() {
  const {auth, setAuth} = useAuth(); // { username: xxx, role:xxx, accessToken,msg:xxx}
  const scrollRef = useRef(null);
  const theme = useTheme();
  const name = auth.username;

  const scrollToComponent = () => {
    scrollRef.current.scrollIntoView({behavior: 'smooth'})
  };

  useEffect(()=>{
    console.log(auth);
  },[auth])

  return (
    <>
      <Helmet>
        <title> Dashboard | MonevTI  </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3} >
          <Grid container xs={12} sm={6} md={8} sx={{pt:0, pl:3}}>
            <WelcomeCard title="Weekly Sales" 
              total={714000} 
              icon={'ant-design:android-filled'} 
              sx={{width:'100%', borderRadius:'16px' }}
              scrollToRef = {scrollToComponent}
              />
          </Grid>

          <Grid container xs={12} sm={6} md={4} sx={{pt:0, pl:3 }}>
            <AppWidgetSummary title='carousel' sx={{width:'100%', borderRadius:'16px'}}/>
          </Grid>

          <Grid item xs={12} md={6} lg={5} ref={scrollRef}>
            <AppOrderTimeline
                title="Workflow Pengerjaan"
                list={[...Array(5)].map((_, index) => ({
                  id: index+1,
                  title: [
                    '1. Update data profile dan data PIC TIK',
                    '2. Update Data Asset dan Pengguna TIK',
                    '3. Kerjakan Worksheet, terdiri dari 3 bagian/section',
                    '4. Cetak seluruh ouput laporan dan BA yang dibutuhkan',
                    '5. Kirimkan output laporan dan BA melalui Nota Dinas kepada Kanwil DJPb',
                  ][index],
                  text:[
                    'Est. Waktu: 5 mnt -> menu profile',
                    'Est. Waktu: 1 - 4 jam -> menu Data TIK',
                    'Est. Waktu: 8 - 11 jam -> menu Worksheet',
                    'Est. Waktu: 5 - 10 mnt -> menu Data TIK dan Worksheet',
                    'Est. Waktu: 30 - 60 mnt -> Satu Kemenkeu',
                  ][index],
                  color:[
                    'primary',
                    'warning',
                    'success',
                    'error',
                    'info'
                  ][index]
                }))}
              />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
