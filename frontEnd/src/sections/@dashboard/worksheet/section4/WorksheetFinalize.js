import {useState} from "react";
import axios from "axios";
import { Typography, Grid, Card, CardHeader, CardContent, LinearProgress, Box, Tooltip, Stack, Button} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import ConfirmModal from "../component/ConfirmModal";

// --------------------------------------------------------


export default function WorksheetFinalize(props){
  const theme = useTheme();
  const {checklist, batch, editBatch, getBatch, getChecklist} = props;

  const [open, setOpen] = useState(false);

  const isDone = batch?.rows? batch.rows[0].isDone : false;
  const id = batch?.rows? batch.rows[0].junction_id : null;
  const result = batch?.rows? batch.rows[0].result : null;
  const isStartSurvey = batch?.rows? batch.rows[0].isStartSurvey : false;
  const surveyStart = batch?.rows? batch.rows[0].surveyStart : false;
  const surveyEnd = batch?.rows? batch.rows[0].surveyEnd : false;
  const startUnix = Date.parse(surveyStart);
  const endUnix = Date.parse(surveyEnd);
  

  const handleClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };


  const openPeriod = batch?.rows? new Date(batch.rows[0].open_period) : null;
  const closePeriod = batch?.rows? new Date(batch.rows[0].close_period) : null;
  const remainingMilisecond = closePeriod - openPeriod;
  const days = Math.floor(remainingMilisecond / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remainingMilisecond % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  const notDone = checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response === null
  }).length:null;
  const done = checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response !== null
  }).length:null;

  const notDoneSection = (section) => {return checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response === null && row.ws_section ===section
  }).length:null;}

  const doneSection = (section) => {return checklist?.rows? checklist.rows.filter((row) => {
    return row.kppn_response !== null && row.ws_section ===section
  }).length:null;}

  const notDoneSection1 = notDoneSection(1);
  const doneSection1 = doneSection(1);
  const notDoneSection2 = notDoneSection(2);
  const doneSection2 = doneSection(2);
  const notDoneSection3 = notDoneSection(3);
  const doneSection3 = doneSection(3);

  const isDoneSection1 = (doneSection1/(notDoneSection1+doneSection1)*100)===100;
  const isDoneSection2 = (doneSection2/(notDoneSection2+doneSection2)*100)===100;
  const isDoneSection3 = (doneSection3/(notDoneSection3+doneSection3)*100)===100;
  const percentComplete = (done/(notDone+done)*100);

  const infoRows = [
    {col1:"Sisa Waktu", col2: ':', col3:`${days} Days ${hours} Hours`},
    {col1:"Bagian 1", col2: ':', col3:<Label color={isDoneSection1?"success":"error"}>{isDoneSection1?"Sudah":"Belum"}</Label>},
    {col1:"Bagian 2", col2: ':', col3:<Label color={isDoneSection2?"success":"error"}>{isDoneSection1?"Sudah":"Belum"}</Label>},
    {col1:"Bagian 3", col2: ':', col3:<Label color={isDoneSection3?"success":"error"}>{isDoneSection1?"Sudah":"Belum"}</Label>},
    {col1:"Overall Progress", col2: ':', col3:<LinearProgressWithLabel value={percentComplete} tooltip={`(${done}/${done+notDone}) dari seluruh input diselesaikan`}/>},
  ];
  
  const handleSubmit = async() => {
    if(isDoneSection1===true && isDoneSection2===true && isDoneSection3===true){
      // console.log(id, result, isDone, isStartSurvey, surveyStart, surveyEnd);
      console.log(id, result, 1, isStartSurvey, startUnix, endUnix);
      await editBatch(id, result, 1, isStartSurvey, startUnix, endUnix);
      getBatch();
      setOpen(false);
    }else{
      console.log("Worksheet belum selesai");

    }
  };



  return(
    <>
    <Card>
      <CardHeader title={"Submit Worksheet"}  subheader="Selesai & cetak berkas" sx={{textAlign:'center'}}/>
        <CardContent sx={{fontSize:14}}>
          <Grid container spacing={2}>
          {infoRows.map((row, index) => {
            return(
              <Grid item container spacing={2} key={index}>
                <Grid item sm={4}>
                  {row.col1}
                </Grid>

                <Grid item sm={1}>
                  {row.col2}
                </Grid>

                <Grid item sm={7}>
                  {row.col3}
                </Grid>
              </Grid>
              )
            })
          } 
            <Grid container spacing={2} sx={{mt:7, justifyContent:'end'}}>
              {isDone?
                <>
                <Button size="large" variant="outlined" sx={localStorage.getItem('mode')==='dark'?{color:'#fff', mr:2}:{mr:2}} endIcon={ <Iconify icon="vscode-icons:file-type-pdf2"/>}>
                    Generate Report 
                </Button>
                <Button size="large" variant="outlined" sx={localStorage.getItem('mode')==='dark'?{color:'#fff'}:null} endIcon={ <Iconify icon="vscode-icons:file-type-pdf2"/>}>
                    Generate BA
                </Button>
                </>:
                <Button size="medium" variant="contained" endIcon={ <Iconify icon="material-symbols:send" />} onClick={handleClick}>
                    Send
                </Button>
              }

            </Grid>      
          </Grid>
        </CardContent>
    </Card>

    <ConfirmModal modalOpen={open} modalClose={handleModalClose} onSubmit={handleSubmit} text={'Kirim berkas dan selesaikan?'} />
    </>
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
