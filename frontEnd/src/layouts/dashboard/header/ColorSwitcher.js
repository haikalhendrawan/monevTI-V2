import {useState, useEffect, useContext} from "react";
import {styled, alpha} from "@mui/material/styles";
import {Switch, Button, IconButton, Stack, Popper, Paper, Fade, ClickAwayListener} from "@mui/material";
import useMode, {ModeContext} from "../../../hooks/display/useMode";
import Iconify from '../../../components/iconify';



const ColorSwitcher = () => {
    const {mode, setMode} = useMode();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setOpen(prev => !prev)
        setAnchorEl(event.currentTarget)
    };
        
    return(
    <div>
    <IconButton variant='contained' size='large' sx={{mr:1}} onClick={handleClick}>
        <Iconify icon={"mdi:palette"} />    
    </IconButton>
    <Popper open={open} anchorEl={anchorEl} placement={'bottom'} transition sx={{ zIndex: 1102}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{boxShadow:"0px 5px 5px -3px rgba(145, 158, 171, 0.2), 0px 8px 10px 1px rgba(145, 158, 171, 0.14), 0px 3px 14px 2px rgba(145, 158, 171, 0.12)"}}>
            <ClickAwayListener>
            <div>
                <Stack direction="row" spacing={2}>
                    <IconButton><Iconify icon={"carbon:dot-mark"} sx={{color:'#2065d1'}} /></IconButton>
                    <IconButton><Iconify icon={"carbon:dot-mark"} sx={{color:'rgb(0, 167, 111)'}} /></IconButton>
                    <IconButton><Iconify icon={"carbon:dot-mark"} sx={{color:'#9c27b0'}} /></IconButton>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <IconButton><Iconify icon={"carbon:dot-mark"} sx={{color:'#4caf50'}} /></IconButton>
                    <IconButton><Iconify icon={"carbon:dot-mark"} sx={{color:'#ffeb3b'}} /></IconButton>
                    <IconButton><Iconify icon={"bx:reset"} /></IconButton>
                </Stack>
            </div>
            </ClickAwayListener>
            </Paper>
          </Fade>
        )}
    </Popper>
    </div>
    )
}

export default ColorSwitcher;