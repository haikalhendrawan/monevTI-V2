import React from 'react';
import { Container, Stack, Typography, Grid, Card, CardHeader, IconButton, Tooltip,
  FormControl, TextField, Button, Divider, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import WorksheetCard from '../component/WorksheetCard';
import WorksheetQuestion from './WorksheetQuestion';

export default function QuestionTableHeader(){
  const theme = useTheme();

  return(
    <>
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{backgroundColor:theme.palette.background.default, pl:1, pt:0}}>
        <Grid container sx={{mt:1, textAlign:'center', justifyContent:'center'}} spacing={0}>  {/* Kepala Table */}
          <Grid item xs={1}>
              <Typography variant="body2" sx={{mr:1}}>No</Typography>
          </Grid>

          <Grid item xs={4}>
              <Typography variant="body2" sx={{mr:2}}>Pertanyaan</Typography>
          </Grid>

          <Grid item xs={1} />


          <Grid item xs={6}>
              <Typography variant="body2" sx={{ml:3}}>Jawaban</Typography>
          </Grid>
        </Grid>
        <Divider  flexItem/> 
      </Card> 
    </Grid>
    </>
  )

}