import {useState, useEffect, useRef} from "react";
import { useNavigate} from "react-router-dom";
import { Avatar, Card, CardHeader, CardContent, Tooltip, TextField, Tabs, Tab, Stack, IconButton} from "@mui/material";
import {useTheme, alpha} from "@mui/material/styles";
import {useAuth} from "../hooks/useAuth";
import useAxiosJWT from "../hooks/useAxiosJWT";
import Label from "../components/label/Label";
import Iconify from "../components/iconify/Iconify";
import DataAkun from "../sections/@dashboard/profile/DataAkun";
import ChangePassword from "../sections/@dashboard/profile/ChangePassword";
import DataPIC from "../sections/@dashboard/profile/DataPIC";

// -------------------------------------------------------------------
const infoRows = [
    {col1:"Username", col2: ':', col3:<TextField size="small" />},
    {col1:"Name", col2: ':', col3:<TextField size="small" />},
    {col1:"Email", col2: ':', col3:<TextField size="small" />},
    {col1:"Role", col2: ':', col3:<TextField size="small" />},
  ];

const selectSection = {
    0:<DataAkun />,
    1:<ChangePassword />,
    2:<DataPIC />
};

// --------------------------------------------------------------------------


export default function ProfilePage(){
    const theme = useTheme();

    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const {auth, setAuth} = useAuth();

    const axiosJWT = useAxiosJWT();

    const [avatarKey, setAvatarKey] = useState(0);

    const [tabValue, setTabValue] = useState(0); // ganti menu jenis perangkat yang ditampilkan

    const handleBackClick = () => {
      navigate(-1);
    }

    const handleTabChange = (event, newValue) => { // setiap tab jenis asset berubah
      setTabValue(newValue);
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          try{
            const formData = new FormData();
            formData.append("avatar", selectedFile);
            const response = await axiosJWT.post(`/addProfilePicture/${auth?.id}`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            });
            const response2 = await axiosJWT.post('/updateToken', {
                ...auth,
                image:response.data.fileName
              });

            setAuth((prev) => ({
                ...prev,
                image:response.data.fileName
            }));
            setAvatarKey(avatarKey+1);
            console.log(`${response?.data?.msg} & ${response2?.data?.msg}`)

          }catch(err){
            console.log(err);
          }
        }
      };
    
    return(
        <>
        <IconButton variant='contained' onClick={handleBackClick} >
          <Iconify icon={"eva:arrow-ios-back-outline"} />
        </IconButton>

         <Card sx={{width:'70%', mx:'auto', backgroundColor:alpha(theme.palette.primary.main, 0.24)}}>
            <CardHeader title={"Profile Page"} sx={{textAlign:'center'}} />
            <CardContent sx={{fontSize:14}}>

                <input type='file' style={{display:'none'}} ref={fileInputRef} onChange={handleFileChange} />

                <Tooltip title='change profile picture' placement='right'>
                    <Avatar key={avatarKey} alt="ABC" src={auth?.image?`http://localhost:8080/avatar/${auth.image}?${new Date().getTime()}`:`http://localhost:8080/avatar/default.png`} sx={{width:'20%', height:'20%', mx:'auto', cursor: 'pointer'}} onClick={handleAvatarClick} />
                </Tooltip>

                <Stack direction="row" alignItems="center" justifyContent="center" mb={0}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab icon={<Iconify icon="icon-park-outline:network-tree" />} label="1. Data Akun" value={0} iconPosition="start"/>
                        <Tab icon={<Iconify icon="wpf:key-security" />} label="2. Change Password" value={1} iconPosition="start"/>
                        <Tab icon={<Iconify icon="wpf:key-security" />} label="3. Data PIC TIK" value={2} iconPosition="start"/>
                    </Tabs>
                </Stack>
            </CardContent>
        </Card>
       
        {selectSection[tabValue]}
        </>
    )


}