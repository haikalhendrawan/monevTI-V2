import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel, 
 } from '@mui/material';
import Iconify from "../components/iconify";
// section
import LogBookPeriodSelection from '../sections/@dashboard/logbook/LogBookPeriodSelection';
import LogBookTable from '../sections/@dashboard/logbook/LogBookTable';
import LogBookAddModal from '../sections/@dashboard/logbook/LogBookAddModal';
import useAxiosJWT from '../hooks/useAxiosJWT';

 // --------------------------------------------------------------------------------------------
  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }));

  const triwulanCategory = {
    1:[1,2,3],
    2:[4,5,6],
    3:[7,8,9],
    4:[10,11,12]
  };
  
  const currentMonth = new Date().getMonth()+1;

  const currentTriwulan = Object.keys(triwulanCategory).find(
    key => triwulanCategory[key].includes(currentMonth)
  );

// ----------------------------------------------------------------------

export default function LogBookPage() {

  // const [selectedYear, setSelectedYear] = useState(new Date.getYear());

  // const [selectedTriwulan, setSelectedTriwulan] = useState(0);

  const axiosJWT = useAxiosJWT();
  
  const [open, setOpen] = useState(false); // open dan close add perangkat modal

  const [logbook, setLogBook] = useState([]);

  const [periodValue, setPeriodValue] = useState({
    tahun:1,
    triwulan:0,
  });

  const handleYearChange = (event) => {
    setPeriodValue((prev) => ({
      ...prev,
      [event.target.name]:event.target.value,
    }))
  };

  const handlePeriodChange = (event) => {
    setPeriodValue((prev) => ({
      ...prev,
      [event.target.name]:event.target.value
    }))
  };

  const handleModalClose = () => {
    setOpen(false)
  };

  const getData = async() => {
    try{
      const response = await axiosJWT.get("/getLogBook");
      setLogBook(response.data);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getData();
  },[])

  return (
    <>
      <Helmet>
        <title> Dashboard:Log Book TIK </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack direction='row' spacing={2}>
            <Typography variant="h4" gutterBottom>
              Log Book TIK
            </Typography>
          </Stack>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => (setOpen(true))} >
            Add
          </Button>
        </Stack>

        <LogBookPeriodSelection value={periodValue} onYearChange={handleYearChange} onPeriodChange={handlePeriodChange}/>
        <LogBookTable tahun={periodValue.tahun} triwulan={periodValue.triwulan} logbook={logbook} getData={getData} />

      </Container>

      <LogBookAddModal open={open} onClose={handleModalClose} getData={getData} />

    </>
  );
}
