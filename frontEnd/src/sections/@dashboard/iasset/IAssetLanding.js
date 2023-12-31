import {useState, useEffect} from 'react';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton, Link} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import {useAuth} from '../../../hooks/useAuth';
import useAsset from './useAsset';
import useIUser from './useIUser';
// component
import Iconify from "../../../components/iconify";
import GenerateReport from './landing/GenerateReport';
import IAssetSubMenu from './landing/IAssetSubMenu';
import PreviewPDFModal from './landing/PreviewPDFModal';

// ----------------------------------------------------------------------
const selectKPPN = {
    0:'Kanwil DJPb Prov Sumatera Barat',
    1:'KPPN Padang',
    2:'KPPN Bukittinggi',
    3:'KPPN Solok',
    4:'KPPN Lubuk Sikaping',
    5:'KPPN Sijunjung',
    6:'KPPN Painan'
  };

const IAssetLanding = (props) => {
    const {auth, setAuth} = useAuth();
    const {ASSET, setASSET, getIAsset} = useAsset();
    const {IUSER, setIUSER, getIUser} = useIUser();
    const [open, setOpen] = useState(false);
    const handlePreviewPDF = () => {
      setOpen(true)
    };
    const handleClose = () => {
      setOpen(false);
    };
    const latestAsset = findLatestUpdatedDate(ASSET);
    const latestUser = findLatestUpdatedDate(IUSER);
  
    return(
        <>
        <Container maxWidth="xl">
            <Stack direction="row" spacing={2}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Data TIK 
                </Typography>
            </Stack>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <Grid item xs={12}>
                        <Stack spacing={2}>
                            <IAssetSubMenu 
                                changeSection={props.changeSection} 
                                title={'Asset'} 
                                subheader={`Data perangkat TIK pada ${selectKPPN[auth.kppn]}`}
                                image={"assets/Security_11zon.png"}
                                open = {2}  // display {1:generate report, 2:Perangkat TIK, 3:User TIK}
                                lastUpdate={latestAsset}
                            />
                            <IAssetSubMenu 
                                changeSection={props.changeSection} 
                                title={'User'} 
                                subheader={`Data pengguna aplikasi pada ${selectKPPN[auth.kppn]}`}
                                image={"assets/Payment_11zon.png"}
                                open = {3}
                                lastUpdate={latestUser}
                            />

                        </Stack>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>    
                    <GenerateReport auth={auth} asset={ASSET} user={IUSER} modalOpen={handlePreviewPDF}/>
                </Grid>

            </Grid>
      </Container>

      <PreviewPDFModal modalOpen={open} modalClose={handleClose} auth={auth&&auth} asset={ASSET&&ASSET} user={IUSER&&IUSER}/>
      </>
    )
}


export default IAssetLanding;

// --------------------------------------------
function findLatestUpdatedDate(array) {
    if (!Array.isArray(array) || array.length === 0) {
      return null; 
    }
  
    const latestObject = array.reduce((latestObject, currentObject) => {
      const latestDate = new Date(latestObject.date_created);
      const currentDate = new Date(currentObject.date_created);
  
      
      return currentDate > latestDate ? currentObject : latestObject;
    });
  
    const latestDate = new Date(latestObject.date_created);
    const formattedDate = `${latestDate.getDate()}/${latestDate.getMonth() + 1}/${latestDate.getFullYear()}`;
  
    return formattedDate;
  }