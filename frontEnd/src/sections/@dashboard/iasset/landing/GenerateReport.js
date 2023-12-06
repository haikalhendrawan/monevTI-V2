import {useState, useEffect} from 'react';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button,  Grid, Container, Typography, Link,  Divider} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '@emotion/react';
// hooks
import useAsset from '../useAsset';
import useIUser from '../useIUser';
import Iconify from "../../../../components/iconify";
// PDF File
import GeneratePDFPage from '../../../../pages/GeneratePDFPage';

// ----------------------------------------------------------------------

const date = new Date();
const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
const growthIcon =[
    {type:"plus", icon:"solar:round-alt-arrow-up-broken", color:'rgb(0, 167, 111)'},
    {type:"minus", icon:"solar:round-alt-arrow-down-broken", color:'#FF4842'},
    {type:"edit", icon:"solar:round-alt-arrow-right-broken", color:'#FFC107'},
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

// --------------------------------------------------------------------------
function GenerateReport (props) {
    const theme = useTheme();
    const {ASSET, setASSET, getIAsset} = useAsset(); // hook mendapatkan data iasset
    const {IUSER, setIUSER, getIUser} = useIUser(); // hook mendapatkan data iuser

    return(
        <>
        <Card sx={{height:'100%', width:'100%'}}>
            <CardHeader title={'IT Data Report'} subheader={'Summary'}sx={{textAlign:'center'}} />
            <Typography sx={{textAlign:'center'}} color='textSecondary' variant='body2'>01/07/2023 - {currentDate}</Typography>
            <Divider sx={{mt:2, mb:1, width:'80%', mx:'auto'}}/>
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
                                            <Iconify icon={growthIcon[index].icon} color={growthIcon[index].color}/>
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
                        <Iconify icon="solar:user-bold-duotone" color={theme.palette.primary.main}/>
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
                                            <Iconify icon={growthIcon[index].icon} color={growthIcon[index].color}/>
                                            <Typography variant="body2">{item.number}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>  
                            )}
                        )}
                    </Grid>
                </Stack>
  
                <Stack direction="row" sx={{alignItems:'center', justifyContent:'end', mt:10, mr:3}} spacing={1}>
                    <Button size="large" variant="outlined" sx={localStorage.getItem('mode')==='dark'?{color:'#fff'}:null} endIcon={ <Iconify icon="vscode-icons:file-type-pdf2"/>} onClick={props.modalOpen}>
                        Preview
                    </Button>

                    <PDFDownloadLink document={<GeneratePDFPage word='ABC'/>} fileName={`dataTIK_${currentDate}.pdf`}>
                        <Button size="large" variant="outlined"  sx={localStorage.getItem('mode')==='dark'?{color:'#fff'}:null} endIcon={ <Iconify icon="solar:download-square-bold" sx={{color:localStorage.getItem('mode')==='light'?theme.palette.primary.main:theme.palette.primary.light}} />}>
                            Generate
                        </Button>
                    </PDFDownloadLink>
                </Stack>
            </Box>
        </Card>
      </>
    )
}


export default GenerateReport;