import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
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

IAsset2Toolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

// -------------------------------------------------------------
const selectItem = [
  {jenis:'Printer', icon:'solar:printer-bold-duotone', value:10}, 
  {jenis:'Scanner', icon:'solar:scanner-bold-duotone', value:20}, 
  {jenis:'UPS', icon:'solar:washing-machine-bold-duotone', value:30}, 
  {jenis:'Genset', icon:'solar:electric-refueling-bold-duotone', value:40}, 
  {jenis:'Router', icon:'solar:wi-fi-router-bold-duotone', value:50}, 
  {jenis:'Switch', icon:'solar:structure-broken', value:60}, 
  {jenis:'Tablet', icon:'solar:smartphone-2-bold-duotone', value:70}
]

// -------------------------------------------------------------------

export default function IAsset2Toolbar({ numSelected, filterName, onFilterName}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('')

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  const handleChange = (event) => {
    setValue(event.target.value);
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
            <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Perangkat</InputLabel>
            <Select 
              labelId="demo-simple-select-label" 
              id="demo-simple-select" 
              value={value} 
              sx={{width:'140px', typography:'body2'}} 
              label="Perangkat" 
              onChange={handleChange}
              >
                <MenuItem sx={{typography:'body2'}} value="">All</MenuItem>
                {selectItem.map((item) => {
                  return(<MenuItem sx={{typography:'body2'}} value={item.value}><Stack direction="row">{item.jenis} <Iconify sx={{ ml:1}} icon={item.icon} /></Stack></MenuItem>)
                })}
            </Select>
          </FormControl>
      )} 
        </div>
      

      
    </StyledRoot>
  );
}
