import React from 'react';
import { Container, Stack, Typography, Grid, Card,
  FormControl, TextField, Button, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import WorksheetCard from '../component/WorksheetCard';
import WorksheetQuestion from './WorksheetQuestion';

export default function QuestionTitle(){
  const theme = useTheme();

  return(
    <>
      <Grid item xs={12} sm={12} md={12}>
        <Card sx={{backgroundColor:theme.palette.background.default, pl:1, height:80, pt:0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h5' sx={{position:'absolute'}}>Kuesioner PIC TIK</Typography>
          <Button variant="outlined" color='primary' sx={{borderRadius:'12px', height:'50px', ml:40}}>
            00:00
          </Button>
        </Card> 
      </Grid>
    </>
  )

}