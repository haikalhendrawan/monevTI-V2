import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useNavigation, redirect } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import axios from "axios";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel, Alert, AlertTitle, Snackbar, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {useTheme} from '@mui/material/styles'
// components
import Iconify from '../../../components/iconify';

import AuthContext from "../../../context/AuthProvider"
import {useAuth} from "../../../hooks/useAuth";


// ----------------------------------------------------------------------

export default function ResetForm() {
  const navigate = useNavigate();
  const [value, setValue] = useState({    // value dari input form
    username:"",
    email:"",
  }); 

  const theme = useTheme();

  const templateParams = {
    message: `reset request from username: ${value.username} email:${value.email}`
  };
  const [open, setOpen] = useState(false);  // state snackBar
  const [loading, setLoading] = useState(false);  // state loading Button

  useEffect(()=>{   // effect setiap awal render
  setOpen(false);
  },[])


  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]:event.target.value,
    });
  };

  const handleSubmit = async(event)=>{
    event.preventDefault();
    setOpen(true);
    try{
      const response = emailjs.send('service_82s67tg', 'template_y8rcuzk', templateParams, 'lGtCB52H3q0ZvSocM');
      console.log(response);
    }catch(err){
      console.log(err)
    }
   
  }

  const handleClose = ()=>{
    setOpen(false);
  }

  const handleBack = () => {
    navigate('/login')
  }

  
// ----------------------------------------------------------------------

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="username" label="Username" onChange={handleChange} value={value.username}/>
        <TextField name="email" label="Email" onChange={handleChange} value={value.email}/>
      </Stack>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'top', horizontal:'right'}} >
        <Alert 
          onClose={handleClose} 
          variant="filled" 
          severity={"success"} 
          sx={{ width: '100%' }}
        >
          {'Request has been send, check your email'}
        </Alert>
      </Snackbar>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading} sx={{mt:3}}>
        Request
      </LoadingButton>
      <Button fullWidth size="large" variant="contained"sx ={{mt:3, backgroundColor:theme.palette.background.paper, color:theme.palette.text.primary}} onClick={handleBack}>
        Back To Login
      </Button>
      </form>
    </div>
    
  );
}
