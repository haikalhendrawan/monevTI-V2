import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import { Card, Table, Stack, Paper, Avatar, Button, MenuItem,  
    Typography, Modal, Box, InputLabel, FormControl, Select, TextField,
    FormHelperText, InputAdornment, Snackbar, Alert } from '@mui/material';
import {useTheme} from "@mui/material/styles";
// hooks
import useAxiosJWT from '../../../hooks/useAxiosJWT';
// content
import IAssetReportPDF from '../../PDF/IAssetReportPDF/IAssetReportPDF';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import PDFViewer from '../../../components/pdfViewer/PDFViewer';


// ------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '5%',
  left: '20%',
  height:'90%',
  width: '60%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'12px',
};

const generateRandomString = () => {
  return Math.random().toString(36).substring(7);
};

//---------------------------------------------------------------
export default function PreviewFileModal(props) {
  const selectFile={
    1:props.file1,
    2:props.file2,
  };
  const selectFileURL={
    1:`${process.env.REACT_APP_API_BASE_URL}/dokumen`,
    2:`${process.env.REACT_APP_API_BASE_URL}/dokumen`,
  };

  const currentFile = props?.filenum===1?props.file1:props.file2;
  const currentFileURL = `${process.env.REACT_APP_API_BASE_URL}/dokumen`;
  const fileExt = currentFile?.split('.').pop().toLowerCase();
  const [render, setRender] = useState('No files');

  const handleDownload = () => {
    console.log('download');
    window.location.href=`${currentFileURL}/${currentFile}`;
  }


  useEffect(() => {
    if(fileExt==='jpg' || fileExt==='jpeg' || fileExt==='png'){
      setRender(
        <img alt="file name doesn't correspond with database" src={`${currentFileURL}/${currentFile}`} style={{width:'100%', height:'100%'}}/>
      )
      console.log('jpg')
    }else if(fileExt==='pdf'){
      setRender(
        <embed src={`${currentFileURL}/${currentFile}`} width="100%" height="100%" />
      )
      console.log('pdf')
    }else if(fileExt==='zip' || fileExt==='rar' ){
      setRender(
        <Button variant="contained" target='blank' onClick={handleDownload} sx={{position:'absolute', left:'45%', top:'50%'}}>
          Download File
        </Button>
      )
    }else{
      setRender('Unknown file type')
    }
  },[currentFile]);

  return(
  <Modal open={props.modalOpen} onClose={props. modalClose}>
    <Box sx={style}>
      {render}
    </Box>
  </Modal>
  )
}