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
              <Typography variant="body2" sx={{mr:1}}>Bagian ini berisikan sejumlah 14 pertanyaan seputar kondisi pengelolaan TIK di KPPN;</Typography>
              <Typography variant="body2" sx={{mr:1}}>Pengisian kuesioner dibatasi dengan time limit sejumlah 20 menit;</Typography>
              <Typography variant="body2" sx={{mr:1}}>Waktu akan terus berjalan, apabila terdapat close/pergantian tab maupun koneksi terputus;</Typography>
              <Typography variant="body2" sx={{mr:1}}>Disarankan bagi bapak/ibu untuk dapat menyelesaikan bagian 1 dan bagian 2 terlebih dahulu;</Typography>
              <Typography variant="body2" sx={{mr:1, mt:2}}>Klik tombol mulai dibawah, untuk memulai kuesioner.</Typography>
              <Button variant='contained' sx={{mt:2, mb:2}}>Mulai</Button>
              {/* <Button variant='contained'>Send</Button> */}
          </Grid>
        </Grid>
      </Card> 
    </Grid>
    </>
  )

}