import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
// @mui
import {useTheme} from "@mui/material/styles"
import {Stack, Button, Container, Typography, IconButton, Tabs, Tab, Modal, Box, FormControl, TextField, FormHelperText, 
  InputAdornment, Paper, InputLabel, Select, MenuItem, Snackbar, Alert, FormControlLabel, Checkbox, filledInputClasses} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// hooks
import { useAuth } from '../../../hooks/useAuth';
import useAxiosJWT from '../../../hooks/useAxiosJWT';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from "../../../components/scrollbar";


// --------------------------------------------------------------------------------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height:'550px',
    width: '1000px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:'12px',
  };

const selectStatus = [
    {jenis:'Not Done', value:0, color:'error'},
    {jenis:'Done', value:1, color:'success'},
  ];

const DEFAULT_VALUE = {
  id: '',
  date:dayjs(new Date), 
  name:'',
  hostname:'',
  event:'',
  clearance:'',
  status:0,
  isUnique:true,
};

// ---------------------------------------------------------------------------------
export default function LogBookAddModal(props) {

  const theme = useTheme();

  const {auth, setAuth} = useAuth(); 

  const axiosJWT = useAxiosJWT();

  const [value, setValue] = useState({...DEFAULT_VALUE});

  const [snackbar, setSnackbar] = useState({
    open:false,
    color:null,
    text:'No value'
  });

  const [isError, setIsError] = useState({
    name:false,
    hostname:false,
    event:false,
  });

  const [isCallingAPI, setIsCallingAPI] = useState(false); // cek apakah sedang query ke database utk mencegah double click add/edit button

  const handleChange = (event) => {  // setiap form tambah asset berubah
      setValue((prev) => ({
          ...prev,
          [event.target.name]:event.target.value
      })
      )
  };

  const handleCheck = () => {
    setValue((prev) => ({
      ...prev,
      isUnique:!prev.isUnique

    }))
  }

  const checkInput = async () => {
    let invalid = false;
    const input = ['name', 'hostname', 'event'];

    input.forEach((item)=> { // nge-validate apabila input belum diisi (kurang dari 1 char)
      if(value[item].length<1){
        setIsError((prev) => ({...prev, [item]:true}));
        invalid = true;
      }else{
        setIsError((prev) => ({...prev, [item]:false}));
      }
    });

    return !invalid // return true jika all valid, return false jika ada yg invalid
  };

  const handleAddUser = async () => {
    const isValid = await checkInput();
    setIsCallingAPI(true);
    if(!isValid){setIsCallingAPI(false); return}
    try{
      const data = {
        date:`${dayjs(value.date).format('YYYY/MM/DD')} 00:00:00`, 
        name:value.name,
        hostname:value.hostname,
        event:value.event,
        clearance:value.clearance,
        status:value.status,
        isUnique:value.isUnique,
      }
      const response = await axiosJWT.post("/addLogBook", {...data})
      setSnackbar({
        open:true,
        color:response.data.msg?"success":"error",
        text:response?.data?.msg?response.data.msg:response.data.errMsg
      });
      props.onClose();
      setIsCallingAPI(false);
      props.getData();
      setValue({...DEFAULT_VALUE});
      setIsError({name:false, hostname:false, event:false,});
    }catch(err){
      console.log(err);
      setSnackbar({
        open:true,
        color:"error",
        text:`Fail to insert Data (${err.response.data.errMsg?err.response.data.errMsg:err.response.data})`
      });
      setIsCallingAPI(false);
    }finally{
      setIsCallingAPI(false);
    }
  };

  const handleSnackbarClose = () =>{
      setSnackbar({
        ...snackbar,
        open:false
      })
  }

  const handleClear = () => { // onclick tombol clear form data
    setValue({...DEFAULT_VALUE});
    setIsError({name:false, hostname:false, event:false,});
  };

  return(
      <>
      <Modal open={props.open} onClose={props.onClose}>
          <Box sx={style}>
            <Scrollbar>
            <Paper sx={{height:'500px', width:'auto', justifyContent:'center'}}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Add History Masalah TIK
                </Typography>

                <Stack direction='row' justifyContent={'space-around'}>
                  <Stack direction='column' spacing={3} sx={{width:'40%'}}>
                    <FormControl>
                        <TextField name="name" error={isError.name} size='small' label="Nama Pegawai"  required onChange={handleChange} value={value.name} sx={{width:'80%'}}/>
                    </FormControl>
                    <FormControl>
                        <TextField name="hostname" error={isError.hostname} size='small' label="Hostname"  required onChange={handleChange} value={value.hostname} sx={{width:'80%'}}/>
                    </FormControl>
                    <FormControl>
                        <TextField name="event" size='small' error={isError.event} label="Masalah" required onChange={handleChange} value={value.event} multiline minRows={7} maxRows={7}/>
                    </FormControl>
                    <FormControlLabel control={<Checkbox id='isUnique' value={value.isUnique} checked={value.isUnique} onChange={handleCheck} />} label="Unique Case ?" />
                  </Stack>

                  <Stack direction='column' spacing={3} sx={{width:'40%'}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                      <DatePicker 
                        sx={{width:'80%'}} 
                        size='small'
                        name="date"
                        value={value.date} 
                        onChange={(newValue) => setValue((prev) => ({...prev, date:newValue}))}
                        label={'Tanggal'}
                        slotProps={{ textField: { size: 'small', required: true } }}
                      />
                      </LocalizationProvider>
                      <FormControl sx={{  minWidth: 120 }} size="small" required>
                        <InputLabel id="status" sx={{typography:'body2'}}>Status</InputLabel>
                          <Select required name="status" value={value.status} sx={{ width:'50%', typography:'body2'}} label="Aplikasi" onChange={handleChange} size='small'
                          >
                              {selectStatus.map((item, index) => {
                              return(<MenuItem key={index} sx={{typography:'body2', color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                              })}
                          </Select>
                      </FormControl>
                      <FormControl>
                        <TextField name="clearance" size='small' label="Penyelesaian" onChange={handleChange} value={value.clearance} multiline minRows={7} maxRows={7}/>
                      </FormControl>
                  </Stack>

                </Stack>

                <Stack direction='row' justifyContent="center" spacing={2} sx={{mt:2}}>
                  <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddUser} disabled={isCallingAPI}>
                      Add
                  </Button>
                  <Button 
                    variant="contained" 
                    sx={{backgroundColor:theme.palette.common.white, color:theme.palette.common.black}} 
                    startIcon={<Iconify icon="bx:reset" />} 
                    onClick={handleClear}
                    >
                      Clear
                  </Button>
                </Stack>
            </Paper>
            </Scrollbar>
          </Box>
      </Modal>

      {/*  snackbar untuk show notification di kanan atas  */}
      <Snackbar open={Boolean(snackbar.open)} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{vertical:'top', horizontal:'right'}} >
        <Alert 
          onClose={handleSnackbarClose} 
          variant="filled" 
          severity={snackbar.color?snackbar.color:'info'} 
          sx={{ width: '100%'}}
        >
          {snackbar?.text}
        </Alert>
      </Snackbar>
      
      </>
  
  )
}
