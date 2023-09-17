import {useState, useEffect} from "react";
import {styled} from "@mui/material/styles";
import {Switch, Button, IconButton, Badge, Chip, Fab} from "@mui/material";
import Iconify from '../../../components/iconify';


const CurrentDate = () => {
    const today = new Date();
    const shortMonth= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Agt', 'Sept', 'Oct', 'Nov', 'Des'];
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    return(
    // <IconButton  sx={{ width: 40, height: 40 }} onClick={handleClick}>
    //     <Iconify icon={!open?"tdesign:mode-dark":"material-symbols:light-mode"} />    
    // </IconButton>
    <Fab variant="extended" color='primary'>
        <Iconify icon={"mdi:calendar"} sx={{ mr: 1 }} />
        {date} {shortMonth[month]} {year}
    </Fab>
    )
}


export default CurrentDate;
