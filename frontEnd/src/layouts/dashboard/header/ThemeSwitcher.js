import {useState, useEffect, useContext} from "react";
import {styled} from "@mui/material/styles";
import {Switch, Button, IconButton, Badge, Chip, Fab} from "@mui/material";
import useMode, {ModeContext} from "../../../hooks/display/useMode";
import Iconify from '../../../components/iconify';

// value dari useMode hook ada di ../theme/index.js

const ThemeSwitcher = () => {
const {mode, setMode} = useMode();
const handleClick = () => {
    setMode((prev) => (
    prev==='dark'?'light':'dark'
    ));
    localStorage.setItem('mode', mode)
};


    return(
    <div>
    <IconButton onClick={handleClick} variant='contained' size='large' sx={{mr:1}}>
        <Iconify icon={localStorage.getItem('mode')==='dark'?"tdesign:mode-dark":"material-symbols:light-mode"}sx={{color:'orange'}} />    
    </IconButton>
    </div>
    )
}

export default ThemeSwitcher;