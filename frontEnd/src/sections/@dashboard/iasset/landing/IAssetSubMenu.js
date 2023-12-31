import {useState, useEffect} from 'react';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton, Tooltip, Link, Skeleton} from '@mui/material';
import { useTheme } from '@mui/material/styles'; 
// hooks
import {useAuth} from '../../../../hooks/useAuth';
// component
import Iconify from '../../../../components/iconify';

const IAssetSubMenu = (props) => {
    const theme = useTheme();
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false)
    //     },100)

    // })
    return (
        <> 
        <Card>
            <Grid container spacing={0}>
            
                <Grid item xs={6}>
                    <CardHeader title={props.title}  /> 
                    <Box sx={{ p: 3, pb: 2 }} dir="ltr">
                        <Typography variant='body2' color="textSecondary" sx={{textAlign:'justify'}}>{props.subheader}</Typography>
                        <Grid container direction="row" sx={{ mt:12, justifyContent: 'space-between' }}>
                            <Button 
                            variant='contained'
                            color='primary'
                            onClick={() => {props.changeSection(props.open)}}
                            >{/* props.open={1:generate report, 2:Perangkat TIK, 3:User TIK} */}
                                Edit
                            </Button> 
                            <Tooltip title={props.lastUpdate}>
                                {props?.lastUpdate?
                                <IconButton disableRipple><Iconify icon={"icons8:checked"} sx={{color:'rgb(0, 167, 111)', borderRadius:'50%',}} /></IconButton>
                                :<IconButton disableRipple sx={{display:'none'}}><Iconify icon={"icons8:checked"} sx={{color:'rgb(0, 167, 111)', borderRadius:'50%',}} /></IconButton>}
                            </Tooltip> 
                        </Grid>                      
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box sx={{ overflow:'hidden', p: 1, pt: 2, display:'inline-block', height:'100%', background:'cover'}}>
                        <img src={props.image} alt="tes" />
                        {/* <Skeleton variant='rounded' sx={{borderRadius:'12px'}} height={245} width={225}/> */}
                    </Box>
                </Grid>

            </Grid>
        </Card>
        </>
    )
}

export default IAssetSubMenu;