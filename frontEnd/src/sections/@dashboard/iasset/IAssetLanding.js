import {useState, useEffect} from 'react';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton, Link} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from "../../../components/iconify";
import GenerateReport from './GenerateReport';
import IAssetSubMenu from './IAssetSubMenu';

// ----------------------------------------------------------------------

const IAssetLanding = (props) => {

    return(
        <>
        <Container maxWidth="xl">
            <Stack direction="row" spacing={2}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Data TIK 
                </Typography>
            </ Stack>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <Grid item xs={12}>
                        <Stack spacing={2}>

                            <IAssetSubMenu 
                                function={props.function} 
                                title={'Asset'} 
                                subheader={'Data perangkat TIK pada KPPN Padang'}
                                open = {2}  // display {1:generate report, 2:Perangkat TIK, 3:User TIK}
                            />
                            <IAssetSubMenu 
                                function={props.function} 
                                title={'User'} 
                                subheader={'Data pengguna aplikasi pada KPPN Padang'}
                                open = {2}
                            />

                        </Stack>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    
                    <GenerateReport />

                </Grid>
            </Grid>
      </Container>
      </>
    )
}


export default IAssetLanding;