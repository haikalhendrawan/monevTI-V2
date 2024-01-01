import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography, Box, Button, Card, CardHeader, CardContent, Grid } from '@mui/material';
// hooks
import useAxiosJWT from '../../hooks/useAxiosJWT';


// ----------------------------------------------------------------------

export default function UseRefPage() {
  const axiosJWT = useAxiosJWT();
  const [checklist, setChecklist] = useState(null)

  const fetchData = async() => {
    try{
      const response = await axiosJWT.get("/getChecklistRef/0");
      setChecklist(response.data);
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() =>{
    fetchData()
  },[])

  return (
    <>
      <Helmet>
        <title> Worksheet Ref </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack direction='row' spacing={2}>
            <Typography variant="h4" gutterBottom>
              Data pengerjaan KPPN
            </Typography>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Card sx={{height:'100%', width:'100%'}}>
              <CardHeader title='Kertas kerja bagian 1 dan 2' />
              
              <CardContent>
                {JSON.stringify(checklist?.rows)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        

      </Container>
    </>
  );
}
