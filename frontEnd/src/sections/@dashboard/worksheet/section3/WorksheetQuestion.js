import {useState} from "react";
import axios from "axios";
import { Container, Stack, Typography, Grid, Card, CardHeader, IconButton, Tooltip,
            FormControl, TextField, Button, Divider, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";

const cardd = [...Array(4).map((item, index) => {
  return(index)
})];

function WorksheetQuestion(props) {
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
            <Card >
              {cardd.map((item) => {
                return(
                  <Grid container sx={{mt:0,  textAlign:'center', justifyContent:'center'}} spacing={1}>  {/* Table Body */}
                        <Grid item xs={1} p={1}> 
                          <Typography sx={{fontSize:12}}>1.</Typography>
                        </Grid>

                        <Grid item xs={4}> 
                          <Typography sx={{fontSize:13}}>Apakah telah terdapat SK PIC TIK apakah seluruh pemeriksaan telah dilakukan dengan sesuai ketentuan?</Typography>
                        </Grid>

                        <Grid item xs={1}>  
                          <Typography sx={{fontSize:12}}>:</Typography>
                        </Grid>

                        <Grid item xs={6}> 
                            <FormControl>
                                <TextField name="jawaban" size='small' onChange={handleChange} value={value.catKanwil} multiline minRows={4} maxRows={4} inputProps={{style: {fontSize: 12}}} sx={{width:'120%'}}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                )
              })}
                    
            </Card>
        </Grid> 
        
        ) 
}


export default WorksheetQuestion;