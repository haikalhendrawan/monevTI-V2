import {useState, useEffect} from "react";
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import axios from "axios"
import styles from "./IAssetReportStyles";


export default function IAssetReportPDF() {
  const [ASSET,setASSET] = useState(null);
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();


  const refresh = async() => {
    const response = await axios.get("/refresh", {  
        withCredentials:true
    });
    const {id, username, name, email, image, role, kppn, accessToken, msg} = response.data;
    return accessToken;
  };   

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

    <View style={styles.header} fixed>
      <Image style={styles.logo} src={"/assets/images/kemenkeu/kemenkeu_logo.png"}/>
      <View style={{flexDirection:'column', justifyContent:'space-between', paddingTop:15, paddingBottom:15}}>
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}> Kementerian Keuangan Republik Indonesia </Text>
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}> KPPN Padang </Text>
        <Text style={{fontFamily:'Helvetica-Bold', fontSize:8}}>Di generate pada tanggal:{currentDate && `${date}-${month}-${year}`} </Text> 
      </View>
    </View>

    <View style={styles.title} wrap={false}>
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14  ,}}> Data Aset TIK </Text> 
    </View>

    <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Product</Text> 
          </View> 
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Type</Text> 
          </View> 
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Period</Text> 
          </View> 
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Price</Text> 
          </View> 
        </View>
        {ASSET && ASSET.map((row)=> {
          return (
            <>
            <View style={styles.tableRow}> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.id}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.kppn}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.jenis_perangkat}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.kondisi}</Text> 
              </View> 
            </View> 
            <View style={styles.tableRow}> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.id}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.kppn}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.jenis_perangkat}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.kondisi}</Text> 
              </View> 
            </View> 
            <View style={styles.tableRow}> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.id}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.kppn}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.jenis_perangkat}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.kondisi}</Text> 
              </View> 
            </View> 
            <View style={styles.tableRow}> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.id}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.kppn}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.jenis_perangkat}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.kondisi}</Text> 
              </View> 
            </View> 
            </>
          )
        })}
    </View>

    <View style={styles.footer} fixed>
      <Text >hal: 1 dari 4 Halaman </Text> 
    </View>

    </Page>
  </Document>
  )
};
