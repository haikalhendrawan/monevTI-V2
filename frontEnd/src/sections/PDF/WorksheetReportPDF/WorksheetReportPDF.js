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
}

// -------------------------------------------------------------


export default function WorksheetReportPDF(props) {

  const KPPN = props?.auth?.kppn;

  return(
  <Document>

    {/*  -------------------------- Report Checklist----------------------------------------- */}
    <Page size="A4" style={styles.page} orientation="landscape">
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
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom:3}}> Dapat digenerate mulai tanggal 20/12/2023</Text>
      <Text style={{fontSize:8}}> Mohon dicross check kembali bahwa data yang di input telah sesuai dan disertai dokumen-dokumen terkait</Text>
    </View>
  

    </Page>

  </Document>
  )
};
