import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import { Card, Table, Stack, Paper, Avatar, Button, Popover, TableRow, MenuItem, TableBody, TableCell, Container, 
  Typography, IconButton, TableContainer, TablePagination, Snackbar, Alert} from '@mui/material';
import {useTheme} from "@mui/material/styles";
// hooks
import useAxiosJWT from '../../../../hooks/useAxiosJWT';
import {useAuth} from "../../../../hooks/useAuth";
import useAsset from '../useAsset';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
// sections
import { IAsset2Head, IAsset2Toolbar } from '.';
import IAssetEditModal from './IAssetEditModal';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'id', label: 'No', alignRight: false },
  { id: 'model', label: 'Merk/Model', alignRight: false },
  { id: 'tahun', label: 'Tahun', alignRight: false },
  { id: 'kondisi', label: 'Kondisi', alignRight: false },
  { id: 'serial_number', label: 'Serial Number', alignRight: false },
  { id: 'keterangan', label: 'Keterangan', alignRight: false },
  {id:''}
];

const TABLE_HEAD2 = [
  { id: 'id', label: 'No', alignRight: false },
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
};

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
  {jenis:'Komputer', value:0, icon:"solar:monitor-smartphone-bold-duotone"},
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
  ];

const SELECTITEM = [
  {jenis:'Baik', value:0, color:'success'},
  {jenis:'Rusak Ringan', value:1, color:'warning'},
  {jenis:'Rusak Berat', value:2, color:'error'}, 
  ];

const AVATAR = {
  0:"solar:monitor-smartphone-bold-duotone",
  1:"solar:laptop-bold-duotone",
  2:"solar:printer-bold-duotone", 
  3:"solar:scanner-bold-duotone",
  4:"solar:washing-machine-bold-duotone",
  5:"solar:electric-refueling-bold-duotone", 
  6:"solar:wi-fi-router-bold-duotone", 
  7:"solar:structure-broken",
  8:"solar:smartphone-2-bold-duotone",
}

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

function applySortFilter(array, comparator, query, type, kondisi) {
  let filteredData = [...array]; // Buat array copy

  const stabilizedThis = filteredData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (!query!== null && !kondisi !== 3) {
    filteredData = filteredData.filter((perangkat) => {
      return perangkat.jenis_perangkat === type;
    });
  };

  if (!query!== null && kondisi !== 3) {
    filteredData = filteredData.filter((perangkat) => {
      return perangkat.jenis_perangkat === type && perangkat.kondisi === kondisi;
    });
  };

  if (query!== null && !kondisi !== 3) {
    const lowerCaseQuery = query.toLowerCase();
    filteredData = filteredData.filter((perangkat) => {
      return Object.values(perangkat).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery) &&
          perangkat.jenis_perangkat === type
      );
    });
  };

  if (query!== null && kondisi !== 3) {
    const lowerCaseQuery = query.toLowerCase();
    filteredData = filteredData.filter((perangkat) => {
      return Object.values(perangkat).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery) &&
          perangkat.jenis_perangkat === type &&
          perangkat.kondisi === kondisi
      );
    });
  };



  return stabilizedThis
    .filter((el) => filteredData.includes(el[0])) // Filter the sorted data based on filteredData
    .map((el) => el[0]); // Return the sorted and filtered data
};

// ----------------------------------------------------------------------

export default function AssetTikTable2(props) {
  const {ASSET, setASSET, getIAsset} = useAsset();

  const [open, setOpen] = useState(false); // membuka popover edit dan delete data

  const [modalOpen, setModalOpen] = useState(false); // membuka modal 
  
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc'); // mengurutkan data asc or desc, masuk ke function applySortFilter

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState(''); // set filter name di search bar, di pass ke IAssetToolbar

  const [filterKondisi, setFilterKondisi] = useState(3); // set filter kondisi di toolbar

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [rowToEdit, setRowToEdit] = useState({});

  const [isComputer, setIsComputer] = useState(true); // akan beda render table head 

  const [isComputerForm, setIsComputerForm] = useState(true);// akan beda render  form input

  const [snackbar, setSnackbar] = useState({
    open:false,
    color:"warning",
    text:''
  });

  const handleSnackbarClose = () =>{
    setSnackbar({
      ...snackbar,
      open:false
    })
  };

  const {auth, setAuth} = useAuth(); 

  const theme = useTheme();

  const axiosJWT = useAxiosJWT();

  const handleOpenMenu = (rowId, event) => {  // buka popover dan pass Id asset nya untuk ngedit row yang dipilih
    setOpen(event.currentTarget);
    setRowToEdit(...ASSET?.filter((item) => {
      return item.id===rowId
    }));
  };

  const handleCloseMenu = () => { // close popover
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {  
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleModalClose = () => { // close edit modal, function di pass ke componen IAssetModal
      setModalOpen(false);
      setOpen(false);
  }

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

  const handleDelete = async (rowId) => { // Delete row dari tabel, reload data, tutup popover, munculkan snackbar
    try{
      const response = await axiosJWT.delete(`/deleteIAsset/${rowId}`);
      getIAsset();
      setOpen(null);
      console.log(response.data);
      setSnackbar({open:true, color:response.data.msg?"success":"error", text:response?.data?.msg?response.data.msg:response.data.errMsg});
    }catch(err){
      console.log(err);
      setSnackbar({
        open:true,
        color:"error",
        text:`Fail to delete Data(${err.response.data.errMsg})`
      });
    }
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ASSET?.length) : 0;

  const filteredAssets = applySortFilter(ASSET && ASSET, getComparator(order, orderBy), filterName, props.currentTab, filterKondisi);

  const isNotFound = !filteredAssets.length && !!filterName;

  // buat array baru isinya sama kyk filteredAsset cuman yg ini gak akan berubah ketika ada sort atau filter
  const tempArray = ASSET.filter((item) => item.jenis_perangkat===props.currentTab); 

  return (
    <>
     
        <Card>
          <IAsset2Toolbar filterName={filterName} onFilterName={handleFilterByName} onFilterOpen={handleOpenMenu} onFilterKondisi={setFilterKondisi} kondisi={filterKondisi}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <IAsset2Head
                  order={order}
                  orderBy={orderBy}
                  headLabel={props.isComputer?TABLE_HEAD2:TABLE_HEAD}
                  rowCount={ASSET?.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    // buat dapet nomor urut dari masing-masing row
                    const tempArraySorted = tempArray.sort((a, b) => a.id-b.id)
                    const rowIndex = tempArraySorted.findIndex(item => item.id === row.id) + 1;

                    return (
                      <TableRow hover key={index}>
                        <TableCell>
                          {rowIndex}
                        </TableCell>

                        {props.isComputer
                        ? (<TableCell component="th" scope="row" padding="none" align="left">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={assetRef[row.jenis_perangkat]} > <Iconify sx={{color:theme.palette.primary.main}} icon={AVATAR[row.jenis_perangkat]} /> </Avatar>
                            <Typography variant="subtitle2" noWrap>
                              {row.hostname}
                            </Typography>
                          </Stack>
                          </TableCell>)
                        : (<TableCell component="th" scope="row" padding="none" align="left">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={assetRef[row.jenis_perangkat]} > <Iconify sx={{color:theme.palette.primary.main}} icon={AVATAR[row.jenis_perangkat]} /> </Avatar>
                            <Typography variant="subtitle2" noWrap>
                              {row.model}
                            </Typography>
                          </Stack>
                        </TableCell>)}

                        {props.isComputer?(<TableCell align="left">{row.nama_pegawai}</TableCell>):null}

                        {props.isComputer?(<TableCell align="left">{row.model}</TableCell>):null}

                        <TableCell align="left">{row.tahun}</TableCell>

                        <TableCell align="left">
                          <Label color={ row.kondisi===0?"success":row.kondisi===1?"warning":row.kondisi===2?"error":null}>
                            {
                            row.kondisi===0?"baik":row.kondisi===1?"rusak ringan":row.kondisi===2?"rusak berat":null
                            }</Label>
                        </TableCell>
                        
                        {props.isComputer?(<TableCell align="left">{SELECTCPU[row.cpu].jenis}</TableCell>):null}

                        {props.isComputer?(<TableCell align="left">{row.ip}</TableCell>):null}

                        {props.isComputer?(<TableCell align="left">{row.ram}</TableCell>):null}

                        {props.isComputer?(<TableCell align="left">{row.storage}</TableCell>):null}

                        <TableCell align="left">{row.serial_number}</TableCell>

                        <TableCell align="left">{row.catatan}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => {handleOpenMenu(row.id, event)}}>
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
            count={ASSET?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        {/*  -------------- -popover di kolom paling akhir table utk pilihan edit dan delete -----------*/}
        <Popover
        open={Boolean(open)}
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
            <MenuItem onClick={()=> {setModalOpen(true)}}>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}/>
              Edit
            </MenuItem>

            <MenuItem sx={{color:'error.main'}} onClick={() => {handleDelete(rowToEdit?.id)}}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
        </Popover>

        {/* -------------------------------- Modal untuk meng edit data *--------------------------------- */}
        <IAssetEditModal modalOpen={modalOpen} modalClose={handleModalClose} data={rowToEdit}/>


        {/*  ------------------------snackbar untuk show notification di kanan atas --------------------- */}
        <Snackbar open={Boolean(snackbar.open)} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{vertical:'top', horizontal:'right'}} >
          <Alert 
            onClose={handleSnackbarClose} 
            variant="filled" 
            severity={snackbar?.color} 
            sx={{ width: '100%'}}
          >
            {snackbar?.text}
          </Alert>
        </Snackbar>
       

    </>
  );
}

