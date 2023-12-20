import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
// @mui
import { Card, Table, Stack, Paper, Avatar, Button, MenuItem,  
    Typography, Modal, Box, InputLabel, FormControl, Select, TextField,
    FormHelperText, InputAdornment, Snackbar, Alert } from '@mui/material';
import {useTheme} from "@mui/material/styles";
// hooks
import useAxiosJWT from '../../../../hooks/useAxiosJWT';
// content
import WorksheetBAPDF from '../../../PDF/WorksheetReportPDF/WorksheetBAPDF';
import WorksheetReportPDF from '../../../PDF/WorksheetReportPDF/WorksheetReportPDF';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';

// ------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '5%',
  left: '5%',

  height:'90%',
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'12px',
};



//---------------------------------------------------------------
export default function PreviewPDFModalWS(props) {

    const isBA = props.isBA;

  return(
  <Modal open={props.modalOpen} onClose={props.modalClose}>
  <Box sx={style}>
    {isBA?
    <PDFViewer width={'100%'} height={'100%'}>
      <WorksheetBAPDF auth={props.auth} asset={props.asset} user={props.user} />
    </PDFViewer>
    :
    <PDFViewer width={'100%'} height={'100%'}>
        <WorksheetBAPDF auth={props.auth} asset={props.asset} user={props.user} />
     </PDFViewer>}
  </Box>
</Modal>
  )
}