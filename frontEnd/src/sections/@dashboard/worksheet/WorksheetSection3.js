import React from 'react';
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

export default function WorksheetSection3(){
  const theme = useTheme();
  return(
    <>
    <QuestionTitle />
    {/* <QuestionTableHeader />
    <WorksheetQuestion name={`ABC`} nik={`ABC`} username={`ABC`} user_id={`ABC`} header={'ABC'}/> */}
    <QuestionTableFooter />

    </>
  )
  
}
