import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Card, Table, Stack, Paper, Avatar, Button, Popover, TableRow, MenuItem, TableBody, TableCell, Container, Typography, IconButton, TableContainer, TablePagination, Tabs, Tab} from '@mui/material';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { IAsset2Head, IAsset2Toolbar } from './iAssetTable2';



// ------ data from backEnd

const OTHERASSET = [
  {id: 1, jenis_perangkat: 'Printer', model:'HP M401', tahun: '2022', kondisi:1, keterangan:'dipakai kepala kantor', last_update:'1/10/2023',alignRight: false},
  {id: 2, jenis_perangkat: 'Printer', model:'HP M202', tahun: '2023', kondisi:2, keterangan:null, last_update:'1/10/2023',alignRight: false}
]

const ASSET = [
  {id: 1, jenis_perangkat: 'Laptop', hostname:'KBN0300G307', nama_pegawai:'andi', model:'Acer P214', tahun: '2022', kondisi:1, cpu: 'Intel Core i5', ip:'25', ram:'8Gb', storage:'250 Gb', serial_number:'waqewqe', keterangan:'dipakai kepala kantor', last_update:'1/10/2023',alignRight: false},
  {id: 2, jenis_perangkat: 'Komputerrr', hostname:'KBN0300G307', nama_pegawai:'andi', model:'Acer P214', tahun: '2022', kondisi:1, cpu: 'Intel Core i5', ip:'25', ram:'8Gb', storage:'250 Gb', serial_number:'waqewqe', keterangan:'dipakai kepala kantor', last_update:'1/10/2023',alignRight: false}
]

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'id', label: 'No', alignRight: false },
  { id: 'jenis_perangkat', label: 'Jenis Perangkat', alignRight: false },
  { id: 'model', label: 'Merk/Model', alignRight: false },
  { id: 'tahun', label: 'Tahun', alignRight: false },
  { id: 'kondisi', label: 'Kondisi', alignRight: false },
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
  { id: 'sserial_number', label: 'Serial Number', alignRight: false },
  { id: 'catatan', label: 'Catatan', alignRight: false },
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    return array.filter((perangkat) => {
      return Object.values(perangkat).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }

  return stabilizedThis.map((el) => el[0]);
}


// ----------------------------------------------------------------------

export default function AssetTikTable2(props) {
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('no');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - OTHERASSET.length) : 0;

  const filteredUsers = applySortFilter(props.isComputer?ASSET:OTHERASSET, getComparator(order, orderBy), filterName);

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
                  rowCount={OTHERASSET.length}
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
                              {row.jenis_perangkat}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{row.hostname}</TableCell>
                        {props.isComputer?(<TableCell align="left">{row.nama_pegawai}</TableCell>):null}

                        <TableCell align="left">{row.tahun}</TableCell>

                        <TableCell align="left">{row.alignRight ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={ 'success'}>{sentenceCase(row.jenis_perangkat)}</Label>
                        </TableCell>

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
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
            count={OTHERASSET.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        
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
            <MenuItem>
                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                Edit
            </MenuItem>

            <MenuItem sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Delete
            </MenuItem>
        </Popover>

    </>
  );
}

