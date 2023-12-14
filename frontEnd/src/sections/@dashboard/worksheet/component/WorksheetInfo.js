import {useState} from "react";
import axios from "axios";
import { Typography, Grid, Card, CardHeader, CardContent, LinearProgress, Box, Tooltip} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import useWorksheet from "../useWorksheet";

// --------------------------------------------------------

export default function WorksheetInfo(props){

  const {batch, checklist, tabValue} = props;
  
  const openPeriod = batch?.rows? new Date(batch.rows[0].open_period) : null;
  const closePeriod = batch?.rows? new Date(batch.rows[0].close_period) : null;
  const remainingMilisecond = closePeriod - openPeriod;
  const days = Math.floor(remainingMilisecond / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remainingMilisecond % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  const notDone = checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response !== 1 
  }).length:null;
  const done = checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response === 1
  }).length:null;
  const notDoneSection = checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response !== 1  && row.ws_section ===tabValue+1
  }).length:null;
  const doneSection = checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response === 1 && row.ws_section ===tabValue+1
  }).length:null;
  const percentComplete = (done/(notDone+done)*100);
  const percentCompleteSection = (doneSection/(notDoneSection+doneSection)*100);


  const infoRows = [
    {col1:<Label color="success">Open</Label>, col2:':', col3: openPeriod?.toLocaleDateString('en-GB')},
    {col1:<Label color="error">Close</Label>, col2:':', col3: closePeriod?.toLocaleDateString('en-GB')},
    {col1:"Sisa Waktu", col2: ':', col3:`${days} Days ${hours} Hours`},
    {col1:"Section Progress", col2: ':', col3:<LinearProgressWithLabel value={percentCompleteSection} tooltip={`(${doneSection}/${doneSection+notDoneSection}) input bagian ini diselesaikan`}/>},
    {col1:"Overall Progress", col2: ':', col3:<LinearProgressWithLabel value={percentComplete} tooltip={`(${done}/${done+notDone}) dari seluruh input diselesaikan`}/>},
  ];


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



// --------------------------------------------------------
function LinearProgressWithLabel(props) {
  return (
    <Tooltip title={props.tooltip}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 40 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {`${Math.round(props.value,)}%`}
          </Typography>
        </Box>
    </Box>
    </Tooltip>
  );
};

