import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {Card, Table, Stack, Paper, Avatar, Button, Popover, Checkbox, TableRow, MenuItem, TableBody, TableCell,
    Container, Typography, IconButton, TableContainer, TablePagination} from '@mui/material';
// hooks
import useAxiosJWT from "../../../hooks/useAxiosJWT";
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../user';
import LogBookTableHead from './LogBookTableHead';
import LogBookTableToolbar from './LogBookTableToolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'No', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'user', label: 'Nama', alignRight: false },
  { id: 'hostname', label: 'Hostname', alignRight: false },
  { id: 'event', label: 'Kendala', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'clearance', label: 'Penyelesaian', alignRight: false },
  { id: '' },
];

const selectTahun = {
  0:2022,
  1:2023,
  2:2024,
  3:2025,
  4:2026
}

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query, tahun, triwulan, status) {
  const triwulanCategory = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9],
    4: [10, 11, 12],
  };

  const filteredData = array.filter((item) => {
    const date = new Date(Date.parse(item.date));
    const yearMatches = !tahun || date.getFullYear() === tahun;
    const monthMatches = !triwulan || triwulanCategory[triwulan].includes(date.getMonth() + 1);
    const queryMatches =
      !query ||
      Object.values(item).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())
      );
    const statusMatches = status===null || item.status === status;

    return yearMatches && monthMatches && queryMatches && statusMatches;
  });

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => comparator(a[0], b[0]));

  return stabilizedThis
    .filter((el) => filteredData.includes(el[0]))
    .map((el) => el[0]);
} 


export default function LogBookTable(props) {
  
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('no');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [filterStatus, setFilterStatus] = useState(null);

  const [selectedRowId, setSelectedRowId] = useState(null);

  const logbook = props.logbook;

  const axiosJWT = useAxiosJWT();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterStatus = (event) => {
    event.stopPropagation();
    setFilterStatus(event.target.value);
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

  const handleDelete = async(id) => {
    try{
      const response = await axiosJWT.delete(`/deleteLogBook/${id}`);
      props.getData();
      setOpen(null);
      console.log(response.data);
    }catch(err){
      console.log(err);
    }
  }

  const handleUpdateStatus = async(id, status) => {
    try{
      const data = {
        status,
        id
      }
      const response = await axiosJWT.post(`/editLogBook`, {...data});
      props.getData();
      setOpen(null);
      console.log(response.data);
    }catch(err){
      console.log(err);
    }
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - logbook.length) : 0;

  const filteredLog = applySortFilter(logbook, getComparator(order, orderBy), filterName, selectTahun[props.tahun], props.triwulan, filterStatus);

  const isNotFound = !filteredLog.length && !!filterName;
  
  return (
    <>
      <Container>
        <Card>
          <LogBookTableToolbar  
            filterName={filterName} 
            onFilterName={handleFilterByName} 
            filterStatus = {filterStatus}
            onFilterStatus={handleFilterStatus} 
            />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <LogBookTableHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredLog.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { id, date, name, hostname, event, clearance, status } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{index+1}</TableCell>

                        <TableCell align="left">{new Intl.DateTimeFormat('en', {day: 'numeric',month: 'short',}).format(new Date(date))}</TableCell>

                        <TableCell align="left">{name}</TableCell>

                        <TableCell align="left">{hostname}</TableCell>

                        <TableCell align="justify">{event}</TableCell>

                        <TableCell align="left">
                          <Label 
                            color={status===0?'error':'success'} 
                            sx={{cursor:'pointer'}}
                            onClick={() => {handleUpdateStatus(id, !status?1:0)}}
                          >
                            {status===0?'Null':'Done'}
                          </Label>
                        </TableCell>

                        <TableCell align="justify">{clearance}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => {handleOpenMenu(event); setSelectedRowId(id)}}>
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
            count={logbook.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

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
        <MenuItem sx={{ color: 'error.main' }} onClick={() => {handleDelete(selectedRowId)}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
