import React, {useState, useEffect} from 'react';
import { Container, Stack, Typography, Grid, Card,
  FormControl, TextField, Button, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import WorksheetCard from '../component/WorksheetCard';
import WorksheetQuestion from './WorksheetQuestion';

const timePlus20 = new Date().getTime() + (1*1000*60*20);


export default function QuestionTitle(){
  const theme = useTheme();

  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const [distance, setDistance] = useState(timePlus20-currentTime);

  const time = `${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))}m : ${Math.floor((distance % (1000 * 60)) / 1000)}s`

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
  
    return () => {
      clearInterval(intervalId); 
    };
  }, []); 
  
  useEffect(() => {
    setDistance(timePlus20 - currentTime);
  }, [currentTime]);
    

  return(
    <>
      <Grid item xs={12} sm={12} md={12}>
        <Card sx={{backgroundColor:theme.palette.background.default, pl:1, height:80, pt:0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h5' sx={{position:'absolute'}}>Kuesioner PIC TIK</Typography>
          <Button variant="outlined" color='primary' sx={{borderRadius:'12px', height:'50px', ml:40}}>
            {time}
          </Button>
        </Card> 
      </Grid>
    </>
  )

}