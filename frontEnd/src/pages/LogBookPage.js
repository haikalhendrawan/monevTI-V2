import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';


// ----------------------------------------------------------------------

export default function LogBookPage() {


  return (
    <>
      <Helmet>
        <title> Dashboard:Log Book </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Log Book
        </Typography>

      </Container>
    </>
  );
}
