import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Container, Stack, Typography, Box, Button, IconButton, Card, CardHeader, CardContent, Grid
          , FormControl, InputLabel, Select, MenuItem} from '@mui/material';
// component 
import Iconify from "../../components/iconify";
import PreviewFileModal from '../../sections/admin/worksheetRef/PreviewFileModal';
// hooks
import useAxiosJWT from '../../hooks/useAxiosJWT';
import styles from "./styles.module.css";


// ---------------------------------------------------------------------
const selectKondisi = [
  {jenis:'Tidak Tahu', value:0, color:'#FFC107'},
  {jenis:'Belum Sesuai', value:1, color:'#FF4842'},
  {jenis:'Sesuai', value:2, color:'#54D62C'}, 
  ];
  const selectTahun = [
    {jenis:'Padang', value:1},
    {jenis:'Bukittinggi', value:2},
    {jenis:'Solok', value:3},
    {jenis:'Lubuk Sikaping', value:4},
    {jenis:'Sijunjung', value:5},
    {jenis:'Painan', value:6},
    {jenis:'Kanwil', value:0},
  ];


// ----------------------------------------------------------------------

export default function UseRefPage() {
  const axiosJWT = useAxiosJWT();
  const [checklist, setChecklist] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState({
    file1:null,
    file2:null,
    filenum:null
  });


  const [KPPN, setKPPN] = useState(1);

  const fetchData = async() => {
    try{
      const response = await axiosJWT.get("/getChecklistRef/0");
      setChecklist(response.data);
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleClick = (filename, filenum) => {
    setOpen((prev) => !prev);
    setFile({...file, file1:filename, filenum:1})
  };

  const handleChange = (event) => {
    setKPPN(event.target.value);
  };

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() =>{
    fetchData()
  },[])

  return (
    <>
      <Helmet>
        <title> Worksheet Ref </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack direction='row' spacing={2}>
            <Typography variant="h4" gutterBottom>
              Data pengerjaan KPPN
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="end" mb={5}>
          <FormControl sx={{  minWidth: 180 }}>
            <InputLabel id="demo-simple-select-label">KPPN</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={KPPN}
              label="KPPN"
              onChange={handleChange}
              sx={{ typography:'body1', borderRadius:'12px'}}
            >
              <MenuItem value={1} sx={{typography:'body2'}}>Padang</MenuItem>
              <MenuItem value={2} sx={{typography:'body2'}}>Bukittinggi</MenuItem>
              <MenuItem value={3} sx={{typography:'body2'}}>Solok</MenuItem>
              <MenuItem value={4} sx={{typography:'body2'}}>Lubuk Sikaping</MenuItem>
              <MenuItem value={5} sx={{typography:'body2'}}>Sijunjung</MenuItem>
              <MenuItem value={6} sx={{typography:'body2'}}>Painan</MenuItem>
              <MenuItem value={0} sx={{typography:'body2'}}>Kanwil</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Card sx={{height:'100%', width:'100%'}} >
              <CardHeader title='Kertas kerja bagian 1 dan 2' />
              
              <CardContent>
                <table className={styles.table}>
                  <thead style={{height:'50px'}}>
                    <tr>
                      <th className={styles.borderTopLeft} style={{backgroundColor:theme.palette.background.default}}>No</th>
                      <th style={{width:'30%', backgroundColor:theme.palette.background.default}} >Checklist</th>
                      <th style={{width:'35%', backgroundColor:theme.palette.background.default}} >Instruksi</th>
                      <th style={{width:'15%', backgroundColor:theme.palette.background.default}} >Respon KPPN</th>
                      <th style={{width:'7.5%', backgroundColor:theme.palette.background.default}}>file 1</th>
                      <th className={styles.borderTopRight} style={{backgroundColor:theme.palette.background.default}}>file 2</th>
                    </tr>
                  </thead>

                  <tbody>
                  {checklist?.rows?.filter((item) => item.kppn===KPPN && item.ws_section!==3).map((item, index) => {
                    return(
                    <tr key={index}>
                      <td> 
                        <Typography variant='body2' color={theme.palette.text.primary}>
                          {index+1}
                        </Typography>
                      </td>
                      <td> 
                        <Typography variant='body3' color={theme.palette.text.primary}>
                          {item.title}
                        </Typography>
                      </td>
                      <td dangerouslySetInnerHTML={{ __html: item.instruksi}} />
                      <td> 
                        <Typography variant='body2' color={selectKondisi[item?.kppn_response]?.color}>
                          {selectKondisi[item?.kppn_response]?.jenis || 'Null'}
                        </Typography>
                      </td>
                      <td> 
                        {item.file1?
                          <IconButton variant='contained' size='small' color="primary" onClick={() => {handleClick(item.file1, 1)}}>
                            <Iconify icon='solar:eye-bold-duotone' />
                          </IconButton>
                        :null} 
                      </td>
                      <td> 
                        {item.file2?
                          <IconButton variant='contained' size='small' color="primary" onClick={() => {handleClick(item.file2, 2)}}>
                            <Iconify icon='solar:eye-bold-duotone' />
                          </IconButton>
                        :null} 
                      </td>
                    </tr>
                    )
                  })}
                  </tbody>

                </table>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Card sx={{height:'100%', width:'100%'}} >
              <CardHeader title='Kertas kerja bagian 3' />
              
              <CardContent>
                <table className={styles.table}>
                  <thead style={{height:'50px'}}>
                    <tr>
                      <th className={styles.borderTopLeft} style={{backgroundColor:theme.palette.background.default}}>No</th>
                      <th style={{width:'40%', backgroundColor:theme.palette.background.default}} >Checklist</th>
                      <th style={{width:'45%', backgroundColor:theme.palette.background.default}} >Respon KPPN</th>
                    </tr>
                  </thead>

                  <tbody>
                  {checklist?.rows?.filter((item) => item.kppn===KPPN && item.ws_section===3).map((item, index) => {
                    return(
                    <tr key={index}>
                      <td> 
                        <Typography variant='body2' color={theme.palette.text.primary}>
                          {index+1}
                        </Typography>
                      </td>
                      <td> 
                        <Typography variant='body3' color={theme.palette.text.primary}>
                          {item.title}
                        </Typography>
                      </td>
                      <td> 
                        <Typography variant='body3' color={theme.palette.text.secondary}>
                          {item.kppn_note}
                        </Typography>
                      </td>
                    </tr>
                    )
                  })}
                  </tbody>

                </table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Container>

      <PreviewFileModal 
        modalOpen={open} 
        modalClose={handleClose} 
        file1={file.file1} 
        file2={file.file2} 
        filenum={file.filenum}
      />
    </>
  );
}
