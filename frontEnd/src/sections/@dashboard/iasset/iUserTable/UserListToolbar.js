import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
// component
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

// -------------------------------------------------------------
const selectItem = [
  {jenis:'Pernah', value:0, color:'success'},
  {jenis:'Belum', value:1, color:'error'},
]

// -------------------------------------------------------------------

export default function UserListToolbar({ numSelected, filterName, onFilterName, onFilterPelatihan}) {
  const [open, setOpen] = useState(false); // open dan close filter icon
  const [value, setValue] = useState(''); // value dari searchbar
  const theme = useTheme();

  const handleClick = () => {
    setOpen(prev => !prev);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    onFilterPelatihan(event.target.value);
  };

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >

      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Search user..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

        <div>
        <Tooltip title="Filter list">
          <IconButton onClick={handleClick}>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      {open && (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Pelatihan</InputLabel>
            <Select 
              labelId="simple-select-label" 
              id="simple-select" 
              value={value} 
              sx={{width:'140px', typography:'body2'}} 
              label="Kondisi" 
              onChange={handleChange}
              >
                <MenuItem sx={{typography:'body2'}} value={2}>All</MenuItem>
                {selectItem.map((item, index) => {
                  return(<MenuItem key={index} sx={{typography:'body2', color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                })}
            </Select>
          </FormControl>
      )} 
        </div>
      

      
    </StyledRoot>
  );
}
