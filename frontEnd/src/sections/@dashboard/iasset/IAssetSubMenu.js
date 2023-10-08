import {useState, useEffect} from 'react';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton, Link} from '@mui/material';
import { useTheme } from '@mui/material/styles'; 

const IAssetSubMenu = (props) => {
    
    return (
        <> 
        <Card>
            <CardHeader title={props.title} subheader={props.subheader} />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <Button 
                variant='contained' 
                onClick={() => {props.function(props.open)}}>{/* props.open={1:generate report, 2:Perangkat TIK, 3:User TIK} */}
                Edit
                </Button>  
            </Box>
        </Card>
        </>
    )
}

export default IAssetSubMenu;