import {useState, useEffect} from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, Button, TextField, Tabs, Tab, Stack} from "@mui/material";
import Label from "../components/label/Label";
import Iconify from "../components/iconify/Iconify";


// -------------------------------------------------------------------
const infoRows = [
    {col1:"Username", col2: ':', col3:<TextField size="small" />},
    {col1:"Nama", col2: ':', col3:<TextField size="small" />},
    {col1:"Email", col2: ':', col3:<TextField size="small" />},
    {col1:"Role", col2: ':', col3:<TextField size="small" />},
  ];

// --------------------------------------------------------------------------


export default function ProfilePage(){
    const [tabValue, setTabValue] = useState(0); // ganti menu jenis perangkat yang ditampilkan

    const handleTabChange = (event, newValue) => { // setiap tab jenis asset berubah
      setTabValue(newValue);
    };

    return(
        <>
         <Card sx={{width:'70%', mx:'auto'}}>
            <CardHeader title={"Profile Page"} sx={{textAlign:'center'}}/>
            <CardContent sx={{fontSize:14, backgroundImage:"/assets/sd8.png"}}>
                <Avatar alt="ABC" src="/assets/sd8.png" sx={{width:'20%', height:'20%', mx:'auto'}} />
                <Stack direction="row" alignItems="center" justifyContent="center " mb={0}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab icon={<Iconify icon="icon-park-outline:network-tree" />} label="1. Profile Data" value={0} iconPosition="start"/>
                        <Tab icon={<Iconify icon="wpf:key-security" />} label="2. Change Password" value={1} iconPosition="start"/>
                        <Tab icon={<Iconify icon="wpf:key-security" />} label="2. Data PIC TIK" value={2} iconPosition="start"/>
                    </Tabs>
                </Stack>
            </CardContent>
        </Card>
        <Card sx={{width:'70%', mx:'auto', mt:2}}>
            <CardContent sx={{fontSize:14}}>
                <Grid container spacing={2}>
                    {infoRows.map((row, index) => {
                        return(
                        <Grid item container spacing={2} key={index}>
                            <Grid item sm={4}>
                            {row.col1}
                            </Grid>

                            <Grid item sm={1}>
                            {row.col2}
                            </Grid>

                            <Grid item sm={7}>
                            {row.col3}
                            </Grid>
                        </Grid>
                        )
                        })
                    } 
                    <Grid container spacing={2} sx={{mt:7, justifyContent:'end'}}>
                    {/* <Button size="large" variant="outlined" sx={localStorage.getItem('mode')==='dark'?{color:'#fff', mr:2}:{mr:2}} endIcon={ <Iconify icon="vscode-icons:file-type-pdf2"/>}>
                        Preview 
                    </Button>
                    <Button size="large" variant="outlined" sx={localStorage.getItem('mode')==='dark'?{color:'#fff'}:null} endIcon={ <Iconify icon="solar:download-square-bold" sx={{color:localStorage.getItem('mode')==='light'?theme.palette.primary.main:theme.palette.primary.light}} />}>
                        Generate
                    </Button> */}
                    <Button size="large" variant="contained" endIcon={ <Iconify icon="material-symbols:send" />}>
                        Send
                    </Button>
                    </Grid>    
                </Grid>
            </CardContent>
        </Card>
        </>
    )


}