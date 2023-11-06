import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import{useTheme} from "@mui/material/styles"
import {Stack, Button, Container, Typography, IconButton, Tabs, Tab, Modal, Box, FormControl, TextField, FormHelperText, InputAdornment, Paper, InputLabel, Select, MenuItem, OutlinedInput} from '@mui/material';
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
    height:'550px',
    width: '1000px',
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

const SELECTPERANGKAT = [
  {jenis:'Komputer', value:1, icon:"solar:monitor-smartphone-bold-duotone" },
  {jenis:'Laptop', value:2, icon:"solar:laptop-bold-duotone"},
  {jenis:'Printer', value:3, icon:"solar:printer-bold-duotone"}, 
  {jenis:'Scanner', value:4, icon:"solar:scanner-bold-duotone"},
  {jenis:'UPS', value:5, icon:"solar:washing-machine-bold-duotone"},
  {jenis:'Genset', value:6, icon:"solar:electric-refueling-bold-duotone"},
  {jenis:'Router', value:7, icon:"solar:wi-fi-router-bold-duotone"},
  {jenis:'Switch', value:8, icon:"solar:structure-broken"},
  {jenis:'Tablet', value:9, icon:"solar:smartphone-2-bold-duotone"},
  ]

const SELECTCPU = [
  {jenis:'Intel Core i3', value:1 },
  {jenis:'Intel Core i5', value:2},
  {jenis:'Intel Core i7', value:3}, 
  {jenis:'Lainnya', value:4},
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
              <Paper sx={{height:'500px', width:'auto', justifyContent:'center'}}>
                  <Typography variant="h4" sx={{ mb: 2 }}>
                      Tambah Perangkat
                  </Typography>

                  <Stack direction='row' justifyContent={'space-around'}>

                    <Stack direction='column' spacing={3} sx={{width:'40%'}}>
                    {/* <Tabs aria-label="icon tabs example" value={0} centered>
                        <Tab icon={<Iconify icon="solar:monitor-smartphone-bold-duotone" />} label="Computer" />
                        <Tab icon={<Iconify icon="solar:database-bold-duotone" />} label="Lainnya" />
                    </Tabs> */}
                    <FormControl sx={{  minWidth: 120 }} required>
                          <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Jenis Perangkat</InputLabel>
                          <Select 
                          required
                          labelId="demo-simple-jenis-perangkat" 
                          id="demo-simple-perangkat" 
                          value={value} 
                          sx={{ width:'60%', typography:'body2'}} 
                          label="Jenis Perangkat" 
                          onChange={handleChange}
                          size='small'
                          >
                              {SELECTPERANGKAT.map((item) => {
                              return(<MenuItem sx={{typography:'body2'}} value={item.value}>{item.jenis} <Iconify icon={item.icon} sx={{ml:1}}/></MenuItem>)
                              })}
                          </Select>
                    </FormControl>

                    <FormControl >
                        <TextField name="username" size='small' label="Hostname" required onChange={handleChange} value={value.username} sx={{width:'60%'}}/>
                        <FormHelperText>cth: "KBN0300G007"</FormHelperText>
                    </FormControl>

                    <FormControl >
                        <TextField name="username" size='small' label="Nama Pegawai"  onChange={handleChange} value={value.username} sx={{width:'80%'}}/>
                        <FormHelperText>pegawai yang menggunakan</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <TextField name="nama" size='small' label="Merk/Model" onChange={handleChange} value={value.nama} required sx={{width:'80%'}}/>
                        <FormHelperText>cth: "acer m400"</FormHelperText>
                    </FormControl>

                    <FormControl sx={{  minWidth: 120 }} required>
                          <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>CPU</InputLabel>
                          <Select 
                          required
                          labelId="demo-simple-jenis-cpu" 
                          id="demo-simple-cpu" 
                          value={value} 
                          sx={{ width:'60%', typography:'body2'}} 
                          label="CPU" 
                          onChange={handleChange}
                          size='small'
                          >
                              <MenuItem sx={{typography:'body2'}} value="">All</MenuItem>
                              {SELECTCPU.map((item) => {
                              return(<MenuItem sx={{typography:'body2'}} value={item.value}>{item.jenis}</MenuItem>)
                              })}
                          </Select>
                    </FormControl>

                    <FormControl >
                        <TextField name="username" size='small' label="Serial Number"  onChange={handleChange} value={value.username} sx={{width:'60%'}}/>
                    </FormControl>

                    </Stack>

                    <Stack direction='column' spacing={3} sx={{width:'40%'}}>
                                            
                      <Stack direction='row'>
                        <FormControl>
                          <TextField name="nik" size='small' label="Tahun" required onChange={handleChange} value={value.nik}  sx={{width:'80%'}}/>
                        </FormControl>
                        <FormControl >
                            <TextField name="username" size='small' label="IP Adress" onChange={handleChange} value={value.username} sx={{width:'80%'}}/>
                        </FormControl>
                      </Stack>

                      <Stack direction='row'>
                        <FormControl >
                            <TextField name="username" size='small' label="RAM" onChange={handleChange} value={value.username} InputProps={{endAdornment: <InputAdornment position="end">Gb</InputAdornment>}} sx={{width:'80%'}}/>
                        </FormControl>

                        <FormControl >
                            <TextField name="username" size='small' label="Storage" onChange={handleChange} value={value.username} InputProps={{endAdornment: <InputAdornment position="end">Gb</InputAdornment>}} sx={{width:'80%'}}/>
                        </FormControl>
                      </Stack>

                      <FormControl sx={{ m: 1, minWidth: 120 }} required>
                          <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Kondisi</InputLabel>
                          <Select 
                          required
                          labelId="demo-simple-select-label" 
                          id="demo-simple-select" 
                          value={value} 
                          sx={{ width:'40%', typography:'body2'}} 
                          label="Kondisi" 
                          onChange={handleChange}
                          size='small'
                          >
                              <MenuItem sx={{typography:'body2'}} value="">All</MenuItem>
                              {selectItem.map((item) => {
                              return(<MenuItem sx={{typography:'body2', color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                              })}
                          </Select>
                      </FormControl>

                      <FormControl >
                          <TextField name="nik" size='small' label="Catatan (opsional)" onChange={handleChange} value={value.nik} multiline minRows={4} maxRows={4}/>
                          <FormHelperText>Cth: "printer seksi bank, scanner di meja tengah, dll"</FormHelperText>
                      </FormControl>
                      
                      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} >
                          Add
                      </Button>
                    </Stack>

                  </Stack>
              </Paper>
              </Scrollbar>
            </Box>
        
        </Modal>
       

        </>
   
    )
}

export default AssetTikSection;