import {useState} from "react";
import axios from "axios";
import { Container, Stack, Typography, Grid, Card, CardHeader, Button, Divider, Avatar, CardContent} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../components/iconify";
import Label from "../../../components/label";


function worksheetCard(props) {

    return(
        <Grid item xs={12} sm={12} md={12}>
            <Card>
                <CardHeader title={props.header}/> 
            
                    <Grid container sx={{mt:5}} spacing={0}>  {/* Kepala Table */}
                        <Grid item xs={4} sx={{textAlign:'center'}}>
                            <Typography variant="body"> Objek Monitoring</Typography>
                        </Grid>

                        <Divider orientation='vertical' flexItem/>  

                        <Grid item xs={2} sx={{textAlign:'center'}}>
                            <Typography variant="body"> Dokumen Pendukung </Typography>
                        </Grid>

                        <Divider orientation='vertical' flexItem/>  

                        <Grid item xs={3} sx={{textAlign:'center'}}>
                            <Typography variant="body">Catatan Kanwil</Typography>
                        </Grid>

                        <Divider orientation='vertical' flexItem/>  

                        <Grid item xs={2} sx={{textAlign:'center'}}>
                            <Typography variant="body">Manage</Typography>
                        </Grid>
                    </Grid>

                    <Divider  flexItem/>  

                    <Grid container sx={{mt:1, height:'50px'}} spacing={0}>  {/* Table Body */}

                        <Grid item xs={4} sx={{textAlign:'center', justifyContent:'center'}}> {/* Kolom Nama User */}
                            <Typography variant="body2">{props.name}</Typography>
                        </Grid>

                        <Divider orientation='vertical' flexItem/>  

                        <Grid item xs={2} sx={{textAlign:'center', justifyContent:'center'}}>  {/* Kolom NIK */}
                            <Label color="success" sx={{mt:1}}>{props.nik}</Label>
                        </Grid>

                        <Divider orientation='vertical' flexItem/>  

                        <Grid item xs={3} sx={{textAlign:'center', justifyContent:'center'}}>     {/* Kolom Username */}
                            {props.username}
                        </Grid>

                        <Divider orientation='vertical' flexItem/>  

                        <Grid item xs={2.5} sx={{textAlign:'center', justifyContent:'center'}} >  {/* Manage User */}
                            <Button color="error" variant="contained" size="small" startIcon={<Iconify icon="solar:trash-bin-trash-bold"/>} >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>

            </Card>
        </Grid> 
        
        ) 
}

const Head = (props) => {  // bagian atas dari masing2 tabel gambar dan nama user
    const randomNumber = Math.floor(Math.random()*15)+1;
    return(
    <>
    <Stack direction="row" spacing={2} sx={{alignItems:'center'}}>
        <Typography>{props.name}</Typography>
        <Avatar src={`../../../avatars/avatar_${randomNumber}.jpg`} />
    </Stack>
    
    </>
    )

}

export default worksheetCard;