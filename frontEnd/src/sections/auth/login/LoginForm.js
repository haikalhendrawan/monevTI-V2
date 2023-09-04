import { useState, useEffect, useRef } from 'react';
import { useNavigate, useNavigation, redirect } from 'react-router-dom';
import axios from "axios";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel, Alert, AlertTitle, Snackbar, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);  // {username:xxx, isAdmin:xxx, acessToken, refreshToken}
  const [showPassword, setShowPassword] = useState(false); 
  const [value, setValue] = useState({    // value dari input form
    username:"",
    password:"",
  }); 
  const [open, setOpen] = useState(false);  // state snackBar
  const [loading, setLoading] = useState(false);  // state loading Button

  const submitKey = useRef(null);

  useEffect(()=>{   // effect setiap awal render
  setOpen(false);
  },[])
 
  useEffect(()=>{  // effect setiap userData berubah
  if(userData){
    if(userData.accessToken){
      setLoading(true); 
      setTimeout(() => {
        navigate("/dashboard")
      }, 500); 
    }else{
      setOpen(true)
    }
  }
  },[userData])

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]:event.target.value,
    });
  };

  const handleSubmit = async(event)=>{
    event.preventDefault();
    try{
      const response = await axios.post("/login", {username:value.username, password:value.password});
      setUserData(response.data);
    }catch(err){
      console.log(err);
      setUserData(err);
    }
  }

  const handleClose = ()=>{
    setOpen(false);
  }

  
// ----------------------------------------------------------------------

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="username" label="Username" onChange={handleChange} value={value.username}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          value={value.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'top', horizontal:'right'}} >
        <Alert 
          onClose={handleClose} 
          variant="filled" 
          severity={userData&&userData.accessToken?"success":"error"} 
          sx={{ width: '100%' }}
        >
          {userData&&userData.accessToken?"login success":"Incorrect Username Or Password"}
        </Alert>
      </Snackbar>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox />} label="Remember me" /> 
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading} loadingPosition="end">
        Login
      </LoadingButton>
      </form>
    </div>
    
  );
}
