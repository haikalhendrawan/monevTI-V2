import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Grid, Tabs, Tab, Box, Card, CardHeader,
           LinearProgress, LinearProgressProps, Tooltip} from '@mui/material';
// component
import Iconify from "../components/iconify/index";
import WorksheetSection1 from '../sections/@dashboard/worksheet/WorksheetSection1';
import WorksheetSection2 from '../sections/@dashboard/worksheet/WorksheetSection2';
import WorksheetSection3 from '../sections/@dashboard/worksheet/WorksheetSection3';
import WorksheetSection4 from '../sections/@dashboard/worksheet/WorksheetSection4';
import WorksheetLanding from '../sections/@dashboard/worksheet/WorksheetLanding';

// hooks
import { useAuth } from '../hooks/useAuth';
import useAxiosJWT from '../hooks/useAxiosJWT';
import {WorksheetProvider} from '../sections/@dashboard/worksheet/useWorksheet';

// ----------------------------------------------------------------------


export default function WorksheetPage() {
  const [tabValue, setTabValue] = useState(0); // ganti menu jenis perangkat yang ditampilkan

  const handleTabChange = (event, newValue) => { // setiap tab jenis asset berubah
    setTabValue(newValue);
  };
   
  return (
    <>
      <Helmet>
        <title> Worksheet | MonevTI</title>
      </Helmet>

      <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Kertas Kerja
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab icon={<Iconify icon="icon-park-outline:network-tree" />} label="1. Jaringan" value={0} />
              <Tab icon={<Iconify icon="wpf:key-security" />} label="2. Perangkat & IT Sec" value={1} />
              <Tab icon={<Iconify icon="wpf:survey" />} label="3. Kuesioner" value={2} />
              <Tab icon={<Iconify icon="material-symbols:send" />} label="Kirim" value={3} />
            </Tabs>
          </Stack>

          <WorksheetProvider>
            <WorksheetLanding tabValue={tabValue} />
          </WorksheetProvider>
          
          
      </Container>
    </>
  );
}


// --------------------------------------------------------------utility component
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
