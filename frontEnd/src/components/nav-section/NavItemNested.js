import {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, ListSubheader, Button, Collapse, ListItemButton} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
//
import { StyledNavItem, StyledNavItemIcon, StyledNavItemNested } from './styles';
import NavItem from "./NavItem";
import NavSubItem from "./NavSubItem";
import Iconify from "../iconify/Iconify";
import SvgColor from "../svg-color/SvgColor";


NavItemNested.propTypes = {
  item: PropTypes.object,
};

export default function NavItemNested({ item, onClick, open, close }) {
  const { title, path, icon, info, menu } = item;
  const theme = useTheme();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => { 
    if (!isActive) {
      close(); 
    }
  }, [isActive]);

  useEffect(() => {
    setIsActive(location.pathname.includes(path));
  }, [location.pathname, path]);
  
  return (
    <>
    <StyledNavItemNested
      component={RouterLink}
      to={path}
      target={info}
      onClick={(event) => {
          onClick(event);
          setIsActive(true);
        }}
      sx={
        localStorage.getItem('mode')==='dark'?
        {
        '&.active': {
          color: theme.palette.primary.light,
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          fontWeight: 600,
         },
        }:
        {
        '&.active': {
          color: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          fontWeight: 600,
         },
        }
      }
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {open ? <Iconify icon={'solar:alt-arrow-up-linear'} sx={{mr:2}} />  : <Iconify icon={'solar:alt-arrow-down-linear'} sx={{mr:2}}/>}

    </StyledNavItemNested>

    {menu?.map((item) => (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavSubItem key={item.title} item={item} />
        </List>
      </Collapse>
    ))}
  </>
  );
}

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;