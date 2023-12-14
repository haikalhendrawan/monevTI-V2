import {useState, useEffect} from 'react';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button,  Grid, Container, Typography, Link,  Divider} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '@emotion/react';
import Label from "../../../../components/label";
// hooks
import useAsset from '../useAsset';
import useIUser from '../useIUser';
import Iconify from "../../../../components/iconify";
// PDF File
import GeneratePDFPage from '../../../../pages/GeneratePDFPage';

// ----------------------------------------------------------------------

const date = new Date();
const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;


// --------------------------------------------------------------------------
function GenerateReport (props) {
    const theme = useTheme();
    const {ASSET, setASSET, getIAsset} = useAsset(); // hook mendapatkan data iasset
    const {IUSER, setIUSER, getIUser} = useIUser(); // hook mendapatkan data iuser

    
    const asetBaik = ASSET?.filter((item) => {return item.kondisi===0});
    const asetRusakRingan = ASSET?.filter((item) => {return item.kondisi===1});
    const asetRusakBerat = ASSET?.filter((item) => {return item.kondisi===2});
    const userSAKTI = IUSER?.filter((item) => {return item.app===0});
    const userSPAN = IUSER?.filter((item) => {return item.app===1});
    const userLainnya = IUSER?.filter((item) => {return item.app===2});

    const assetData =[
        {number:asetBaik?.length, text:'Perangkat dengan kondisi baik', color:'success'},
        {number:asetRusakRingan?.length, text:'Perangkat dengan kondisi rusak ringan', color:'error'},
        {number:asetRusakBerat?.length, text:'Perangkat dengan kondisi rusak berat', color:'warning'},
    ];
    const userData=[
        {number:userSAKTI?.length, text:'Jumlah user aplikasi SAKTI ', color:'success'},
        {number:userSPAN?.length, text:'Jumlah user aplikasi SPAN', color:'error'},
        {number:userLainnya?.length, text:'Jumlah user aplikasi Lainnya', color:'warning'},
    ];

    return(
        <>
        <Card sx={{height:'100%', width:'100%'}}>
            <CardHeader title={'Data Report'} subheader={'Summary'} sx={{textAlign:'center'}} />
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
                                            <Label color={item.color} sx={{width:'100%'}}>{item.number}</Label>
                                        </Stack>
                                    </Grid>
                                </Grid>  
                            )}
                        )}
                    </Grid>
                </Stack>

                <Stack spacing={1} sx={{mb:2,}}>
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
                                        <Label color={item.color} sx={{width:'100%'}}>{item.number}</Label>
                                        </Stack>
                                    </Grid>
                                </Grid>  
                            )}
                        )}
                    </Grid>
                </Stack>
  
                <Stack direction="row" sx={{alignItems:'center', justifyContent:'space-between', mt:10, mr:0, ml:3}} spacing={1}>
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