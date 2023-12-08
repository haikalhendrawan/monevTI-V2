import {useState, useEffect} from "react";
import {useTheme} from "@mui/material/styles";
import { Avatar, Card, CardHeader, CardContent, Grid, Button, TextField, Snackbar, Alert} from "@mui/material";
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import {useAuth} from "../../../hooks/useAuth";
import useAxiosJWT from "../../../hooks/useAxiosJWT";

// ---------------------------------------
const infoRows = [
  {col1:"Username", col2: ':', col3:<TextField size="small" disabled />},
  {col1:"Name", col2: ':', col3:<TextField size="small" />},
  {col1:"Email", col2: ':', col3:<TextField size="small" />},
  {col1:"Role", col2: ':', col3:<TextField size="small" disabled/>},
  {col1:"Periode", col2: ':', col3:<TextField size="small" disabled/>},
];

// ----------------------------------------

export default function DataAkun(){
  const {auth, setAuth} = useAuth();
  const theme = useTheme();
  const axiosJWT = useAxiosJWT();
  const [value, setValue] = useState({
    name:auth?.name,
    email:auth?.email
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
    const response = await axiosJWT.post('/editUserProfile', {
      name:value.name,
      email:value.email
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
      name:auth?.name,
      email:auth?.email
    })
    )
  };
  const infoRows = [
    {col1:"Username", col2: ':', col3:<TextField size="small" value ={auth?.username} disabled />},
    {col1:"Name", col2: ':', col3:<TextField size="small" name='name' value ={value.name} onChange={handleChange}/> },
    {col1:"Email", col2: ':', col3:<TextField size="small" name='email' value ={value.email} onChange={handleChange}/>},
    {col1:"Role", col2: ':', col3:<TextField size="small" disabled value ={auth?.role}/>},
    {col1:"Periode", col2: ':', col3:<TextField size="small" disabled value ={'Smt 2 2023'}/>},
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
                <Button variant="contained" color="warning" endIcon={ <Iconify icon="eva:edit-fill" />} sx={{mr:2}} onClick={handleUpdate}>
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