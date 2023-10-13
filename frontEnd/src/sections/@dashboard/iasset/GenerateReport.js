import {useState, useEffect} from 'react';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton, Divider} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '@emotion/react';
import Iconify from "../../../components/iconify";
// ----------------------------------------------------------------------

const date = new Date();
const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
const changeIcon =[
    {type:"plus", icon:"solar:double-alt-arrow-up-bold-duotone", color:'rgb(0, 167, 111)'},
    {type:"minus", icon:"solar:double-alt-arrow-down-bold-duotone", color:'#FF4842'},
    {type:"edit", icon:"solar:double-alt-arrow-right-bold-duotone", color:'#FFC107'},
];
const assetData =[
    {number:10, text:'Penambahan PC SPAN, Laptop'},
    {number:20, text:'Penghapusan Access Point, Laptop, Genset, Printer'},
    {number:12, text:'Edit data Laptop, Printer'},
];
const userData=[
    {number:2, text:'Penambahan User SPAN'},
    {number:5, text:'Penambahan User SAKTI, User Sprint'},
    {number:7, text:'Edit data User PIC TIK'},
];

const GenerateReport = () => {
    const theme = useTheme();
    return(
        <>
        <Card sx={{height:'100%', width:'100%'}}>
            <CardHeader title={'Generate Report'} subheader={'Summary'}sx={{textAlign:'center'}} />
            <Typography sx={{textAlign:'center'}} color='textSecondary' variant='body2'>01/07/2023 - {currentDate}</Typography>

            <Box sx={{ p: 3, pb: 1 }} dir="ltr">

                <Stack spacing={1} sx={{mb:2}}>
                    <Stack direction="row" sx={{alignItems:'center'}} spacing={1}>
                        <Iconify icon="solar:laptop-bold-duotone" color={theme.palette.primary.main}/>
                        <Typography variant="h6">Asset</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Stack direction="column" sx={{pl:3}} spacing={1}>
                            {assetData.map((item, index) => {
                                    return(
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Iconify icon={changeIcon[index].icon} color={changeIcon[index].color}/>
                                            <Typography variant="body2">{item.number}</Typography>
                                        </Stack> 
                                    )}
                            )}
                        </Stack>
                        <Stack direction="column" sx={{pl:3}} spacing={1}>
                            {assetData.map((item) => {
                                return(
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography variant="body2" color='textSecondary'> {item.text}</Typography>
                                    </Stack>  
                                )}
                            )}
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing={1} sx={{mb:2}}>
                    <Stack direction="row" sx={{alignItems:'center'}} spacing={1}>
                        <Iconify icon="solar:user-hands-bold-duotone" color={theme.palette.primary.main}/>
                        <Typography variant="h6">User</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Stack direction="column" sx={{pl:3}} spacing={1}>
                            {userData.map((item, index) => {
                                return(
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Iconify icon={changeIcon[index].icon} color={changeIcon[index].color}/>
                                        <Typography variant="body2">{item.number}</Typography>
                                    </Stack> 
                                )}
                            )}
                        </Stack>
                        <Stack direction="column" sx={{pl:4}} spacing={1}>
                            {userData.map((item) => {
                                return(
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography variant="body2" color='textSecondary'>{item.text}</Typography>
                                    </Stack>  
                                )}
                            )}
                        </Stack>
                    </Stack>
                </Stack>

                <Divider sx={{mt:8, mb:2}}/>
                
                <Stack direction="row" sx={{alignItems:'center', justifyContent:'space-around'}} spacing={1}>
                    <Button size="large" variant="outlined" sx={localStorage.getItem('mode')==='dark'?{color:'#fff'}:null} endIcon={ <Iconify icon="vscode-icons:file-type-pdf2" color='#FF4842'/>}>
                        Generate
                    </Button>
                    <Button size="large" variant="outlined"  sx={localStorage.getItem('mode')==='dark'?{color:'#fff'}:null} endIcon={ <Iconify icon="vscode-icons:file-type-excel" color='#FF4842'/>}>
                        Generate
                    </Button>
                </Stack>
            </Box>
        </Card>
      </>
    )
}


export default GenerateReport;