import {useState} from "react";
import axios from "axios";
import { Typography, Grid, Card, CardHeader, CardContent, LinearProgress, Box, Tooltip} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";

// --------------------------------------------------------
const infoRows = [
  {col1:<Label color="success">Open</Label>, col2: ':', col3:'12/10/2023'},
  {col1:<Label color="error">Close</Label>, col2: ':', col3:'12/10/2023'},
  {col1:"Sisa Waktu", col2: ':', col3:'2 Day 5 Hour'},
  {col1:"Section Progress", col2: ':', col3:<LinearProgressWithLabel value={60} tooltip='(5/10) input bagian ini diselesaikan'/>},
  {col1:"Overall Progress", col2: ':', col3:<LinearProgressWithLabel value={30} tooltip='(5/10) input seluruh bagian diselesaikan' />},
];

function LinearProgressWithLabel(props) {
  return (
    <Tooltip title={props.tooltip}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {`${Math.round(props.value,)}%`}
          </Typography>
        </Box>
    </Box>
    </Tooltip>
  );
};


// --------------------------------------------------------

export default function WorksheetInfo(){

  return(
    <Card>
      <CardHeader title={"Worksheet Info"}  subheader="Metadata kertas kerja" />
        <CardContent sx={{fontSize:14}}>
          <Grid container spacing={2}>
          {infoRows.map((row, index) => {
            return(
              <Grid item container spacing={2} key={index}>
                <Grid item sm={4}>
                  {row.col1}
                </Grid>

                <Grid item sm={2}>
                  {row.col2}
                </Grid>

                <Grid item sm={6}>
                  {row.col3}
                </Grid>
              </Grid>
              )
            })
          }         
          </Grid>
          </CardContent>
    </Card>
  )
};