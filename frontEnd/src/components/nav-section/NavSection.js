import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, ListSubheader, Button} from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
  header:PropTypes.string
};

export default function NavSection({ data = [], ...other}) {
  return (
    <Box {...other}>
      <List 
        disablePadding sx={{ p: 1 }}
        subheader={other.header?
        <ListSubheader component='a' sx={{fontSize: '12px', color:'rgb(99, 115, 129)', backgroundColor:'transparent'}}>
          {other.header}
        </ListSubheader>:null
        }
      >
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'rgb(118, 176, 241)',
          bgcolor: 'rgba(32, 101, 209, 0.08)',
          fontWeight: 600,
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
