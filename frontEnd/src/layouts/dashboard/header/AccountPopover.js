import { useState, useEffect } from 'react';
import axios from "axios";
import {NavLink, Link} from "react-router-dom"
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, Select, 
        IconButton, Popover, Menu, ListItemText, ListItem, List } from '@mui/material';
import Iconify from '../../../components/iconify';
// hooks and other stuff
import {useAuth} from "../../../hooks/useAuth";
import useAxiosJWT from "../../../hooks/useAxiosJWT";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    link : '/profile',
    component:NavLink
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
  {
    label: 'Smt 1 2023',
    icon: 'mdi:calendar',
    link: '',
    component:null
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const {auth, setAuth } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null); 
  const openPeriod = Boolean(anchorEl); 

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOpenPeriod = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(openPeriod)
  }

  const logout = async () => {
    setAuth(null);
    try {
      const response = await axios.delete("/logout", { withCredentials: true });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };


// -----------------------------------------------------------------------------------------------
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={auth?.image} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {auth?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {auth?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} component={option.component} to={option.link} onClick={handleClose}>
              <Iconify icon={option.icon} sx={{mr:1}} />
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>{option.label}</Typography>
            </MenuItem>
          ))}

            {/* <Menu anchorEl={anchorEl} open={openPeriod} onClose={()=>{setAnchorEl(null)}}>
              <MenuItem key={1}>
                <Typography variant='body2' >Smt 1 2023</Typography>
              </MenuItem>
              <MenuItem key={2}>
                <Typography variant='body2' >Smt 2 2023</Typography>
              </MenuItem>
            </Menu> */}
            
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          <Iconify icon={'material-symbols:logout'} sx={{mr:1, color:'red'}}/> 
          Logout
        </MenuItem>
      </Popover>

    </>
  );
}
