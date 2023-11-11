import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import { Card, Table, Stack, Paper, Avatar, Button, Popover, TableRow, MenuItem, TableBody, TableCell, Container, 
  Typography, IconButton, TableContainer, TablePagination, Tabs, Tab, Modal, Box, InputLabel, FormControl, Select, TextField,
FormHelperText, InputAdornment,  } from '@mui/material';
import {useTheme} from "@mui/material/styles";
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { IAsset2Head, IAsset2Toolbar } from './iAssetTable2';



// ------ data from backEnd

// const OTHERASSET = [
//   {id: 1, jenis_perangkat: 2, model:'HP M401', tahun: '2022', kondisi:1, keterangan:'dipakai kepala kantor', last_update:'1/10/2023',alignRight: false},
//   {id: 2, jenis_perangkat: 3, model:'HP M202', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
//   {id: 3, jenis_perangkat: 4, model:'HP M203', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
//   {id: 4, jenis_perangkat: 5, model:'HP M204', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
//   {id: 5, jenis_perangkat: 6, model:'HP M205', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
//   {id: 6, jenis_perangkat: 7, model:'HP M206', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
//   {id: 7, jenis_perangkat: 8, model:'HP M207', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false}
// ]

const ASSET = [
  {id: 1, jenis_perangkat: 1, hostname:'KBN0300G307', nama_pegawai:'Andi', model:'Acer P214', tahun: '2022', kondisi:0, cpu: 'Intel Core i5', ip:'25', ram:'8Gb', storage:'250 Gb', serial_number:'UNLOOPWQEK010323', keterangan:'dipakai kepala kantor', last_update:'1/10/2023',alignRight: false},
  {id: 2, jenis_perangkat: 0, hostname:'KBN0300G309', nama_pegawai:'Budi', model:'Acer P214', tahun: '2022', kondisi:1, cpu: 'Intel Core i5', ip:'39', ram:'8Gb', storage:'250 Gb', serial_number:'UNVQPP001293214', keterangan:'Komputer server', last_update:'1/10/2023',alignRight: false},
  {id: 3, jenis_perangkat: 1, hostname:'KBN0300G304', nama_pegawai:'Cici', model:'Acer P214', tahun: '2022', kondisi:2, cpu: 'Intel Core i5', ip:'DHCP (wifi)', ram:'8Gb', storage:'250 Gb', serial_number:'UNV00924562IIEJ', keterangan:'Laptop Aula untuk acara', last_update:'1/10/2023',alignRight: false},
  {id: 1, jenis_perangkat: 2, model:'HP M401', tahun: '2022', kondisi:1, keterangan:'dipakai kepala kantor', last_update:'1/10/2023',alignRight: false},
  {id: 2, jenis_perangkat: 3, model:'HP M202', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
  {id: 3, jenis_perangkat: 4, model:'HP M203', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
  {id: 4, jenis_perangkat: 5, model:'HP M204', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
  {id: 5, jenis_perangkat: 6, model:'HP M205', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
  {id: 6, jenis_perangkat: 7, model:'HP M206', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false},
  {id: 7, jenis_perangkat: 8, model:'HP M207', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false}
]

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'id', label: 'No', alignRight: false },
  { id: 'jenis_perangkat', label: 'Jenis Perangkat', alignRight: false },
  { id: 'model', label: 'Merk/Model', alignRight: false },
  { id: 'tahun', label: 'Tahun', alignRight: false },
  { id: 'kondisi', label: 'Kondisi', alignRight: false },
  { id: 'serial_number', label: 'Serial Number', alignRight: false },
  { id: 'keterangan', label: 'Keterangan', alignRight: false },
  {id:''}
];

const TABLE_HEAD2 = [
  { id: 'id', label: 'No', alignRight: false },
  { id: 'jenis_perangkat', label: 'Jenis Perangkat', alignRight: false },
  { id: 'hostname', label: 'Hostname', alignRight: false },
  { id: 'nama_pegawai', label: 'Pegawai', alignRight: false },
  { id: 'model', label: 'Merk/Model', alignRight: false },
  { id: 'tahun', label: 'Tahun', alignRight: false },
  { id: 'kondisi', label: 'Kondisi', alignRight: false },
  { id: 'cpu', label: 'CPU', alignRight: false },
  { id: 'ip', label: 'IP Adress', alignRight: false },
  { id: 'ram', label: 'RAM', alignRight: false },
  { id: 'storage', label: 'Storage', alignRight: false },
  { id: 'serial_number', label: 'Serial Number', alignRight: false },
  { id: 'catatan', label: 'Catatan', alignRight: false },
  {id:''}
];

const assetRef = {
  0: "Komputer",
  1: "Laptop",
  2: "Printer",
  3: "Scanner",
  4: "UPS",
  5: "Genset",
  6: "Router",
  7: "Switch",
  8: "Tablet"
}

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

const SELECTITEM = [
  {jenis:'Baik', value:0, color:'success'},
  {jenis:'Rusak Ringan', value:1, color:'warning'},
  {jenis:'Rusak Berat', value:2, color:'error'}, 
  ]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, type) {
  let filteredData = [...array]; // Create a copy of the original array

  const stabilizedThis = filteredData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (!query && type !== null) {
    filteredData = filteredData.filter((perangkat) => {
      return perangkat.jenis_perangkat === type;
    });
  }

  if (query && type !== null) {
    const lowerCaseQuery = query.toLowerCase();
    filteredData = filteredData.filter((perangkat) => {
      return Object.values(perangkat).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery) &&
          perangkat.jenis_perangkat === type
      );
    });
  }

  return stabilizedThis
    .filter((el) => filteredData.includes(el[0])) // Filter the sorted data based on filteredData
    .map((el) => el[0]); // Return the sorted and filtered data
}



// ----------------------------------------------------------------------

export default function AssetTikTable2(props) {
  const [open, setOpen] = useState(false); // membuka popover edit dan delete data

  const [modalOpen, setModalOpen] = useState(false); // membuka popover edit dan delete data

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc'); // mengurutkan data asc or desc, masuk ke function applySortFilter

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('no');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const theme = useTheme();

  const [value, setValue] = useState({
    id: '', 
    jenis_perangkat: 0, 
    hostname:'', 
    nama_pegawai:'', 
    model:'', 
    tahun: '', 
    kondisi:0, 
    cpu: '', 
    ip:'', 
    ram:'', 
    storage:'', 
    serial_number:'', 
    catatan:'', 
    last_update:'',
  });
  const [isComputer, setIsComputer] = useState(true); // akan beda render table head 
  const [isComputerForm, setIsComputerForm] = useState(true);// akan beda render  form input

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
    console.log(event.currentTarget)  
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleChange = (event) => {
    setValue((prev) => ({
       ...prev,
       [event.target.name]:event.target.value
    })
    )
  };

  const handleClose = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    if(value.jenis_perangkat===0 || value.jenis_perangkat===1 ){
    setIsComputerForm(true)} else {
      setIsComputerForm(false)
    }
  },[value.jenis_perangkat])

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ASSET.length) : 0;

  const filteredUsers = applySortFilter(ASSET, getComparator(order, orderBy), filterName, props.currentTab);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
     
        <Card>
          <IAsset2Toolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} onFilterOpen={handleOpenMenu}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <IAsset2Head
                  order={order}
                  orderBy={orderBy}
                  headLabel={props.isComputer?TABLE_HEAD2:TABLE_HEAD}
                  rowCount={ASSET.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const selectedUser = selected.indexOf(row.jenis_perangkat) !== -1;

                    return (
                      <TableRow hover key={row.id}>
                        <TableCell>
                          {row.id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none" align="left">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={row.jenis_perangkat} src={row.jenis_perangkat} />
                            <Typography variant="subtitle2" noWrap>
                              {assetRef[row.jenis_perangkat]}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {props.isComputer?(<TableCell align="left">{row.hostname}</TableCell>):null}

                        {props.isComputer?(<TableCell align="left">{row.nama_pegawai}</TableCell>):null}

                        <TableCell align="left">{row.model}</TableCell>

                        <TableCell align="left">{row.tahun}</TableCell>

                        <TableCell align="left">
                          <Label color={ row.kondisi===0?"success":row.kondisi===1?"warning":row.kondisi===2?"error":null}>
                            {
                            row.kondisi===0?"baik":row.kondisi===1?"rusak ringan":row.kondisi===2?"rusak berat":null
                            }</Label>
                        </TableCell>

                        {props.isComputer?(<TableCell align="left">{row.cpu}</TableCell>):null}

                        {props.isComputer?(<TableCell align="left">{row.ip}</TableCell>):null}

                        {props.isComputer?(<TableCell align="left">{row.ram}</TableCell>):null}

                        {props.isComputer?(<TableCell align="left">{row.storage}</TableCell>):null}

                        <TableCell align="left">{row.serial_number}</TableCell>

                        <TableCell align="left">{row.keterangan}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={14} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={14} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ASSET.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        {/*  popover di koolom paling akhir table utk pilihan edit dan delete */}
        <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
            sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
            },
            },
        }}
        >
            <MenuItem onClick={() => {setModalOpen(true)}}>
                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                Edit
            </MenuItem>

            <MenuItem sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Delete
            </MenuItem>
        </Popover>

        {/*  Modal untuk edit data */}

        <Modal open={modalOpen} onClose={handleClose}>
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
                        <TextField name="hostname" size='small' label="Hostname" required onChange={handleChange} value={value.hostname} sx={{width:'80%'}}/>
                        <FormHelperText>cth: KBN0300G007, Laptop-xxx</FormHelperText>
                    </FormControl>

                    <FormControl sx={{display:isComputerForm?null:'none'}}>
                        <TextField name="nama_pegawai" size='small' label="Nama Pegawai"  onChange={handleChange} value={value.nama_pegawai} sx={{width:'80%'}}/>
                        <FormHelperText>pegawai yang menggunakan</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <TextField name="model" size='small' label="Merk/Model" onChange={handleChange} value={value.model} required sx={{width:'80%'}}/>
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
                          <TextField name="tahun" size='small' label="Tahun" required onChange={handleChange} value={value.tahun}  sx={{width:'80%'}}/>
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
                        <Button variant="contained" color="warning" startIcon={<Iconify icon="eva:edit-fill" />} >
                            Edit
                        </Button>
                      </Stack>

                    </Stack>

                  </Stack>
              </Paper>
              </Scrollbar>
            </Box>
        
        </Modal>


    </>
  );
}

