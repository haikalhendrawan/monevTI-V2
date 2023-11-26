import {useState, useEffect} from "react";
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import axios from "axios"
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// hooks
import useAsset, { AssetProvider } from '../sections/@dashboard/iasset/useAsset';
import useAxiosJWT from '../hooks/useAxiosJWT';
import {useAuth} from "../hooks/useAuth";

// Context Provider
import { IUserProvider } from '../sections/@dashboard/iasset/useIUser';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
});

// Create Document Component
function MyDocument() {

  const [ASSET,setASSET] = useState(null);

  const refresh = async() => {
    const response = await axios.get("/refresh", {  
        withCredentials:true
    });
    const {id, username, name, email, image, role, kppn, accessToken, msg} = response.data;
    return accessToken;
}

  const getIAsset = async () => {
    try{
      const accessToken = await refresh();
      const response = await axios.get("/getIAsset", {headers:{Authorization:`Bearer ${accessToken}`}});
      setASSET(response.data);
      console.log(response.data); 
    }catch(err){
      console.log(err);
    }
  };

  useEffect(async () => {
    getIAsset();
  },[]);


  return(
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.section}>
        <Text>{ASSET && JSON.stringify(ASSET)}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  )
};


export default MyDocument;
