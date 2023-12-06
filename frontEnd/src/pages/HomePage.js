import {useEffect} from "react";
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, LinearProgress, Button, Box } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import WelcomeCard from "../sections/@dashboard/home/WelcomeCard";

import {useAuth} from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

// ----------------------------------------------------------------------

export default function HomePage() {
  const {auth, setAuth} = useAuth(); // { username: xxx, role:xxx, accessToken,msg:xxx}
  const theme = useTheme();
  const name = auth.username;

  
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
          <Grid container xs={12} sm={6} md={8} fixed sx={{pt:0, pl:3}}>
            <WelcomeCard title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} sx={{width:'100%', borderRadius:'16px' }}/>
          </Grid>

          <Grid container xs={12} sm={6} md={4} sx={{pt:0, pl:3 }}>
            <AppWidgetSummary sx={{width:'100%', borderRadius:'16px'}}/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
