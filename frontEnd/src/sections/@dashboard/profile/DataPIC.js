import {useState, useEffect} from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, Button, TextField, Tabs, Tab, Stack} from "@mui/material";
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
// ---------------------------------------
const infoRows = [
  {col1:"Nama PIC TIK", col2: ':', col3:<TextField size="small"/>},
  {col1:"NIP", col2: ':', col3:<TextField size="small" />},
  {col1:"Email", col2: ':', col3:<TextField size="small" />},
];


export default function DataPIC () {
  return(
    <Card sx={{width:'70%', mx:'auto', mt:2}}>
    <CardContent sx={{fontSize:14}}>
        <Grid container spacing={2}>
            {infoRows.map((row, index) => {
                return(
                <Grid item container spacing={2} key={index}>
                    <Grid item sm={4}>
                    {row.col1}
                    </Grid>

                    <Grid item sm={1}>
                    {row.col2}
                    </Grid>

                    <Grid item sm={7}>
                    {row.col3}
                    </Grid>
                </Grid>
                )
                })
            } 
            <Grid container spacing={2} sx={{mt:7, justifyContent:'center'}}>
              <Button size="large" variant="contained" color="warning" endIcon={ <Iconify icon="eva:edit-fill" />}>
                  Update
              </Button>
            </Grid>    
        </Grid>
    </CardContent>
  </Card>
  )
}