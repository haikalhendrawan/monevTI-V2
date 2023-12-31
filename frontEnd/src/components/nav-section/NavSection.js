import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, ListSubheader, Button} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import NavItem from "./NavItem";

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

