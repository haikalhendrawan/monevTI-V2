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
import useAsset from '../useAsset';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';



const SELECTCPU = [
    {jenis:'Intel Core i3', value:0},
    {jenis:'Intel Core i5', value:1},
    {jenis:'Intel Core i7', value:2}, 
    {jenis:'Lainnya', value:3},
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

const SELECTITEM = [
    {jenis:'Baik', value:0, color:'success'},
    {jenis:'Rusak Ringan', value:1, color:'warning'},
    {jenis:'Rusak Berat', value:2, color:'error'}, 
    ]

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

//----------------------

const IAssetEditModal = (props) => {
    const {ASSET, setASSET, getIAsset} = useAsset();

    const [isComputerForm, setIsComputerForm] = useState(true);// akan beda render  form input

    const theme = useTheme();

    const [value, setValue] = useState({...DEFAULT_VALUE});

    const [isError, setIsError] = useState({
        hostname:false,
        model:false,
        tahun:false
      });

    const [isCallingAPI, setIsCallingAPI] = useState(false); // cek apakah sedang query ke database utk mencegah double click add/edit button

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
        };

        if(value.model.length<1){
            setIsError((prev) => ({...prev, model:true}));
            invalid = true;
        }else{
            setIsError((prev) => ({...prev, model:false}));
        };

        return !invalid
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
    };

    const handleEditAsset = async () => {
        const isValid = await checkInput();
        setIsCallingAPI(true);

        if(!isValid){return};
  
        try{ 
          const response = await axiosJWT.post("/editIAsset",{
            id: props.data.id,
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
          props.modalClose();
          setIsCallingAPI(false);
        }catch(err){
          console.log(err);
          setSnackbar({
            open:true,
            color:"error",
            text:`Fail to insert Data (${err.response.data.errMsg})`
          });
          setIsCallingAPI(false);
        }
    }

    useEffect(() => {
        if(value.jenis_perangkat===0 || value.jenis_perangkat===1 ){
            setIsComputerForm(true)
        } else {
            setIsComputerForm(false)
        };
    },[value.jenis_perangkat]);

    useEffect(() => {
        setValue({
            id: props.data.id, 
            jenis_perangkat: props.data.jenis_perangkat, 
            hostname:props.data.hostname, 
            nama_pegawai:props.data.nama_pegawai, 
            model:props.data.model, 
            tahun: props.data.tahun, 
            kondisi: props.data.kondisi, 
            cpu: props.data.cpu?props.data.cpu:0, 
            ip: props.data.ip, 
            ram: props.data.ram, 
            storage:props.data.storage, 
            serial_number:props.data.serial_number, 
            catatan: props.data.catatan, 
            last_update: props.data.last_update,
        })
    },[props.data]);

    const handleClose = () => {
        props.modalClose();
        setValue({ 
            id: props.data.id, 
            jenis_perangkat: props.data.jenis_perangkat, 
            hostname:props.data.hostname, 
            nama_pegawai:props.data.nama_pegawai, 
            model:props.data.model, 
            tahun: props.data.tahun, 
            kondisi: props.data.kondisi, 
            cpu: props.data.cpu?props.data.cpu:0, 
            ip: props.data.ip, 
            ram: props.data.ram, 
            storage:props.data.storage, 
            serial_number:props.data.serial_number, 
            catatan: props.data.catatan, 
            last_update: props.data.last_update
        });
        setIsError({hostname:false, model:false, tahun:false});
    }

    // ----------------------------------------------------------------------------------------
    return(
        <>
        <Modal open={props.modalOpen} onClose={handleClose}>
            <Box sx={style}>
            <Scrollbar>
            <Paper sx={{height:'500px', width:'auto', justifyContent:'center'}}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Edit Data Perangkat
                </Typography>

                <Stack direction='row' justifyContent={'space-around'}>

                    <Stack direction='column' spacing={3} sx={{width:'40%'}}>

                    <FormControl sx={{  minWidth: 120 }} size="small" required>
                        <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Jenis Perangkat</InputLabel>
                        <Select 
                        disabled
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
                        <TextField name="hostname" error={isError.hostname} size='small' label="Hostname" required onChange={handleChange} value={value.hostname} sx={{width:'80%'}}/>
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
                            {SELECTITEM.map((item, index) => {
                            return(<MenuItem key={index} sx={{typography:'body2', color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>

                    <FormControl >
                        <TextField name="catatan" size='small' label="Catatan (opsional)" onChange={handleChange} value={value.catatan} multiline minRows={4} maxRows={4}/>
                        <FormHelperText>Catatan untuk mengenali perangkat; cth: printer di meja x, scanner warna x, dll </FormHelperText>
                    </FormControl>
                    
                    <Stack direction='row' justifyContent="center" spacing={2}>
                        <Button variant="contained" color="warning" startIcon={<Iconify icon="eva:edit-fill" />} disabled={isCallingAPI} onClick={handleEditAsset}>
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

export default IAssetEditModal
 