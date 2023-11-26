import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from "axios";
// @mui
import {useTheme} from "@mui/material/styles"
import {Stack, Button, Container, Typography, IconButton, Tabs, Tab, Modal, Box, FormControl, TextField, FormHelperText, 
  InputAdornment, Paper, InputLabel, Select, MenuItem, Snackbar, Alert} from '@mui/material';
// hooks
import { useAuth } from '../../../hooks/useAuth';
import useAxiosJWT from '../../../hooks/useAxiosJWT';
import useIUser from './useIUser';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from "../../../components/scrollbar";
// sub section
import UserTikTable2 from './iUserTable/UserTikTable';

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

const SELECTAPP = [
  {jenis:'SPAN', value:0, icon:"solar:monitor-smartphone-bold-duotone" },
  {jenis:'SAKTI', value:1, icon:"solar:laptop-bold-duotone"},
  {jenis:'Gaji', value:2, icon:"solar:printer-bold-duotone"}, 
  {jenis:'Lainnya', value:3, icon:"solar:electric-refueling-bold-duotone"},
  ];

const SELECTPELATIHAN = [
    {jenis:'Pernah', value:0, color:'success'},
    {jenis:'Belum', value:1, color:'error'},
  ];

const DEFAULT_VALUE = {
  id: '', 
  name:'',
  username:'',
  role:'',
  email:'',
  pelatihan:0,
  catatan:'',
  app:0
};

// ---------------------------------------------------------------------------------
const UserTikSection = (props) => {
  const {IUSER, setIUSER, getIUser} = useIUser();

  const theme = useTheme();

  const {auth, setAuth} = useAuth(); 

  const axiosJWT = useAxiosJWT();

  const [open, setOpen] = useState(false); // open dan close add perangkat modal

  const [value, setValue] = useState({...DEFAULT_VALUE});

  const [tabValue, setTabValue] = useState(0); // ganti menu jenis aplikasi yang ditampilkan

  const [snackbar, setSnackbar] = useState({
    open:false,
    color:null,
    text:'No value'
  });

  const [isError, setIsError] = useState({
    name:false,
    username:false,
    role:false
  });

  const handleChange = (event) => {  // setiap form tambah asset berubah
      setValue((prev) => ({
          ...prev,
          [event.target.name]:event.target.value
      })
      )
  };

  const handleTabChange = (event, newValue) => { // setiap tab jenis asset berubah
    setTabValue(newValue);
  };

  const handleClick = async () => { // onclick tombol tambah perangkat
      setOpen(true);
  };

  const checkInput = async () => {
    let invalid = false;
    const input = ['name', 'username', 'role'];

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
    if(!isValid){return}

    try{
      const response = await axiosJWT.post('/addIUser', {
        name:value.name,
        username:value.username,
        role:value.role,
        email:value.email,
        pelatihan:value.pelatihan,
        catatan:value.catatan,
        app:value.app
      });
      getIUser();
      setSnackbar({
        open:true,
        color:response.data.msg?"success":"error",
        text:response?.data?.msg?response.data.msg:response.data.errMsg
      });
      setOpen(false);
      setValue({...DEFAULT_VALUE, app:value.app})
    }catch(err){
      console.log(err);
      setSnackbar({
        open:true,
        color:"error",
        text:`Fail to insert Data (${err.response.data.errMsg?err.response.data.errMsg:err.response.data})`
      });
    }
  };

  const handleClose = () => { // onclick area di luar modal, menutup modal
      setOpen(false);
  };

  const handleSnackbarClose = () =>{
      setSnackbar({
        ...snackbar,
        open:false
      })
  }

  const handleClear = () => { // onclick tombol clear form data
    setValue((prev) => ({...DEFAULT_VALUE, jenis_perangkat:prev.jenis_perangkat}));
    setIsError({hostname:false, model:false, tahun:false});
  };

  return(
      <>
        <Container maxWidth="xl">
  
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Stack direction='row' spacing={2}>
              <IconButton variant='contained' onClick={() => {props.changeSection(1)}}>
                <Iconify icon={"eva:arrow-ios-back-outline"} />
              </IconButton> 
              <Typography variant="h4" gutterBottom>
                Data Pengguna Aplikasi
              </Typography>
            </Stack>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClick}>
              Add
            </Button>
  
          </Stack>
  
          <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="icon tabs example">
              <Tab icon={<Iconify icon="solar:monitor-smartphone-bold-duotone" />} label="SPAN" value={0} />
              <Tab icon={<Iconify icon="solar:laptop-bold-duotone" />} label="SAKTI" value={1}/>
              <Tab icon={<Iconify icon="solar:printer-bold-duotone" />} label="Lainnya" value={2}/>
              <Tab icon={<Iconify icon="solar:scanner-bold-duotone" />} label="Scanner" value={3}/>
            </Tabs>
          </Stack>

          {/* assetTik Table here */}
          <UserTikTable2 currentTab={tabValue}/>
        
        </Container>

      {/* --------------------------- --------MODAL UNTUK INPUT USER APLIKASI BARU------------------------------------------------- */}
      
      <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Scrollbar>
            <Paper sx={{height:'500px', width:'auto', justifyContent:'center'}}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Tambah Data User
                </Typography>

                <Stack direction='row' justifyContent={'space-around'}>

                  <Stack direction='column' spacing={3} sx={{width:'40%'}}>

                  <FormControl sx={{  minWidth: 120 }} size="small" required>
                        <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Aplikasi</InputLabel>
                        <Select 
                        required
                        name="app"
                        value={value.app} 
                        sx={{ width:'80%', typography:'body2'}} 
                        label="Aplikasi" 
                        onChange={handleChange}
                        size='small'
                        >
                            {SELECTAPP.map((item, index) => {
                            return(<MenuItem key={index} sx={{typography:'body2'}} value={item.value}>{item.jenis} <Iconify icon={item.icon} sx={{ml:1}}/></MenuItem>)
                            })}
                        </Select>
                  </FormControl>

                  <FormControl>
                      <TextField name="name" error={isError.name} size='small' label="Nama Pegawai"  required onChange={handleChange} value={value.name} sx={{width:'80%'}}/>
                  </FormControl>

                  <FormControl>
                      <TextField name="username" error={isError.username} size='small' label="Username" onChange={handleChange} value={value.username} required sx={{width:'80%'}}/>
                      <FormHelperText>User login sesuai aplikasi</FormHelperText>
                  </FormControl>

                  <FormControl size="small">
                      <TextField name="role" error={isError.role} required size='small' label="Role" onChange={handleChange} value={value.role} sx={{width:'80%'}}/>
                      <FormHelperText>Role sesuai aplikasi</FormHelperText>
                  </FormControl>

                  <FormControl size="small">
                      <TextField name="email" size='small' label="Email" onChange={handleChange} value={value.email} sx={{width:'80%'}}/>
                  </FormControl>

                  </Stack>

                  <Stack direction='column' spacing={3} sx={{width:'40%'}}>

                    <FormControl sx={{  minWidth: 120 }} size="small" required>
                        <InputLabel id="label-select-pelatihan" sx={{typography:'body2'}}>Pelatihan</InputLabel>
                        <Select
                        name="pelatihan"
                        required
                        labelId="label-select-pelatihan" 
                        id="select-pelatihan" 
                        value={value.pelatihan} 
                        sx={{ width:'40%', typography:'body2'}} 
                        label="Pelatihan" 
                        onChange={handleChange}
                        size='small'
                        >
                            {SELECTPELATIHAN.map((item, index) => {
                            return(<MenuItem key={index} sx={{typography:'body2', color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                            })}
                        </Select>
                        <FormHelperText>Formal maupun non-formal</FormHelperText>
                    </FormControl>

                    <FormControl >
                        <TextField name="catatan" size='small' label="Catatan (opsional)" onChange={handleChange} value={value.catatan} multiline minRows={4} maxRows={4}/>
                        <FormHelperText>"aplikasi xx, pelatihan sudah lama, dll"</FormHelperText>
                    </FormControl>
                    
                    <Stack direction='row' justifyContent="center" spacing={2}>
                      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddUser}>
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

                  </Stack>

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

export default UserTikSection;