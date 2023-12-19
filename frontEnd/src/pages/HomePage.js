import {useEffect, useRef} from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, LinearProgress, Button, Box } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import WelcomeCard from "../sections/@dashboard/home/WelcomeCard";
import ImageCarousel from "../sections/@dashboard/home/ImageCarousel";
import WorkflowTimeline from "../sections/@dashboard/home/WorkflowTimeline";
import WebsiteVisit from "../sections/@dashboard/home/WebsiteVisit";

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
            <ImageCarousel title='carousel' sx={{width:'100%', borderRadius:'16px'}}/>
          </Grid>

          <Grid item xs={12} md={6} lg={5} ref={scrollRef}>
            <WorkflowTimeline
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
                    'Profile Icon -> menu profile (Est. Waktu: 5 mnt)',
                    'Menu Data TIK (Est. Waktu: 1 - 4 jam) ',
                    'Menu Worksheet (Est. Waktu: 4 - 6 jam  )',
                    'Menu Data TIK dan Menu Worksheet (Est. Waktu: 5 - 10 mnt)',
                    'Satu Kemenkeu (Est. Waktu: 30 - 60 mnt)',
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
          <Grid item xs={12} md={6} lg={7}>
            <WebsiteVisit
              title="Website Visits"
              subheader="(+23%) last few days"
              chartLabels={[
                '12/09/2023',
                '12/10/2023',
                '12/11/2023',
                '12/12/2023',
                '12/13/2023',
                '12/14/2023',
                '12/15/2023',
                '12/16/2023',
                '12/17/2023',
                '12/18/2023',
                '12/19/2023',
              ]}
              chartData={[

                {
                  name: 'Web Visit',
                  type: 'area',
                  fill: 'gradient',
                  data: [0, 0, 0, 0, 4, 20, 5, 12, 23, 12, 22],
                },
               
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
