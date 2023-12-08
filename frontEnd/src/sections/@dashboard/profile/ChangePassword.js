import {useState, useEffect} from "react";
import {useTheme} from "@mui/material/styles";
import { Avatar, Card, CardHeader, CardContent, Grid, Button, TextField, Snackbar, Alert, InputAdornment, IconButton} from "@mui/material";
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import {useAuth} from "../../../hooks/useAuth";
import useAxiosJWT from "../../../hooks/useAxiosJWT";
// ---------------------------------------


// ----------------------------------------

export default function ChangePassword(){
  const theme = useTheme();
  const axiosJWT = useAxiosJWT();
  const [showPassword, setShowPassword] = useState(false); 

  const [value, setValue] = useState({    // value dari input form
    password:"",
    newPassword:"",
    confirmPassword:""
  }); 

  const [isError, setIsError] = useState({
    newPassword:false,
    confirmPassword:false
  });

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]:event.target.value,
    });
  };

  const handleUpdate = async () => {
    try{
      const isValid = validateInput(value.newPassword, value.confirmPassword);

      if(!isValid){setIsError({newPassword:true, confirmPassword:true}); return};

      setIsError({newPassword:false, confirmPassword:false});

      const response = await axiosJWT.post('/editPassword', {
      password:value.password,
      confirmPassword:value.confirmPassword
      });

      setSnackbar({
        open:true,
        color:'success',
        text:response?.data?.msg
      });

      setValue({
        password:value.confirmPassword,
        newPassword:"",
        confirmPassword:""
      })

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
      password:"",
      newPassword:"",
      confirmPassword:""
    })
    )
  };

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

  const infoRows = [
    {col1:"Old Password", col2: ':', 
    col3:
    <TextField name="password" type={showPassword ? 'text' : 'password'} onChange={handleChange} value={value.password} size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />},
    {col1:"New Password", col2: ':', col3:<TextField name="newPassword" error={isError.newPassword} type={showPassword ? 'text' : 'password'} onChange={handleChange} value={value.newPassword} size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />},
    {col1:"Confirm Password", col2: ':', col3:<TextField name="confirmPassword" error={isError.confirmPassword} type={showPassword ? 'text' : 'password'} onChange={handleChange} value={value.confirmPassword} size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />},
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
                <Button variant="contained" color="warning" endIcon={ <Iconify icon="eva:edit-fill" />} onClick={handleUpdate} sx={{mr:2}}>
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

// ----------------------- utility function

function validateInput(newPass, confirmPass) {
  let valid = true;

  if(newPass!==confirmPass){
    valid = false
  }

  if(newPass.length<1 || confirmPass.length<1){
    valid = false
  }

  return valid;
}