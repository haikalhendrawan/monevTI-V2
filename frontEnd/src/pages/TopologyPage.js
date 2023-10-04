import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';


// ----------------------------------------------------------------------

export default function TopologyPage() {


  return (
    <>
      <Helmet>
        <title> Dashboard:Topology </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Topology
        </Typography>

      </Container>
    </>
  );
}
