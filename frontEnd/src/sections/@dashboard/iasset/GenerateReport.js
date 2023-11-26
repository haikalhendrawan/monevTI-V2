import {useState, useEffect} from 'react';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton, Divider} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '@emotion/react';
import Iconify from "../../../components/iconify";
// PDF File
import MyDocument from '../../../pages/MyDocument';
// Context Provider
import { AssetProvider } from './useAsset';
import { IUserProvider } from './useIUser';
// ----------------------------------------------------------------------

const date = new Date();
const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
const changeIcon =[
    {type:"plus", icon:"mingcute:trending-up-fill", color:'rgb(0, 167, 111)'},
    {type:"minus", icon:"mingcute:trending-down-fill", color:'#FF4842'},
    {type:"edit", icon:"mingcute:arrow-right-fill", color:'#FFC107'},
];
const assetData =[
    {number:10, text:'Penambahan PC SPAN, Laptop'},
    {number:20, text:'Penghapusan Access Point, Laptop, Genset'},
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
                    <Grid container spacing={1}>
                        {assetData.map((item, index) => {
                            return(
                                <Grid container item spacing={10} key={index} >
                                    <Grid item xs={9}>
                                        <Typography variant="body2" color='textSecondary' sx={{ whiteSpace: 'nowrap', overflow: 'hidden',textOverflow: 'ellipsis',maxWidth: '100%', ml:2  }}> {item.text}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Stack direction='row' spacing={1}>
                                            <Iconify icon={changeIcon[index].icon} color={changeIcon[index].color}/>
                                            <Typography variant="body2">{item.number}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>  
                            )}
                        )}
                    </Grid>
                </Stack>

                <Stack spacing={1} sx={{mb:2}}>
                    <Stack direction="row" sx={{alignItems:'center'}} spacing={1}>
                        <Iconify icon="solar:user-hands-bold-duotone" color={theme.palette.primary.main}/>
                        <Typography variant="h6">User</Typography>
                    </Stack>
                    <Grid container spacing={1}>
                        {userData.map((item, index) => {
                            return(
                                <Grid container item spacing={10} key={index} >
                                    <Grid item xs={9}>
                                        <Typography variant="body2" color='textSecondary' sx={{ whiteSpace: 'nowrap', overflow: 'hidden',textOverflow: 'ellipsis',maxWidth: '100%', ml:2  }}> {item.text}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Stack direction='row'spacing={1}>
                                            <Iconify icon={changeIcon[index].icon} color={changeIcon[index].color}/>
                                            <Typography variant="body2">{item.number}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>  
                            )}
                        )}
                    </Grid>
                </Stack>

                <Divider sx={{mt:8, mb:2}}/>
                
                <Stack direction="row" sx={{alignItems:'center', justifyContent:'space-around', mt:4}} spacing={1}>
                    <PDFDownloadLink 
                        document={<MyDocument />} 
                        filename="my_document">
                        <Button size="large" variant="outlined" sx={localStorage.getItem('mode')==='dark'?{color:'#fff'}:null} endIcon={ <Iconify icon="vscode-icons:file-type-pdf2" color='#FF4842'/>}>
                            Generate
                        </Button>
                    </PDFDownloadLink>
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