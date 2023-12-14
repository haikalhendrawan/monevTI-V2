import React, {useState} from 'react';
import { Container, Stack, Typography, Grid, Card, CardHeader, IconButton, Tooltip,
  FormControl, TextField, Button, Divider, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../components/iconify";
import Label from "../../../components/label";
import WorksheetCard from './component/WorksheetCard';
import WorksheetQuestion from './section3/WorksheetQuestion';
import QuestionTitle from './section3/QuestionTitle';
import QuestionTableHeader from './section3/QuestionTableHeader';
import QuestionTableFooter from './section3/QuestionTableFooter';
import PreviewFileModal from './component/PreviewFileModal';

// ---------------------------------------------------

const cardd = [...Array(4).map((item, index) => {
  return(index)
})];


// -------------------------------------------------

export default function WorksheetSection3(props){
  const theme = useTheme();
  const {batch, checklist, getBatch, getChecklist, editBatch, editChecklist} = props;
  const isStartSurvey = batch?.rows?batch.rows[0].isStartSurvey:null;

  const [value, setValue] = useState({
    ...batch.rows[0]
  })

  console.log(value);

  const startSurvey = async() => {
    //  const editBatch = async(id, result, isDone, isStartSurvey)
    await editBatch(value.junction_id, value.result, value.isDone, 1);
    await getBatch();

  }

  return(
    <>
    <QuestionTitle />
    {isStartSurvey?
    <>
      <QuestionTableHeader />
      <WorksheetQuestion batch={batch} checklist={checklist} getBatch={getBatch} getChecklist={getChecklist} editBatch={editBatch} editChecklist={editChecklist}/>
    </>
    :<QuestionTableFooter startSurvey={startSurvey} />
    }
   
    

    </>
  )
  
}
