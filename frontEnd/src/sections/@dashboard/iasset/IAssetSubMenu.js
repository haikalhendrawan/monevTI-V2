import {useState, useEffect} from 'react';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton, Tooltip, Link} from '@mui/material';
import { useTheme } from '@mui/material/styles'; 
import Iconify from '../../../components/iconify';

const IAssetSubMenu = (props) => {
    const theme = useTheme();
    return (
        <> 
        <Card>
            
            <Grid container spacing={0}>

                <Grid item xs={6}>
                    <CardHeader title={props.title}  /> 

                    <Box sx={{ p: 3, pb: 2 }} dir="ltr">
                        <Typography variant='body2'>{props.subheader}</Typography>
                        <Grid container direction="row" sx={{ mt:12, justifyContent: 'space-between' }}>
                            <Button 
                            variant='contained' 
                            onClick={() => {props.function(props.open)}}
                            >{/* props.open={1:generate report, 2:Perangkat TIK, 3:User TIK} */}
                                Edit
                            </Button> 
                            <Tooltip title="Last update: 12/06/2023">
                                <IconButton disableRipple><Iconify icon={"icons8:checked"} sx={{color:'rgb(0, 167, 111)', borderRadius:'50%',}} /></IconButton>
                            </Tooltip> 
                        </Grid>                      
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box sx={{ overflow:'hidden', p: 1, pt: 2, display:'inline-block', height:'100%', background:'cover'}} >
                        <img src="https://www.minimaldesksetups.com/wp-content/uploads/2020/10/06-u-xramzal.jpg.webp" style={{borderRadius:'12px', height:'100%'}} alt="tes"/>
                    </Box>
                </Grid>

            </Grid>
        </Card>
        </>
    )
}

export default IAssetSubMenu;