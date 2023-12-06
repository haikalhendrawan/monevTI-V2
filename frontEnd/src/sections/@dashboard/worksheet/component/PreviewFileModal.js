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
import IAssetReportPDF from '../../../PDF/IAssetReportPDF/IAssetReportPDF';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';

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


//---------------------------------------------------------------
export default function PreviewFileModal(props) {

  return(
  <Modal open={props.modalOpen} onClose={props. modalClose}>
    <Box sx={style}>
        ABC
    </Box>
  </Modal>
  )
}