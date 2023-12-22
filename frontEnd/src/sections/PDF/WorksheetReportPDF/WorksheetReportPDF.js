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
  0:'#FFC107',
  1:'#FF4842',
  2:'#54D62C',
};

const SELECTKONDISI = [
  {jenis:'Tidak Tahu', value:0, color:'warning'},
  {jenis:'Tidak Sesuai', value:1, color:'error'},
  {jenis:'Sesuai', value:2, color:'success'}, 
  ];

const selectTTEMargin = {
  0:88,
  1:65,
  2:88,
  3:65,
  4:88,
  5:65,
  6:88,
};

const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth()+1;
const year = currentDate.getFullYear();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();
let second = currentDate.getSeconds();
second = (second).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});


// -------------------------------------------------------------


export default function WorksheetReportPDF(props) {

  const KPPN = props?.auth?.kppn;
  const worksheet = props?.checklist?.rows;
  const checklist = worksheet?.filter((item) => item.ws_section!==3);
  const kuesioner = worksheet?.filter((item) => item.ws_section===3);
  const persenSesuai= ((checklist?.filter((item) => item.kppn_response===2).length)/(checklist.length)*100).toFixed(0);
  const persenDiisi= ((kuesioner?.filter((item) => item.kppn_note.length>1).length)/(kuesioner.length)*100).toFixed(0);
  

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
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom:3}}> Data Checklist Kertas Kerja</Text>
      <Text style={{fontSize:8}}> {persenSesuai}% sesuai </Text>
    </View>

      {/*  -------- Tabel Checklist ---------- */}
      <View style={{...styles.table, width:'100%'}} > 
        <View style={{...styles.tableRow}} fixed> 
          <View style={{...styles.tableHead, width:'6%'}}> 
            <Text style={styles.tableHeadCell}>No</Text> 
          </View> 
          <View style={{...styles.tableHead, width:'40%'}} wrap> 
            <Text style={styles.tableHeadCell} wrap>Checklist</Text> 
          </View>
          <View style={{...styles.tableHead, width:'20%'}}> 
            <Text style={styles.tableHeadCell}>Kondisi</Text> 
          </View> 
          <View style={{...styles.tableHead, width:'10%'}}> 
            <Text style={styles.tableHeadCell}>Dokumen</Text> 
          </View> 
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Peraturan Terkait</Text> 
          </View>
          <View style={{...styles.tableHead, width:'35%'}}> 
            <Text style={styles.tableHeadCell}>Catatan KPPN</Text> 
          </View> 
        </View>
        {checklist && checklist.map((row, index)=> {
          return (
            <View style={{...styles.tableRow, borderWidth:0.5}} key={index}> 
              <View style={{...styles.tableCol, width:'6%', borderWidth:0.5}}> 
                <Text style={{...styles.tableCell}}>{index+1}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'40%', borderWidth:0.5}}> 
                <Text style={{...styles.tableCell, marginLeft:0}}>{row.title}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'20%', borderWidth:0.5}}> 
              <Text style={{...styles.tableCell, color:colorKondisi[row.kppn_response]}}>{SELECTKONDISI[row.kppn_response].jenis}</Text> 
              </View>
              <View style={{...styles.tableCol, borderWidth:0.5, width:'10%'}}> 
                <Text style={styles.tableCell}>{row.file1?'V':'-'}</Text> 
              </View>
              <View style={{...styles.tableCol, borderWidth:0.5}}> 
                <Text style={styles.tableCell}>{row.peraturan}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'35%', borderWidth:0.5}}> 
                <Text style={styles.tableCell}>{row.kppn_note}</Text> 
              </View>  
            </View> 
              )
            })}
      </View>

      {/*  -------- 4. TTE ------ */}
      <View style={{...styles.tte, marginTop:0}} wrap={false}>
          <Text style={{height:80}} />
          <Text style={{fontSize: 10, color:'#59606b'}}>Ditandatangani secara elektronik</Text>
          <Text style={{fontSize: 10, marginRight:selectTTEMargin[KPPN]}}>{kepalaKantor[KPPN]}</Text>
      </View>

      <View style={styles.footer} fixed>
        <Text style={{ textAlign: 'center', marginRight:200 }} render={({ pageNumber, totalPages }) => (
          `Hal: ${pageNumber} dari ${totalPages} halaman`
        )} />
        <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
      </View>
  
    </Page>

    {/*  -------------------------- Report kuesioner----------------------------------------- */}
    <Page size="A4" style={styles.page} orientation="landscape">
        {/*  -------- KOP Surat ---------- */}
    <View style={styles.header} fixed>
      <Image style={styles.logo} src={"/assets/images/kemenkeu/kemenkeu_logo.png"}/>
      <View style={{flexDirection:'column', justifyContent:'space-between', paddingTop:15, paddingBottom:15}}>
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}>Kementerian Keuangan Republik Indonesia</Text>
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}>{KPPN<1?null:'Kantor Pelayanan Perbendaharaan Negara'} {selectKPPN[KPPN]}</Text>
      </View>
    </View>
        {/*  -------- Title ---------- */}
    <View style={styles.title} wrap={false}>
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom:3}}>Data Kuesioner</Text>
      <Text style={{fontSize:8}}>{persenDiisi}% diisi</Text>
    </View>

      {/*  -------- Tabel Checklist ---------- */}
      <View style={{...styles.table, width:'100%'}} > 
        <View style={{...styles.tableRow}} fixed> 
          <View style={{...styles.tableHead, width:'6%'}}> 
            <Text style={styles.tableHeadCell}>No</Text> 
          </View> 
          <View style={{...styles.tableHead, width:'40%'}} wrap> 
            <Text style={styles.tableHeadCell} wrap>Pertanyaan</Text> 
          </View>
          <View style={{...styles.tableHead, width:'54%'}}> 
            <Text style={styles.tableHeadCell}>Tanggapan</Text> 
          </View> 
        </View>
        {kuesioner && kuesioner.map((row, index)=> {
          return (
            <View style={{...styles.tableRow, borderWidth:0.5}} key={index}> 
              <View style={{...styles.tableCol, width:'6%', borderWidth:0.5}}> 
                <Text style={{...styles.tableCell}}>{index+1}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'40%', borderWidth:0.5}}> 
                <Text style={{...styles.tableCell, marginLeft:0}}>{row.title}</Text> 
              </View> 
              <View style={{...styles.tableCol, borderWidth:0.5, width:'54%'}}> 
                <Text style={styles.tableCell}>{row.kppn_note}</Text> 
              </View>  
            </View> 
              )
            })}
      </View>

      {/*  -------- 4. TTE ------ */}
      <View style={{...styles.tte, marginTop:0}} wrap={false}>
          <Text style={{height:80}} />
          <Text style={{fontSize: 10, color:'#59606b'}}>Ditandatangani secara elektronik</Text>
          <Text style={{fontSize: 10, marginRight:selectTTEMargin[KPPN]}}>{kepalaKantor[KPPN]}</Text>
      </View>

      <View style={styles.footer} fixed>
        <Text style={{ textAlign: 'center', marginRight:200 }} render={({ pageNumber, totalPages }) => (
          `Hal: ${pageNumber} dari ${totalPages} halaman`
        )} />
        <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
      </View>
  
    </Page>

  </Document>
  )
};
