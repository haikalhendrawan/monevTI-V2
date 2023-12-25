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
import useAsset from './useAsset';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from "../../../components/scrollbar";
// sub section
import UserTikTable2 from './iAssetTable/AssetTikTable2';

// ---------------------------------------------------------------
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

const selectItem = [
{jenis:'Baik', value:0, color:'success'},
{jenis:'Rusak Ringan', value:1, color:'warning'},
{jenis:'Rusak Berat', value:2, color:'error'}, 
]

const SELECTPERANGKAT = [
  {jenis:'Komputer', value:0, icon:"solar:monitor-smartphone-bold-duotone" },
  {jenis:'Laptop', value:1, icon:"solar:laptop-bold-duotone"},
  {jenis:'Printer', value:2, icon:"solar:printer-bold-duotone"}, 
  {jenis:'Scanner', value:3, icon:"solar:scanner-bold-duotone"},
  {jenis:'UPS', value:4, icon:"solar:washing-machine-bold-duotone"},
  {jenis:'Genset', value:5, icon:"solar:electric-refueling-bold-duotone"},
  {jenis:'Router', value:6, icon:"solar:wi-fi-router-bold-duotone"},
  {jenis:'Switch', value:7, icon:"solar:structure-broken"},
  {jenis:'Tablet', value:8, icon:"solar:smartphone-2-bold-duotone"},
  ]

const SELECTCPU = [
  {jenis:'Intel Core i3', value:0 },
  {jenis:'Intel Core i5', value:1},
  {jenis:'Intel Core i7', value:2}, 
  {jenis:'Lainnya', value:3},
  ]

const DEFAULT_VALUE = {
  id: '', 
  jenis_perangkat: 0, 
  hostname:'', 
  nama_pegawai:'', 
  model:'', 
  tahun: '', 
  kondisi:0, 
  cpu: 0, 
  ip:'', 
  ram:'', 
  storage:'', 
  serial_number:'', 
  catatan:'', 
  last_update:'',
}

// -------------------------------------------------------------------------
const AssetTikSection = (props) => {
  const {ASSET, setASSET, getIAsset} = useAsset();

  const [open, setOpen] = useState(false); // open dan close add perangkat modal

  const [value, setValue] = useState({...DEFAULT_VALUE});

  const [isComputer, setIsComputer] = useState(true); // akan beda render table head 

  const [isComputerForm, setIsComputerForm] = useState(true);// akan beda render  form input

  const [isCallingAPI, setIsCallingAPI] = useState(false); // cek apakah sedang query ke database utk mencegah double click add/edit button

  const [tabValue, setTabValue] = useState(0); // ganti menu jenis perangkat yang ditampilkan

  const [snackbar, setSnackbar] = useState({
    open:false,
    color:null,
    text:'No value'
  });

  const [isError, setIsError] = useState({
    hostname:false,
    model:false,
    tahun:false
  });

  const theme = useTheme();

  const {auth, setAuth} = useAuth(); 

  const axiosJWT = useAxiosJWT();

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

    if(value.jenis_perangkat<=1){
      if(value.hostname.length<1){
        setIsError((prev) => ({...prev, hostname:true}));
        invalid = true;
      }else{
        setIsError((prev) => ({...prev, hostname:false}));
      }
    };
    
    if(value.tahun.length!==4){
      setIsError((prev) => ({...prev, tahun:true}));
      invalid = true;
    }else{
      setIsError((prev) => ({...prev, tahun:false}));
    }

    if(value.model.length<1){
      setIsError((prev) => ({...prev, model:true}));
      invalid = true;
    }else{
      setIsError((prev) => ({...prev, model:false}));
    }

    return !invalid
  }

  const handleAddAsset = async () => {
    const isValid = await checkInput();
    setIsCallingAPI(true);

    if(!isValid){setIsCallingAPI(false); return};

    try{ 
      const response = await axiosJWT.post("/addIAsset",{
        jenis_perangkat: value.jenis_perangkat, 
        hostname: value.hostname, 
        nama_pegawai: value.nama_pegawai, 
        model: value.model, 
        tahun: value.tahun, 
        kondisi: value.kondisi, 
        cpu: value.jenis_perangkat<=1 ? value.cpu : 3, 
        ip: value.ip, 
        ram: value.ram, 
        storage: value.storage, 
        serial_number: value.serial_number, 
        catatan: value.catatan, 
        periode: value.periode
      });
      console.log(response);
      getIAsset();
      setSnackbar({
        open:true,
        color:response.data.msg?"success":"error",
        text:response?.data?.msg?response.data.msg:response.data.errMsg
      });
      setOpen(false);
      setValue({...DEFAULT_VALUE, jenis_perangkat:value.jenis_perangkat});
      setIsCallingAPI(false);
    }catch(err){
      console.log(err);
      setSnackbar({
        open:true,
        color:"error",
        text:`Fail to insert Data (${err.response.data.errMsg?err.response.data.errMsg:err.response.data})`
      });
      setIsCallingAPI(false);
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

  useEffect(() => { // untuk nge render form secara dynamic jenis komputer atau bukan 
    if(value.jenis_perangkat===0 || value.jenis_perangkat===1 ){
      setIsComputerForm(true)} else {
      setIsComputerForm(false)
    }
  },[value.jenis_perangkat]);

  useEffect(() => { // untuk ngerender table head dan body secara dynamic, di pass ke child component AssetTIKTable
    if(tabValue===0 || tabValue===1 ){
      setIsComputer(true)} else {
      setIsComputer(false)
    }
  },[tabValue]);


  return(
      <>
        <Container maxWidth="xl">
  
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Stack direction='row' spacing={2}>
              <IconButton variant='contained' onClick={() => {props.changeSection(1)}}>
                <Iconify icon={"eva:arrow-ios-back-outline"} />
              </IconButton> 
              <Typography variant="h4" gutterBottom>
                Data Perangkat TIK
              </Typography>
            </Stack>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClick}>
              Add
            </Button>
  
          </Stack>
  
          <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="icon tabs example">
              <Tab icon={<Iconify icon="solar:monitor-smartphone-bold-duotone" />} label="Komputer" value={0} />
              <Tab icon={<Iconify icon="solar:laptop-bold-duotone" />} label="Laptop" value={1}/>
              <Tab icon={<Iconify icon="solar:printer-bold-duotone" />} label="Printer" value={2}/>
              <Tab icon={<Iconify icon="solar:scanner-bold-duotone" />} label="Scanner" value={3}/>
              <Tab icon={<Iconify icon="solar:washing-machine-bold-duotone" />} label="UPS" value={4}/>
              <Tab icon={<Iconify icon="solar:electric-refueling-bold-duotone" />} label="Genset" value={5}/>
              <Tab icon={<Iconify icon="solar:wi-fi-router-bold-duotone" />} label="Router" value={6}/>
              <Tab icon={<Iconify icon="solar:structure-broken" />} label="Switch" value={7}/>
              <Tab icon={<Iconify icon="solar:smartphone-2-bold-duotone" />} label="Tablet" value={8}/>
            </Tabs>
          </Stack>

          {/* assetTik Table here */}
          <UserTikTable2 isComputer={isComputer} currentTab={tabValue}/>
        
          </Container>

      {/* --------------------------- --------MODAL UNTUK INPUT PERANGKAT KOMPUTER BARU------------------------------------------------- */}
      
      <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Scrollbar>
            <Paper sx={{height:'500px', width:'auto', justifyContent:'center'}}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Tambah Perangkat
                </Typography>

                <Stack direction='row' justifyContent={'space-around'}>

                  <Stack direction='column' spacing={3} sx={{width:'40%'}}>

                  <FormControl sx={{  minWidth: 120 }} size="small" required>
                        <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Jenis Perangkat</InputLabel>
                        <Select 
                        required
                        name="jenis_perangkat"
                        value={value.jenis_perangkat} 
                        sx={{ width:'80%', typography:'body2'}} 
                        label="Jenis Perangkat" 
                        onChange={handleChange}
                        size='small'
                        >
                            {SELECTPERANGKAT.map((item, index) => {
                            return(<MenuItem key={index} sx={{typography:'body2'}} value={item.value}>{item.jenis} <Iconify icon={item.icon} sx={{ml:1}}/></MenuItem>)
                            })}
                        </Select>
                  </FormControl>

                  <FormControl sx={{display:isComputerForm?null:'none'}}>
                      <TextField  name="hostname" error={isError.hostname} size='small' label="Hostname" required onChange={handleChange} value={value.hostname} sx={{width:'80%'}}/>
                      <FormHelperText>cth: KBN0300G007, Laptop-xxx</FormHelperText>
                  </FormControl>

                  <FormControl sx={{display:isComputerForm?null:'none'}}>
                      <TextField name="nama_pegawai" size='small' label="Nama Pegawai"  onChange={handleChange} value={value.nama_pegawai} sx={{width:'80%'}}/>
                      <FormHelperText>pegawai yang menggunakan</FormHelperText>
                  </FormControl>

                  <FormControl>
                      <TextField name="model" error={isError.model} size='small' label="Merk/Model" onChange={handleChange} value={value.model} required sx={{width:'80%'}}/>
                      <FormHelperText>cth: acer m400, hp laserjet 1102</FormHelperText>
                  </FormControl>

                  <FormControl sx={{  minWidth: 120, display:isComputerForm?null:'none' }} size="small">
                        <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>CPU</InputLabel>
                        <Select 
                        name="cpu"
                        labelId="demo-simple-jenis-cpu" 
                        id="demo-simple-cpu" 
                        value={value.cpu} 
                        sx={{ width:'60%', typography:'body2'}} 
                        label="CPU" 
                        onChange={handleChange}
                        size='small'
                        >
                            {SELECTCPU.map((item, index) => {
                            return(<MenuItem key={index} sx={{typography:'body2'}} value={item.value}>{item.jenis}</MenuItem>)
                            })}
                        </Select>
                  </FormControl>

                  <FormControl sx={{display:isComputerForm?null:'none'}} size="small">
                      <TextField name="serial_number" size='small' label="Serial Number"  onChange={handleChange} value={value.serial_number} sx={{width:'80%'}}/>
                  </FormControl>

                  </Stack>

                  <Stack direction='column' spacing={3} sx={{width:'40%'}}>
                                          
                    <Stack direction='row'>
                      <FormControl>
                        <TextField name="tahun" error={isError.tahun} size='small' label="Tahun" required onChange={handleChange} value={value.tahun}  sx={{width:'80%'}}/>
                      </FormControl>
                      <FormControl sx={{display:isComputerForm?null:'none'}}>
                          <TextField name="ip" size='small' label="IP Adress" onChange={handleChange} value={value.ip} sx={{width:'80%'}}/>
                      </FormControl>
                    </Stack>

                    <Stack direction='row' sx={{display:isComputerForm?null:'none'}}>
                      <FormControl >
                          <TextField name="ram" size='small' label="RAM" onChange={handleChange} value={value.ram} InputProps={{endAdornment: <InputAdornment position="end">Gb</InputAdornment>}} sx={{width:'80%'}}/>
                      </FormControl>

                      <FormControl >
                          <TextField name="storage" size='small' label="Storage" onChange={handleChange} value={value.storage} InputProps={{endAdornment: <InputAdornment position="end">Gb</InputAdornment>}} sx={{width:'80%'}}/>
                      </FormControl>
                    </Stack>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" required>
                        <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Kondisi</InputLabel>
                        <Select
                        name="kondisi"
                        required
                        labelId="demo-simple-select-label" 
                        id="demo-simple-select" 
                        value={value.kondisi} 
                        sx={{ width:'40%', typography:'body2'}} 
                        label="Kondisi" 
                        onChange={handleChange}
                        size='small'
                        >
                            {selectItem.map((item, index) => {
                            return(<MenuItem key={index} sx={{typography:'body2', color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>

                    <FormControl >
                        <TextField name="catatan" size='small' label="Catatan (opsional)" onChange={handleChange} value={value.catatan} multiline minRows={4} maxRows={4}/>
                        <FormHelperText>Catatan untuk mengenali perangkat; cth: printer di meja x, scanner warna x, dll </FormHelperText>
                    </FormControl>
                    
                    <Stack direction='row' justifyContent="center" spacing={2}>
                      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} disabled={isCallingAPI && isCallingAPI} onClick={handleAddAsset}>
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
      <Snackbar open={Boolean(snackbar.open)} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{vertical:'top', horizontal:'right'}} >
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

export default AssetTikSection;