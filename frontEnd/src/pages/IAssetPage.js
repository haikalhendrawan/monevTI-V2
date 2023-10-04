import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';


// ----------------------------------------------------------------------

export default function IAssetPage() {


  return (
    <>
      <Helmet>
        <title> Dashboard: Products | IAsset </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          IAsset
        </Typography>

      </Container>
    </>
  );
}
