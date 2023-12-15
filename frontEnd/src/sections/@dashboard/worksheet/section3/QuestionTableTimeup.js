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

export default function QuestionTableTimeup(props){
  const theme = useTheme();

  const handleStartSurvey = () => {
    props.startSurvey()
  }
  return(
    <>
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{backgroundColor:theme.palette.background.default, pl:1, pt:0}}>
          <Typography variant="body2" sx={{mx:'auto', textAlign: 'center'}}>Waktu habis</Typography>
      </Card> 
    </Grid>
    </>
  )

}