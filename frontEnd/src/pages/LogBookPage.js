import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography, Box, Button } from '@mui/material';


// ----------------------------------------------------------------------

export default function LogBookPage() {

  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));

  return (
    <>
      <Helmet>
        <title> Dashboard:Topology </title>
      </Helmet>

      <Container>

        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Restricted access
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            This module will be accessible in the future, stay tune!
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>

      </Container>
    </>
  );
}
