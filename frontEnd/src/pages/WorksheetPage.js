import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Grid, Tabs, Tab, Box, Card, CardHeader,
           LinearProgress, LinearProgressProps, Tooltip} from '@mui/material';
// component
import Iconify from "../components/iconify/index";
import WorksheetSection1 from '../sections/@dashboard/worksheet/WorksheetSection1';
import WorksheetSection2 from '../sections/@dashboard/worksheet/WorksheetSection2';
import WorksheetSection3 from '../sections/@dashboard/worksheet/WorksheetSection3';
import WorksheetSection4 from '../sections/@dashboard/worksheet/WorksheetSection4';
import WorksheetInfo from '../sections/@dashboard/worksheet/component/WorksheetInfo';

// hooks
import { useAuth } from '../hooks/useAuth';
import useAxiosJWT from '../hooks/useAxiosJWT';

// ----------------------------------------------------------------------


export default function WorksheetPage() {
  const [tabValue, setTabValue] = useState(0); // ganti menu jenis perangkat yang ditampilkan
  const [isLoading, setLoading] = useState(true);
  const [selection, setSelection] = useState();

  const handleTabChange = (event, newValue) => { // setiap tab jenis asset berubah
    setTabValue(newValue);
  };

  const axiosJWT = useAxiosJWT();
  const {auth, setAuth} = useAuth();

  const userId = auth?.id;

  const[checklist, setChecklist] = useState({});
  const[batch, setBatch] = useState({});


  const getChecklist = async() => {
      try{
          const response = await axiosJWT.get("/getChecklistByUser/0");
          setChecklist(response.data);
          const notDone =response.data.rows.filter((row) => {
            return row.kppn_response === null
          }).length;


          const count = Object.values(response.data.rows);
          console.log(notDone)
      }catch(err){
          console.log(err);
      }
  };

  const getBatch = async() => {
      try{
          const response = await axiosJWT.get(`/getBatchByUser/${userId}/0`)
          setBatch(response.data);
          console.log(response.data);
      }catch(err){
          console.log(err);
      }
  };

  useEffect(async() => {
    const getData = async() => {
      try{
        setLoading(true)
        await getChecklist();
        await getBatch();

        setSelection({
          0:<WorksheetSection1 batch={batch} checklist={checklist} />,
          1:<WorksheetSection2 batch={batch} checklist={checklist} />,
          2:<WorksheetSection3 batch={batch} checklist={checklist} />,
          3:<WorksheetSection4 batch={batch} checklist={checklist} />,
        });
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false);
      }
    };
    
    getData();
  },[]);



  return (
    <>
      <Helmet>
        <title> Worksheet | MonevTI</title>
      </Helmet>

      <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Kertas Kerja
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="center " mb={5}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab icon={<Iconify icon="icon-park-outline:network-tree" />} label="1. Jaringan" value={0} />
              <Tab icon={<Iconify icon="wpf:key-security" />} label="2. Perangkat & IT Sec" value={1} />
              <Tab icon={<Iconify icon="wpf:survey" />} label="3. Kuesioner" value={2} />
              <Tab icon={<Iconify icon="material-symbols:send" />} label="Kirim" value={3} />
            </Tabs>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="center " mb={6}>
            <Box sx={{ width: '50%' }}>
              <LinearProgressWithLabel value={60} />
            </Box>
          </Stack>
          {isLoading? "loading" :(
          <Grid container spacing={2}>
            {tabValue!==3
            ?(<>
              <Grid item container sm={8} spacing={2}>
                {selection[tabValue]}
              </Grid>

              <Grid item sm={4}>
                <WorksheetInfo  batch={batch} checklist={checklist} />
              </Grid>
              </>)
            :null
            }

            {tabValue===3
            ? <Grid item sm={8} sx={{mx:'auto'}}>
                {selection[3]}
              </Grid>
            :null
            }

          </Grid>)
          }
      </Container>
    </>
  );
}


// --------------------------------------------------------------utility component
function LinearProgressWithLabel(props) {
  return (
    <Tooltip title="(5/10) input seluruh bagian diselesaikan">
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {`${Math.round(props.value,)}%`}
          </Typography>
        </Box>
    </Box>
    </Tooltip>
  );
};
