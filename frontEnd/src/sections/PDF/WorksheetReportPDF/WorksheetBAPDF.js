import {useState, useEffect} from "react";
import axios from "axios";
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import styles from "./WorksheetReportStyles";

// hooks
import {useAuth} from"../../../hooks/useAuth";
import useAsset from "../../@dashboard/iasset/useAsset";
import useIUser from "../../@dashboard/iasset/useIUser";

// ----------------------------------------------------------------

const selectKPPN = {
  0:'Kanwil DJPb Prov Sumatera Barat',
  1:'Padang',
  2:'Bukittinggi',
  3:'Solok',
  4:'Lubuk Sikaping',
  5:'Sijunjung',
  6:'Painan'
};

const kepalaKantor = {
  0:'Syukriah HG',
  1:'Joko Supriyanto',
  2:'Khairil Indra',
  3:'Ika Sari Heniyatun',
  4:'Khairil Indra',
  5:'Ika Sari Heniyatun',
  6:'Refenalria Azwar',
};


const colorKondisi = {
  0:'#54D62C',
  1:'#FFC107',
  2:'#FF4842'
};

// -------------------------------------------------------------


export default function WorksheetBAPDF(props) {
  
  const KPPN = props?.auth?.kppn;
  const namaPIC = props?.auth?.namaPIC;
  
  return(
  <Document>

    {/*  -------------------------- Report Checklist----------------------------------------- */}
    <Page size="A4" style={styles.page} orientation="portrait">
        {/*  -------- KOP Surat ---------- */}
    <View style={styles.header} fixed>
      <Image style={styles.logo} src={"/assets/images/kemenkeu/kemenkeu_logo.png"}/>
      <View style={{flexDirection:'column', justifyContent:'space-between', paddingTop:15, paddingBottom:15}}>
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}> Kementerian Keuangan Republik Indonesia </Text>
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}> {KPPN<1?null:'Kantor Pelayanan Perbendaharaan Negara'} {selectKPPN[KPPN]} </Text>
      </View>
    </View>

        {/*  -------- Title ---------- */}
    <View style={styles.title} wrap={false}>
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom:3}}> Berita Acara</Text>
      <Text style={{fontSize:12}}> Penyelesaian Input Data Pada Modul MonevTI</Text>
    </View>

    <View style={styles.paragraph} wrap={false}>
      <Text style={{fontSize:9}}> Pada hari ini tanggal 20 Bulan Desember Tahun 2023, telah dilakukan penyelesaian Input data TIK KPPN Padang dengan rincian sebagai berikut: </Text>
      <View style={styles.list}>
        <Text style={{fontSize:9}}> 1. Input data Aset TIK dan User TIK dengan progress penyelesaian: 100% (56 input)</Text>
        <Text style={{fontSize:9}}> 2. Input checklist kertas kerja dengan progress penyelesaian: 100% (51 input)</Text>
      </View>
    </View>
    
    
    </Page>

  </Document>
  )
};
