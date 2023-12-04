import {useState} from "react";
import axios from "axios";
import { Container, Stack, Typography, Grid, Card, CardHeader, IconButton, Tooltip,
            FormControl, TextField, Button, Divider, Avatar, CardContent} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";


function WorksheetCard(props) {
    const theme = useTheme();
    const [value, setValue] = useState({
        catKPPN:'',
        catKanwil:''
    });
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return(
        <Grid item xs={12} sm={12} md={12}>
            <Card sx={{height:'230px'}}>
                <CardHeader title={<Head num={props.header} />} sx={{backgroundColor:theme.palette.background.default, height:'25%', pl:1, pt:0}}/> 
            
                    <Grid container sx={{mt:1, textAlign:'center', justifyContent:'center'}} spacing={0}>  {/* Kepala Table */}
                        <Grid item xs={3}>
                            <Typography variant="body2" sx={{mr:1}}> Petunjuk </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="body2"> Dokumen </Typography>
                        </Grid>

                        <Grid item xs={3.5}>
                            <Typography variant="body2"> Catatan KPPN </Typography>
                        </Grid>

                        <Grid item xs={3.3}>
                            <Typography variant="body2"> Catatan Kanwil </Typography>
                        </Grid>
                    </Grid>

                    <Divider  flexItem/>  

                    <Grid container sx={{mt:0, height:'50px', textAlign:'center', justifyContent:'center'}} spacing={1}>  {/* Table Body */}
                        <Grid item xs={3} p={1}> {/* Kolom Nama User */}
                            <Typography sx={{fontSize:12}}>Foto kondisi palo alto port 2</Typography>
                        </Grid>

                        <Grid item xs={2}>  {/* Kolom NIK */}
                            <Tooltip title="Upload file" placement='right'>
                                <Button variant='contained' size='small' sx={{mb:1}}><Iconify icon='solar:cloud-upload-bold' /></Button>
                            </Tooltip>
                            <Tooltip title="Contoh bukti dukung">
                                <Button variant='contained' size='small' color='warning'><Iconify icon='solar:lightbulb-bold' /></Button>
                            </Tooltip>

                            {/* <Button variant='contained' size='small' color='success' sx={{mb:1}}><Iconify icon='solar:eye-bold-duotone' /> 1</Button>
                            <Button variant='contained' size='small' color='success' sx={{mb:1}}><Iconify icon='solar:eye-bold-duotone' /> 2</Button>
                            <Button variant='contained' size='small' color='error'><Iconify icon='solar:trash-bin-trash-bold-duotone' /></Button> */}
                        </Grid>

                        <Grid item xs={3.5}>     {/* Kolom Username */}
                            <FormControl>
                                <TextField name="catatankppn" size='small' onChange={handleChange} value={value.catKPPN} multiline minRows={4} maxRows={4} inputProps={{style: {fontSize: 12}}}/>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3.3}>  {/* Manage User */}
                            <FormControl>
                                <TextField disabled name="catatankanwil" size='small' onChange={handleChange} value={value.catKanwil} multiline minRows={4} maxRows={4} inputProps={{style: {fontSize: 12}}}/>
                            </FormControl>
                        </Grid>
                    </Grid>

            </Card>
        </Grid> 
        
        ) 
}

const Head = (props) => {  // bagian atas dari masing2 tabel gambar dan nama user
    const theme = useTheme();
    return(
    <>
    <Stack direction="row" spacing={2} sx={{justifyContent:'space-between'}}>
        <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
            <Typography variant="h6">{`${props.num} |`}</Typography>
            <Stack >
                <Typography variant="body1" sx={{fontSize:15}}>Link 1 terhubung ke Port 6 Switch Dell Non SPAN</Typography>
            </Stack>
        </Stack>
        <Tooltip title="Last upload at: 12/06/2023">
            <IconButton disableRipple><Iconify icon={"icons8:checked"} sx={{color:'rgb(0, 167, 111)', borderRadius:'50%'}} /></IconButton>
        </Tooltip> 
    </Stack>
    </>
    )

}

export default WorksheetCard;