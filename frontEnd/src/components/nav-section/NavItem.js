import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, ListSubheader, Button} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

NavItem.propTypes = {
  item: PropTypes.object,
};

export default function NavItem({ item }) {
  const { title, path, icon, info } = item;
  const theme = useTheme();

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      target={info}
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

    </StyledNavItem>
  );
}
