import {useState} from "react";

import { Container, Stack, Typography, Grid, Card, CardHeader, IconButton, Tooltip,
            FormControl, TextField, Button, Divider, Popper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import useAxiosJWT from "../../../../hooks/useAxiosJWT"


function WorksheetQuestion(props) {
    const theme = useTheme();
    const axiosJWT = useAxiosJWT();

    const {batch, checklist, getBatch, getChecklist, editBatch, editChecklist} = props;

    const allChecklist = checklist?.rows?checklist.rows:[];

    const question = allChecklist.filter((item) => {
      return item.ws_section===3
    });

    // {batch_id: 0, 
    // checklist_id: 1,
    // contoh_file: "contoh2.pdf",
    // csjunction_id: 89,
    // date_created: "2023-12-12T02:57:35.000Z",
    // date_updated: "2023-12-14T15:33:16.000Z",
    // description: "checklist 2 desc",
    // file1: "1",
    // file2: "1",
    // instruksi: "Lakukan updating",
    // kanwil_note: "1",
    // kppn_note: "1",
    // kppn_response: 1,
    // peraturan: "3",
    // title: "Apakah anda mengetahui?",
    // user_id: 7,
    // ws_section: 3}

    const arrayOfId = question.map((item) => {
      return item.csjunction_id
    });

    const objectOfId = arrayOfId.reduce((acc, item) => {
      acc[item] = "";
      return acc;
    }, {});

    const [value, setValue] = useState(question);

    const handleChange = (event) => {
      const { name, value } = event.target;

      setValue((prev) =>
        prev.map((item) =>
          item.csjunction_id.toString() === name
            ? { ...item, kppn_note: value }
            : item
        )
      );
    };

    //  const editChecklist = async(id, kppnResponse, kppnNote, kanwilNote, file1, file2) 
    const handleBlur = async(param) => {

      const currentRow = value.find((item) => item.csjunction_id === param);
      const {csjunction_id:csjunctionId, kppn_response:kppnResponse, kppn_note:kppnNote , kanwil_note:kanwilNote, file1, file2} = currentRow;
      const isRespond = kppnNote.length>0?1:null;
      try{
        const response = await editChecklist(csjunctionId, isRespond, kppnNote, kanwilNote, file1, file2);
        console.log(response);
        getChecklist();
      }catch(err){
        console.log(err)
      }
    };


    return(
        <Grid item xs={12} sm={12} md={12}>
            <Card >
              {question.map((item, index) => {
                return(
                  <Grid container sx={{mt:0,  textAlign:'center', justifyContent:'center'}} spacing={1} key={index}>  {/* Table Body */}
                        <Grid item xs={1} p={1}> 
                          <Typography sx={{fontSize:12}}>{index+1}</Typography>
                        </Grid>

                        <Grid item xs={4}> 
                          <Typography sx={{fontSize:13}}>{item.title}</Typography>
                        </Grid>

                        <Grid item xs={1}>  
                          <Typography sx={{fontSize:12}}>:</Typography>
                        </Grid>

                        <Grid item xs={6}> 
                            <FormControl>
                                <TextField name={String(item.csjunction_id)} size='small' onChange={handleChange} onBlur={() => {handleBlur(item.csjunction_id)}} value={value.find((row) => row.csjunction_id === item.csjunction_id).kppn_note} multiline minRows={4} maxRows={4} inputProps={{style: {fontSize: 12}}}  sx={{width:'120%'}}/>
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