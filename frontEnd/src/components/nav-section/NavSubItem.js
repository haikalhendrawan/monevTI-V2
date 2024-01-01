import {useEffect, useState} from "react"
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, ListSubheader, Button} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
//
import { StyledNavItem, StyledSubNavItemIcon  } from './styles';

NavSubItem.propTypes = {
  item: PropTypes.object,
};

export default function NavSubItem({ item, open }) {
  const { title, path, icon, info } = item;
  const theme = useTheme();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(location.pathname.includes(path));
  }, [location.pathname, path]);

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      target={info}
      sx={
        localStorage.getItem('mode')==='dark'?
        {
        '&.active': {
          color: theme.palette.common.white,
          fontWeight: 600,
         },
        }:
        {
        '&.active': {
          color: theme.palette.text.primary,
          fontWeight: 600,
         },
        }
      }
    >

      <StyledSubNavItemIcon sx={{ml:1}}>{isActive?icon:null}</StyledSubNavItemIcon>

      <ListItemText disableTypography primary={title}  />

    </StyledNavItem>
  );
}
