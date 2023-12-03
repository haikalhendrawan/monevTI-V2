import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Grid, Tabs, Tab, Box, Card, CardHeader,
           LinearProgress, LinearProgressProps, Tooltip} from '@mui/material';
// component
import Iconify from "../components/iconify/index";
import WorksheetCard from '../sections/@dashboard/worksheet/WorksheetCard';
import WorksheetInfo from '../sections/@dashboard/worksheet/WorksheetInfo';

// ----------------------------------------------------------------------

const cardd = [...Array(50).map((item, index) => {
  return(index)
})];

export default function WorksheetPage() {
  const [tabValue, setTabValue] = useState(0); // ganti menu jenis perangkat yang ditampilkan

  const handleTabChange = (event, newValue) => { // setiap tab jenis asset berubah
    setTabValue(newValue);
  };

  function LinearProgressWithLabel(props) {
    return (
      <Tooltip title="(5/10) input seluruh bagian diselesaikan">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary" noWrap>
              {`${Math.round(props.value,)}%`}
            </Typography>
          </Box>
      </Box>
      </Tooltip>
    );
  };


  return (
    <>
      <Helmet>
        <title> Dashboard:Worksheet </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Worksheet
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab icon={<Iconify icon="solar:monitor-smartphone-bold-duotone" />} label="Jaringan" value={0} />
            <Tab icon={<Iconify icon="solar:laptop-bold-duotone" />} label="Perangkat" value={1}/>
            <Tab icon={<Iconify icon="solar:printer-bold-duotone" />} label="Security" value={2}/>
            <Tab icon={<Iconify icon="solar:printer-bold-duotone" />} label="Kuesioner" value={3}/>
          </Tabs>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center " mb={6}>
          <Box sx={{ width: '50%' }}>
            <LinearProgressWithLabel value={60} />
          </Box>
        </Stack>

        <Grid container spacing={2}>
          <Grid item container sm={8} spacing={2}>
            {cardd.map(() => {
            return (<WorksheetCard key={1} name={`ABC`} nik={`ABC`} username={`ABC`} user_id={`ABC`}/>) 
              })
            }
          </Grid>

          <Grid item sm={4}>
            <WorksheetInfo />
          </Grid>

        </Grid>


        
      </Container>
    </>
  );
}
