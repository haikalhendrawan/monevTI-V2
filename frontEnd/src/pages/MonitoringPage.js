import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';


// ----------------------------------------------------------------------

export default function MonitoringPage() {


  return (
    <>
      <Helmet>
        <title> Dashboard:Monitoring </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Monitoring
        </Typography>

      </Container>
    </>
  );
}
