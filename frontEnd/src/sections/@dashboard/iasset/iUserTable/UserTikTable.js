import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {Card, Table, Stack, Paper, Avatar, Button, Popover, Alert, TableRow, MenuItem, TableBody,
        TableCell, Container, Typography, IconButton, TableContainer, TablePagination, Snackbar} from '@mui/material';
import {useTheme} from "@mui/material/styles";
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '.';
// hooks
import useAxiosJWT from '../../../../hooks/useAxiosJWT';
import {useAuth} from "../../../../hooks/useAuth";
import useIUser from "../useIUser";
// mock
import IUserEditModal from './IUserEditModal';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'id', label: 'No', alignRight: false },
  { id: 'name', label: 'Nama', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'pelatihan', label: 'Pelatihan', alignRight: false },
  { id: 'catatan', label: 'Catatan', alignRight: false },
  {id:''}
];

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

function applySortFilter(array, comparator, query, type, pelatihan) {
  let filteredData = [...array]; // Buat array copy

  const stabilizedThis = filteredData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (!query!== null && !pelatihan !== 2) {  // gaada query, cuma filter per jenis
    filteredData = filteredData.filter((user) => {
      return user.app === type;
    });
  };

  if (!query!== null && pelatihan !== 2) {  // gaada query dan ada filter pelatihan
    filteredData = filteredData.filter((user) => {
      return user.app === type && user.pelatihan===pelatihan;
    });
  };

  if (query!== null && !pelatihan !== 2) { // ada query dan gaada filter pelatihan
    const lowerCaseQuery = query.toLowerCase();
    filteredData = filteredData.filter((user) => {
      return Object.values(user).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery) &&
          user.app === type
      );
    });
  }

  if (query!== null && pelatihan !== 2) { // ada query dan gaada filter pelatihan
    const lowerCaseQuery = query.toLowerCase();
    filteredData = filteredData.filter((user) => {
      return Object.values(user).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery) &&
          user.app === type &&
          user.pelatihan === pelatihan
      );
    });
  }

  return stabilizedThis
    .filter((el) => filteredData.includes(el[0])) // Filter the sorted data based on filteredData
    .map((el) => el[0]); // Return the sorted and filtered data
}


// ----------------------------------------------------------------------

export default function UserTikTable(props) {
  const {IUSER, setIUSER, getIUser} = useIUser(); // hook untuk dapetkan data User menggunakan Context Provider.

  const {auth, setAuth} = useAuth(); 

  const theme = useTheme();

  const axiosJWT = useAxiosJWT();

  const [open, setOpen] = useState(null);

  const [modalOpen, setModalOpen] = useState(false); // membuka modal 

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [filterPelatihan, setFilterPelatihan] = useState(2);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rowToEdit, setRowToEdit] = useState({});

  const [snackbar, setSnackbar] = useState({
    open:false,
    color:"warning",
    text:''
  });

  const handleOpenMenu = (rowId, event) => {  // buka popover dan pass Id user nya untuk ngedit row yang dipilih
    setOpen(event.currentTarget);
    setRowToEdit(...IUSER?.filter((item) => {
      return item.id===rowId
    }));
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleModalClose = () => { // close edit modal, function di pass ke componen IUserModal
    setModalOpen(false);
    setOpen(false);
  };

  const handleSnackbarClose = () =>{
    setSnackbar({
      ...snackbar,
      open:false
    })
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
    console.log(IUSER)
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
      const response = await axiosJWT.delete(`/deleteIUser/${rowId}`);
      getIUser();
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - IUSER.length) : 0;

  const filteredUsers = applySortFilter(IUSER&&IUSER, getComparator(order, orderBy), filterName, props.currentTab, filterPelatihan);

  const isNotFound = !filteredUsers.length && !!filterName;

  // buat array baru isinya sama kyk filteredUser cuman yg ini gak akan berubah ketika ada sort atau filter
  const tempArray = IUSER.filter((item) => item.app===props.currentTab); 

  return (
    <>
      <Card>
        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} onFilterPelatihan={setFilterPelatihan} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={IUSER.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  // buat dapet nomor urut dari masing-masing row
                  const tempArraySorted = tempArray.sort((a, b) => a.id-b.id)
                  const rowIndex = tempArraySorted.findIndex(item => item.id === row.id) + 1;

                  return (
                    <TableRow hover key={index}>
                      <TableCell>
                        {rowIndex}
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={row.name} />
                          <Typography variant="subtitle2" noWrap>
                          {row.name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">{row.username}</TableCell>

                      <TableCell align="left">{row.role}</TableCell>

                      <TableCell align="left">{row.email}</TableCell>

                      <TableCell align="left">
                        <Label color={row.pelatihan===0?"success":row.pelatihan===1?"error":null}>
                          {row.pelatihan===0?"Pernah":row.pelatihan===1?"Belum":null}
                        </Label>
                      </TableCell>

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
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
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
          count={IUSER.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* --------------------------------------Modal untuk edit data user -----------------------------*/}
      <IUserEditModal modalOpen={modalOpen} modalClose={handleModalClose} data={rowToEdit}/>        

      {/* --------------------------------------Popover untuk delete data -----------------------------*/}
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
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => {handleDelete(rowToEdit?.id)}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }}  />
          Delete
        </MenuItem>
      </Popover>

      {/* --------------------- snackbar untuk show notification di kanan atas ----------------- */}
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
  );
}

