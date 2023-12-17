import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Grid, Tabs, Tab, Box, Card, CardHeader,
           LinearProgress, LinearProgressProps, Tooltip} from '@mui/material';
// component
import Iconify from "../../../components/iconify";
import WorksheetSection1 from './WorksheetSection1';
import WorksheetSection2 from './WorksheetSection2';
import WorksheetSection3 from './WorksheetSection3';
import WorksheetSection4 from './WorksheetSection4';
import WorksheetInfo from './component/WorksheetInfo';
// hooks
import { useAuth } from '../../../hooks/useAuth';
import useAxiosJWT from '../../../hooks/useAxiosJWT';
import useWorksheet from "./useWorksheet";

export default function WorksheetLanding(props) {
  
  const {checklist, batch, getChecklist, getBatch, editBatch, editChecklist , deleteDataDukung} = useWorksheet();

  const notDone = checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response === null
  }).length:null;
  const done = checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response !== null
  }).length:null;
  const percentComplete = (done/(notDone+done)*100);

  const selection = {
    0:<WorksheetSection1 batch={batch} checklist={checklist} getBatch={getBatch} getChecklist={getChecklist} editBatch={editBatch} editChecklist={editChecklist}  deleteDataDukung={deleteDataDukung} />,
    1:<WorksheetSection2 batch={batch} checklist={checklist} getBatch={getBatch} getChecklist={getChecklist} editBatch={editBatch} editChecklist={editChecklist} deleteDataDukung={deleteDataDukung} />,
    2:<WorksheetSection3 batch={batch} checklist={checklist} getBatch={getBatch} getChecklist={getChecklist} editBatch={editBatch} editChecklist={editChecklist} deleteDataDukung={deleteDataDukung} />,
    3:<WorksheetSection4 batch={batch} checklist={checklist} getBatch={getBatch} getChecklist={getChecklist} editBatch={editBatch} editChecklist={editChecklist} deleteDataDukung={deleteDataDukung} />,
    };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center " mb={6}>
        <Box sx={{ width: '50%' }}>
        <LinearProgressWithLabel value={percentComplete} tooltip={`(${done}/${done+notDone}) dari seluruh input diselesaikan`}/>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        {props.tabValue!==3
        ?(<>
          <Grid item container sm={8} spacing={2}>
            {selection[props.tabValue]}
          </Grid>

          <Grid item sm={4}>
            <WorksheetInfo batch={batch} checklist={checklist} tabValue={props.tabValue} />
          </Grid>
          </>)
        :null
        }

        {props.tabValue===3
        ? <Grid item sm={8} sx={{mx:'auto'}}>
            {selection[3]}
          </Grid>
        :null
        }
    </Grid>
    </>
  )
}

// -----custom component
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