import React, {useState, useEffect} from 'react';
import { Container, Stack, Typography, Grid, Card,
  FormControl, TextField, Button, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import WorksheetCard from '../component/WorksheetCard';
import WorksheetQuestion from './WorksheetQuestion';

const timePlus20 = new Date().getTime() + (1*1000*60*20);


export default function QuestionTitle(props){
  const theme = useTheme();

  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const [distance, setDistance] = useState(props.endTime-currentTime);

  const [timeText, setTimeText] = useState('');

  let intervalId;

  // const time = `${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))}m : ${Math.floor((distance % (1000 * 60)) / 1000)}s`

  useEffect(() => {
    intervalId = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
  
    return () => {
      clearInterval(intervalId); 
    };
  }, []); 
  
  useEffect(() => {
    setDistance(props.endTime - currentTime);
    if (distance <= 0) {
      setTimeText('00:00');
      clearInterval(intervalId);
      props.getBatch();
    } else {
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeText(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }
  }, [currentTime, distance, props.endTime]);
    

  return(
    <>
      <Grid item xs={12} sm={12} md={12}>
        <Card sx={{backgroundColor:theme.palette.background.default, pl:1, height:80, pt:0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h5' sx={{position:'absolute'}}>Kuesioner PIC TIK</Typography>
          <Button variant="outlined" color='primary' sx={{borderRadius:'12px', height:'50px', ml:40}}>
            {timeText}
          </Button>
        </Card> 
      </Grid>
    </>
  )

}