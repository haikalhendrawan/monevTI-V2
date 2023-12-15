import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import { Card, Table, Stack, Paper, Avatar, Button, MenuItem,  
    Typography, Modal, Box, InputLabel, FormControl, Select, TextField,
    FormHelperText, InputAdornment, Snackbar, Alert } from '@mui/material';
import {useTheme} from "@mui/material/styles";
// hooks
import useAxiosJWT from '../../../../hooks/useAxiosJWT';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height:'20%',
    width: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:'12px',
};

const paperStyle ={
    height:'auto', 
    width:'auto', 
    justifyContent:'space-between'
}

export default function ConfirmModal(props){

    return(
        <Modal open={props.modalOpen} onClose={props.modalClose}>
        <Box sx={boxStyle}>
          <Paper sx={{height:'auto', width:'auto', justifyContent:'space-between'}}>
            <Stack direction='column'>
                <Typography variant='h6'>{props.text}</Typography>

                <Stack direction ='row' spacing={2} sx={{justifyContent:'center', mt:3, mb:1}}>
                    <Button size="medium" variant="contained" onClick={props.onSubmit} color='success' endIcon={ <Iconify icon="material-symbols:send" />}>
                    Send
                    </Button>
                    <Button size="medium" variant="contained"  color='error' onClick={props.modalClose}>
                    Cancel
                    </Button>
                </Stack>
            </Stack>


          </Paper>
        </Box>
      </Modal>
    )
};

