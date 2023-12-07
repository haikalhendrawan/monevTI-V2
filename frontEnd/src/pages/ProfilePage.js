import {useState, useEffect} from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, Button, TextField, Tabs, Tab, Stack} from "@mui/material";
import {useTheme, alpha} from "@mui/material/styles";
import Label from "../components/label/Label";
import Iconify from "../components/iconify/Iconify";
import DataAkun from "../sections/@dashboard/profile/DataAkun";
import ChangePassword from "../sections/@dashboard/profile/ChangePassword";
import DataPIC from "../sections/@dashboard/profile/DataPIC";


// -------------------------------------------------------------------
const infoRows = [
    {col1:"Username", col2: ':', col3:<TextField size="small" />},
    {col1:"Name", col2: ':', col3:<TextField size="small" />},
    {col1:"Email", col2: ':', col3:<TextField size="small" />},
    {col1:"Role", col2: ':', col3:<TextField size="small" />},
  ];

const selectSection = {
    0:<DataAkun />,
    1:<ChangePassword />,
    2:<DataPIC />
}

// --------------------------------------------------------------------------


export default function ProfilePage(){
    const theme = useTheme();

    const [tabValue, setTabValue] = useState(0); // ganti menu jenis perangkat yang ditampilkan

    const handleTabChange = (event, newValue) => { // setiap tab jenis asset berubah
      setTabValue(newValue);
    };

    return(
        <>
         <Card sx={{width:'70%', mx:'auto', backgroundColor:alpha(theme.palette.primary.main, 0.24)}}>
            <CardHeader title={"Profile Page"} sx={{textAlign:'center'}} />
            <CardContent sx={{fontSize:14}}>
                <Avatar alt="ABC" src="/assets/sd8.png" sx={{width:'20%', height:'20%', mx:'auto'}} />
                <Stack direction="row" alignItems="center" justifyContent="center" mb={0}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab icon={<Iconify icon="icon-park-outline:network-tree" />} label="1. Data Akun" value={0} iconPosition="start"/>
                        <Tab icon={<Iconify icon="wpf:key-security" />} label="2. Change Password" value={1} iconPosition="start"/>
                        <Tab icon={<Iconify icon="wpf:key-security" />} label="3. Data PIC TIK" value={2} iconPosition="start"/>
                    </Tabs>
                </Stack>
            </CardContent>
        </Card>
       
        {selectSection[tabValue]}
        </>
    )


}