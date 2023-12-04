import React from 'react';
import { Container, Stack, Typography, Grid, Card, CardHeader, IconButton, Tooltip,
  FormControl, TextField, Button, Divider, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import WorksheetCard from '../component/WorksheetCard';
import WorksheetQuestion from './WorksheetQuestion';

// -------------------------------------------------




// ------------------------------------------------

export default function QuestionTableFooter(){
  const theme = useTheme();

  return(
    <>
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{backgroundColor:theme.palette.background.paper, pl:1, pt:0}}>
        <Grid container sx={{mt:1, textAlign:'center', justifyContent:'center'}} spacing={0}>  {/* Kepala Table */}
          <Grid item xs={12}>
              <Typography variant="body2" sx={{mr:1}}>Send</Typography>
              <Button variant='contained'>Send</Button>
          </Grid>
        </Grid>
      </Card> 
    </Grid>
    </>
  )

}