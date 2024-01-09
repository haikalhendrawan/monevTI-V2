import {useState, useRef} from "react";
import axios from "axios";
import { Container, Stack, Typography, Grid, Card, CardHeader, IconButton, Tooltip, Select, MenuItem, InputLabel,
            FormControl, TextField, Button, Divider, Avatar, CardContent} from '@mui/material';
import {useTheme, styled} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import useAxiosJWT from "../../../../hooks/useAxiosJWT";
import {useAuth} from "../../../../hooks/useAuth";

// ------------------------------------------------------------
const selectKondisi = [
  {jenis:'Sesuai', value:2, color:'success'}, 
  {jenis:'Belum Sesuai', value:1, color:'error'},
  {jenis:'Tidak Tahu', value:0, color:'warning'},
  ];
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    });

// ------------------------------------------------------------
function WorksheetCard(props) {
  const {num, csId, chId, onClick, handleSelect, handleDelete, handleEdit, handleBlur, kppnNote, kppnResponse, title,  
    instruksi, dateUpdated, file1, file2, peraturan, wsSection, getChecklist, contohFile} = props;
  const theme = useTheme();
  const axiosJWT = useAxiosJWT();
  const {auth, setAuth} = useAuth();
  const username = auth?.username;
  const [value, setValue] = useState(null);

  const handleUploadFile = async(e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    const fileNum = file1?.length<1 || file1===null?1:2;
    const date= new Date().getTime();
    if (selectedFile) {
        try{
          const formData = new FormData();
          formData.append("dokumen", selectedFile);
          const response = await axiosJWT.post(`/addDataDukung/${chId}/${csId}/${wsSection}/${fileNum}/${username}/${date}`, 
                formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
          });
          console.log("File uploaded successfully");
          console.log(response);
          getChecklist();
        }catch(err){
            console.log(err);
        }
        }
    };

  const handleChange = (event) => {
    setValue(event.target.value)
  }


  return(
      <Grid item xs={12} sm={12} md={12}>
        <Card sx={{height:'260px'}}>
            <CardHeader title={<Head num={props.num} title={title} dateUpdated={dateUpdated} />} sx={{backgroundColor:theme.palette.background.default, color:theme.palette.text.primary,  height:'25%', pl:1, pt:0}}/> 
        
              <Grid container sx={{mt:1, mb:1, textAlign:'center', justifyContent:'center', color:theme.palette.text.secondary}} spacing={0}>  {/* Kepala Table */}
                  <Grid item xs={3}>
                      <Typography variant="body2" sx={{mr:1}}> Kondisi </Typography>
                  </Grid>

                  <Grid item xs={2}>
                      <Typography variant="body2"> Dokumen </Typography>
                  </Grid>

                  <Grid item xs={3.5}>
                      <Typography variant="body2"> Petunjuk </Typography>
                  </Grid>

                  <Grid item xs={3.3}>
                      <Typography variant="body2"> Catatan KPPN </Typography>
                  </Grid>
              </Grid>

              <Divider  flexItem/>  

              <Grid container sx={{mt:0, height:'50px', textAlign:'center', justifyContent:'center'}} spacing={1}>  {/* Table Body */}
                  <Grid item xs={3} p={1}> 
                      <FormControl sx={{width:'100%', height:'100%'}}>
                        <Select required name="kondisi" value={kppnResponse ?? 'Null'} onChange={(event)=>{handleSelect(event, csId)}} size='small' sx={{typography:'body2'}}>
                            {selectKondisi.map((item, index) => {
                            return(<MenuItem key={index} sx={{fontSize:12, color:theme.palette[item.color].main}} value={item.value}>{item.jenis}</MenuItem>)
                            })}
                        </Select>
                      </FormControl>

                  </Grid>

                  <Grid item xs={2}> 
                    {file1?.length>0?
                    <Tooltip title="Lihat file 1" placement='right'>
                        <Button variant='contained' size='small' color='success' sx={{mb:1}} onClick={() => {onClick(file1,1)}}><Iconify icon='solar:eye-bold-duotone' /> 1</Button>
                    </Tooltip>
                    :null
                    }
                    {file2?.length>0?
                    <Tooltip title="Lihat file 2" placement='right'>
                        <Button variant='contained' size='small' color='success' sx={{mb:1}} onClick={() => {onClick(file2,2)}}><Iconify icon='solar:eye-bold-duotone' /> 2</Button>
                    </Tooltip>
                    :null
                    }
                    {file1?.length>0 && file2?.length>0?null
                    :   <Tooltip title="Max. 50Mb, dan 2 file max" placement='right'>
                          <Button component="label" variant='contained' size='small' sx={{mb:1}}>
                            <Iconify icon='solar:cloud-upload-bold' />
                            <VisuallyHiddenInput type='file' onChange={handleUploadFile} />
                          </Button>
                        </Tooltip>
                    }
                    {file1?.length>0 || file2?.length>0?
                    <Tooltip title="Hapus file" placement='right'>
                        <Button variant='contained' onClick={()=>{handleDelete(csId)}} size='small' color='error' sx={{mb:1}}><Iconify icon='solar:trash-bin-trash-bold-duotone' /></Button>
                    </Tooltip>
                    :null  
                    }
                    <Tooltip title="Contoh dokumen">
                          <Button variant='contained' onClick={()=>{onClick(contohFile,3)}} size='small' color='warning' sx={{mb:1}}><Iconify icon='solar:lightbulb-bold' /></Button>
                    </Tooltip>


                  </Grid>

                  <Grid item xs={3.5}>     
                      <FormControl>
                        <Typography sx={{fontSize:12, textAlign:'start'}} dangerouslySetInnerHTML={{ __html: instruksi }} />
                      </FormControl>
                  </Grid>

                  <Grid item xs={3.3}>  
                      <FormControl sx={{width:'100%', height:'100%'}}>
                        <TextField name="catatankppn" size='small' defaultValue={kppnNote} value={value} onChange={handleChange} onBlur={(event) => {handleBlur(csId, value)}} multiline minRows={4} maxRows={4}  inputProps={{style: {fontSize: 12}}} />
                      </FormControl>
                  </Grid>
              </Grid>

        </Card>
      </Grid> 
      ) 
}

const Head = (props) => {  // bagian atas dari masing2 tabel gambar dan nama user
  const date = new Date(props.dateUpdated).toLocaleDateString('en-GB');
  const tooltipText = `Last update: ${date}`;
  const isUpdate = props.dateUpdated;
  const theme = useTheme();
  return(
  <>
  <Stack direction="row" spacing={2} sx={{justifyContent:'space-between'}}>
      <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
          <Typography variant="h6" sx={{ml:1, fontSize:14}}>{`${props.num}`}</Typography>
          <Stack >
              <Typography variant="body1" sx={{fontSize:15, ml:1}}>{props.title}</Typography>
          </Stack>
      </Stack>
      {isUpdate?
        <Tooltip title={tooltipText} placement="left-start">
          <IconButton disableRipple><Iconify icon={"icons8:checked"} sx={{color:'rgb(0, 167, 111)', borderRadius:'50%'}} /></IconButton>
        </Tooltip>:
        null
      }

  </Stack>
  </>
  )

}

export default WorksheetCard;