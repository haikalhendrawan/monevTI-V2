import {useState, useEffect} from 'react';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton, Link} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const GenerateReport = () => {
    return(
        <>
        <Card sx={{height:'100%', width:'100%'}}>
            <CardHeader title={'Generate Report'}  />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            Summary
            </Box>
        </Card>
      </>
    )
}


export default GenerateReport;