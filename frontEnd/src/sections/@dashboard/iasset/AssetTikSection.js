import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import{useTheme} from "@mui/material/styles"
import {Stack, Button, Container, Typography, IconButton, Tabs, Tab, Modal, Box, FormControl, TextField, FormHelperText, InputAdornment, Paper, InputLabel, Select, MenuItem} from '@mui/material';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from "../../../components/scrollbar";
// sub section
import AssetTikTable2 from './AssetTikTable2';


// ---------------------------------------------------------------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:'12px',
  };

const selectItem = [
{jenis:'Baik', value:1, color:'success'},
{jenis:'Rusak Ringan', value:2, color:'warning'},
{jenis:'Rusak Berat', value:3, color:'error'}, 
]


// -------------------------------------------------------------------------
const AssetTikSection = (props) => {
    const [open, setOpen] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState({
        username:'',
        nama:'',
        nik:"",
        password:""
    })

    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue({
           ...value,
           [event.target.name]:event.target.value
        })
      setTabValue(newValue);
    };

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

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
            <Tabs value={tabValue} onChange={handleChange} aria-label="icon tabs example">
              <Tab icon={<Iconify icon="solar:database-bold-duotone" />} label="All" />
              <Tab icon={<Iconify icon="solar:monitor-smartphone-bold-duotone" />} label="Computer" />
              <Tab icon={<Iconify icon="solar:laptop-bold-duotone" />} label="Laptop" />
              <Tab icon={<Iconify icon="solar:printer-bold-duotone" />} label="Printer" />
              <Tab icon={<Iconify icon="solar:scanner-bold-duotone" />} label="Scanner" />
              <Tab icon={<Iconify icon="solar:washing-machine-bold-duotone" />} label="UPS"/>
              <Tab icon={<Iconify icon="solar:electric-refueling-bold-duotone" />} label="Genset" />
              <Tab icon={<Iconify icon="solar:wi-fi-router-bold-duotone" />} label="Router" />
              <Tab icon={<Iconify icon="solar:structure-broken" />} label="Switch" />
              <Tab icon={<Iconify icon="solar:smartphone-2-bold-duotone" />} label="Tablet" />
            </Tabs>
          </Stack>


          {/* assetTik Table here */}
          <AssetTikTable2 />
        
          </Container>

        {/* --------------------------- --------MODAL UNTUK INPUT USER BARU------------------------------------------------- */}
        
          <Modal open={open} onClose={handleClose}>
          
            <Box sx={style}>
            <Scrollbar>
            <Paper sx={{height:'600px', width:'auto', justifyContent:'center'}}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Tambah Perangkat
                </Typography>

                <Tabs aria-label="icon tabs example" value={0} centered>
                    <Tab icon={<Iconify icon="solar:monitor-smartphone-bold-duotone" />} label="Computer" />
                    <Tab icon={<Iconify icon="solar:database-bold-duotone" />} label="Lainnya" />
                </Tabs>
                
                <Stack spacing={3}>
                {/* <FormControl>
                    <TextField name="username" label="Jenis Perangkat" required onChange={handleChange} value={value.username}/>
                </FormControl> */}

                <FormControl>
                <TextField name="nama" label="Merk/Model" onChange={handleChange} value={value.nama} required/>
                    <FormHelperText>Cth: "acer m400"</FormHelperText>
                </FormControl>

                <FormControl>
                    <TextField name="nik" label="Tahun" onChange={handleChange} value={value.nik} required/>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} required>
                    <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Kondisi</InputLabel>
                    <Select 
                    required
                    labelId="demo-simple-select-label" 
                    id="demo-simple-select" 
                    value={value} 
                    sx={{height:'30%', width:'50%', typography:'body2'}} 
                    label="Kondisi" 
                    onChange={handleChange}
                    >
                        <MenuItem sx={{typography:'body2'}} value="">All</MenuItem>
                        {selectItem.map((item) => {
                        return(<MenuItem sx={{typography:'body2', color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl>
                    <TextField name="nik" label="Keterangan" onChange={handleChange} value={value.nik}/>
                    <FormHelperText>Cth: "printer seksi bank, scanner di meja tengah, dll"</FormHelperText>
                </FormControl>
                
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} >
                    Add
                </Button>

                </Stack>
            </Paper>
            </Scrollbar>
            </Box>
        
        </Modal>
       

        </>
   
    )
}

export default AssetTikSection;