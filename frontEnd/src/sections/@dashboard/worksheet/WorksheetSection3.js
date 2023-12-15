import React, {useState} from 'react';
import { Container, Stack, Typography, 
  FormControl, TextField, Button, Divider, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../components/iconify";
import Label from "../../../components/label";
import WorksheetCard from './component/WorksheetCard';
import WorksheetQuestion from './section3/WorksheetQuestion';
import QuestionTitle from './section3/QuestionTitle';
import QuestionTableHeader from './section3/QuestionTableHeader';
import QuestionTableFooter from './section3/QuestionTableFooter';
import QuestionTableTimeup from './section3/QuestionTableTimeup';
import PreviewFileModal from './component/PreviewFileModal';

// ---------------------------------------------------

const cardd = [...Array(4).map((item, index) => {
  return(index)
})];


// -------------------------------------------------

export default function WorksheetSection3(props){
  const theme = useTheme();
  const currentTime = new Date().getTime();
  const {batch, checklist, getBatch, getChecklist, editBatch, editChecklist} = props;
  const isStartSurvey = batch?.rows?batch.rows[0].isStartSurvey:null;
  const endTime = batch?.rows?Date.parse(batch.rows[0].surveyEnd):null;
  const isTimeUp = endTime===null?false:currentTime-endTime>0;
  console.log(currentTime)

  const [value, setValue] = useState({
    ...batch.rows[0]
  })

  const startSurvey = async() => {
    // editBatch = async(id, result, isDone, isStartSurvey, surveyStart, surveyEnd);
    const start =new Date().getTime();
    const end = start + (20*60*1000);
    await editBatch(value.junction_id, value.result, value.isDone, 1, start, end);
    await getBatch();
  }

  return(
    <>
    <QuestionTitle endTime={endTime} getBatch={getBatch}/>
    {isTimeUp?
    <>
    <QuestionTableTimeup />
    </>
    :isStartSurvey?
    <>
      <QuestionTableHeader />
      <WorksheetQuestion batch={batch} checklist={checklist} getBatch={getBatch} getChecklist={getChecklist} editBatch={editBatch} editChecklist={editChecklist}/>
    </>
    :<QuestionTableFooter startSurvey={startSurvey} />
    }
   
    

    </>
  )
  
}
