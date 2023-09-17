import {useState, useEffect, useContext} from "react";
import {styled} from "@mui/material/styles";
import {Switch, Button, IconButton, Badge, Chip, Fab} from "@mui/material";
import useMode, {ModeContext} from "../../../hooks/display/useMode";
import Iconify from '../../../components/iconify';


const ThemeSwitcher = () => {
const handleClick = () => {
    setMode((prev) => (
    prev==='dark'?'light':'dark'
    ));
};
const {mode, setMode} = useMode();
    
    return(
    <div>
    <IconButton variant='contained' size='large' sx={{mr:1}}>
        <Iconify icon={"mdi:palette"} />    
    </IconButton>
    <IconButton onClick={handleClick} variant='contained' size='large' sx={{mr:1}}>
        <Iconify icon={mode==='dark'?"tdesign:mode-dark":"material-symbols:light-mode"}sx={{color:'orange'}} />    
    </IconButton>
    </div>
    )
}

export default ThemeSwitcher;