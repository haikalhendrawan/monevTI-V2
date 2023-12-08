import {useState, useEffect} from "react";
import {useTheme} from "@mui/material/styles";
import { Avatar, Card, CardHeader, CardContent, Grid, Button, TextField, Snackbar, Alert} from "@mui/material";
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import {useAuth} from "../../../hooks/useAuth";
import useAxiosJWT from "../../../hooks/useAxiosJWT";
// ---------------------------------------


export default function DataPIC () {
  const {auth, setAuth} = useAuth();
  const theme = useTheme();
  const axiosJWT = useAxiosJWT();

  const [value, setValue] = useState({
    nama_pic:auth?.namaPIC,
    nip_pic:auth?.nipPIC,
    email_pic:auth?.emailPIC
  });

  const [isError, setIsError] = useState({
    nip:false
  });

  const [snackbar, setSnackbar] = useState({
    open:false,
    color:null,
    text:'No value'
  });

  const handleSnackbarClose = () =>{
    setSnackbar({
      ...snackbar,
      open:false
    })
  };

  const handleChange = (event) => {
    setValue(() => ({
      ...value,
      [event.target.name] : event.target.value
    })
    )
  };

  const handleUpdate = async (event) => {
   try{
      const isValid = validateNIP(value.nip_pic); // harus true utk lanjut call API

      if(!isValid){setIsError({nip:true}); return};

      setIsError({nip:false})

      const response = await axiosJWT.post('/editPICProfile', {
        nama_pic:value.nama_pic,
        nip_pic:value.nip_pic,
        email_pic:value.email_pic
      });

      setSnackbar({
        open:true,
        color:'success',
        text:response?.data?.msg
      });
      
   }catch(err){
      console.log(err)
      setSnackbar({
        open:true,
        color:'error',
        text:err?.response?.data?.errMsg?err.response.data.errMsg:'internal server error'
      });
   }
  };
  const handleReset = (event) => {
    setValue(() => ({
      nama_pic:auth?.namaPIC,
      nip_pic:auth?.nipPIC,
      email_pic:auth?.emailPIC
    })
    )
  };
  const infoRows = [
    {col1:"Nama PIC TIK", col2: ':', col3:<TextField value={value.nama_pic} name='nama_pic' onChange={handleChange} size="small"/>},
    {col1:"NIP", col2: ':', col3:<TextField value={value.nip_pic} name='nip_pic' onChange={handleChange} size="small" error={isError.nip} />},
    {col1:"Email", col2: ':', col3:<TextField value={value.email_pic} name='email_pic' onChange={handleChange} size="small" />},
  ];
  return(
    <>
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
              <Button size="large" variant="contained" color="warning" endIcon={ <Iconify icon="eva:edit-fill" />} onClick={handleUpdate} sx={{mr:2}}>
                  Update
              </Button>
              <Button variant="contained" sx={{backgroundColor:theme.palette.common.white, color:theme.palette.common.black}} onClick={handleReset}>
                    Reset
                </Button>
            </Grid>    
        </Grid>
    </CardContent>
  </Card>

  {/*  snackbar untuk show notification di kanan atas  */}
  <Snackbar open={Boolean(snackbar.open)} onClose={handleSnackbarClose} autoHideDuration={4000} anchorOrigin={{vertical:'top', horizontal:'right'}} >
    <Alert 
    onClose={handleSnackbarClose} 
    variant="filled" 
    severity={snackbar.color?snackbar.color:'info'} 
    sx={{ width: '100%' }}
    >
    {snackbar?.text}
    </Alert>
  </Snackbar>
  </>
  )
}

// --------------- utility function

function validateNIP (nip){
  let invalid = false;
  if(nip.length!==18){
    invalid = true
  }
}