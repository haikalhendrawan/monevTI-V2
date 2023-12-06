import {useState, useEffect} from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, Button, TextField, InputAdornment, IconButton} from "@mui/material";
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
// ---------------------------------------


// ----------------------------------------

export default function ChangePassword(){
  const [showPassword, setShowPassword] = useState(false); 
  const [value, setValue] = useState({    // value dari input form
    password:"",
    newPassword:"",
    confirmPassword:""
  }); 
  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]:event.target.value,
    });
  };
  const infoRows = [
    {col1:"Old Password", col2: ':', 
    col3:
    <TextField name="password" label="Password" type={showPassword ? 'text' : 'password'} onChange={handleChange} value={value.password} size="small"
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
    {col1:"New Password", col2: ':', col3:<TextField name="newPassword" label="Password" type={showPassword ? 'text' : 'password'} onChange={handleChange} value={value.newPassword} size="small"
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
    {col1:"Confirm Password", col2: ':', col3:<TextField name="confirmPassword" label="Password" type={showPassword ? 'text' : 'password'} onChange={handleChange} value={value.confirmPassword} size="small"
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