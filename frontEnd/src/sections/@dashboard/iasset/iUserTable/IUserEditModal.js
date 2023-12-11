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
import useIUser from '../useIUser';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';

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

//----------------------

function IUserEditModal (props){
  const {IUSER, setIUSER, getIUser} = useIUser();

  const theme = useTheme();

  const [value, setValue] = useState({...DEFAULT_VALUE});

  const [isError, setIsError] = useState({
      name:false,
      username:false,
      role:false
  });

  const [isCallingAPI, setIsCallingAPI] = useState(false); // cek apakah sedang query ke database utk mencegah double click add/edit button
  
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
  
  const axiosJWT = useAxiosJWT();

  const [snackbar, setSnackbar] = useState({
      open:false,
      color:null,
      text:'No value'
  });

  const handleChange = (event) => {
      setValue((prev) => ({
      ...prev,
      [event.target.name]:event.target.value
      })
      )
  };

  const handleSnackbarClose = () =>{
      setSnackbar({
        ...snackbar,
        open:false
      })
  }

  const handleEditAsset = async () => {
    const isValid = await checkInput();
    setIsCallingAPI(true);

    if(!isValid){return};

    try{ 
      const response = await axiosJWT.post("/editIUser",{
        id:props.data.id,
        name:value.name,
        username:value.username,
        role:value.role,
        email:value.email,
        pelatihan:value.pelatihan,
        catatan:value.catatan,
        app:value.app
      });
      setSnackbar({
        open:true,
        color:response.data.msg?"success":"error",
        text:response?.data?.msg?response.data.msg:response.data.errMsg
      });
      props.modalClose();
      getIUser();
      setIsCallingAPI(false);
    }catch(err){
      console.log(err);
      setSnackbar({
        open:true,
        color:"error",
        text:`Fail to insert Data ()`
      });
      setIsCallingAPI(false);
    }
  }

  useEffect(() => {
      setValue({
          id: props.data.id, 
          app: props.data.app?props.data.app:0, 
          name: props.data.name, 
          username:props.data.username, 
          role:props.data.role, 
          email:props.data.email, 
          pelatihan: props.data.pelatihan?props.data.pelatihan:0, 
          catatan: props.data.catatan,
      })
  },[props.data]);

  const handleClose = () => {
      props.modalClose();
      setValue({ 
          id: props.data.id, 
          app: props.data.app?props.data.app:0, 
          name: props.data.name, 
          username:props.data.username, 
          role:props.data.role, 
          email:props.data.email, 
          pelatihan: props.data.pelatihan?props.data.pelatihan:0, 
          catatan: props.data.catatan,
      });
      setIsError({name:false, username:false, role:false});
  };

  // ----------------------------------------------------------------------------------------
  return(
      <>
      <Modal open={props.modalOpen} onClose={props.modalClose}>
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
                        return(<MenuItem key={index} sx={{typography:'body2'}} value={item.value}>{item.jenis}</MenuItem>)
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
                    <Button variant="contained" color="warning" startIcon={<Iconify icon="eva:edit-fill" />} onClick={handleEditAsset} disabled={isCallingAPI}>
                        Update
                    </Button>
                    <Button 
                    variant="contained" 
                    sx={{backgroundColor:theme.palette.common.white, color:theme.palette.common.black}} 
                    onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Stack>

              </Stack>

              </Stack>
          </Paper>
          </Scrollbar>
        </Box>
      </Modal>
      
      {/*  snackbar untuk show notification di kanan atas  */}
      <Snackbar open={Boolean(snackbar.open)} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{vertical:'top', horizontal:'right'}} >
          <Alert 
          onClose={handleSnackbarClose} 
          variant="filled" 
          severity={snackbar.color?snackbar.color:'info'} 
          sx={{ width: '100%' }}
          >
          {snackbar?.text}
          </Alert>
      </Snackbar>

      </>
  )
}

export default IUserEditModal;
 