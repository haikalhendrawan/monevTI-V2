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

const tteMargin = {
  0:'25%',
  1:'18%',
  2:'25%',
  3:'18%',
  4:'25%',
  5:'18%',
  6:'18%',
}


const colorKondisi = {
  0:'#54D62C',
  1:'#FFC107',
  2:'#FF4842'
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


export default function WorksheetBAPDF(props) {
  
  const KPPN = props?.auth?.kppn;
  const namaPIC = props?.auth?.namaPIC;
  const nipPIC = props?.auth?.nipPIC;
  
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
      <Text style={{fontSize:9, marginTop:10}}> Pada hari ini tanggal {date} Bulan Desember Tahun 2023, saya yang bertandatangan dibawah ini: </Text>
      <View style={{...styles.table, marginLeft:10}}> 
          <View style={styles.tableRow} fixed> 
            <View style={{...styles.tableCol, width:'2%'}}> 
              <Text style={styles.tableCell}>1.</Text> 
            </View> 
            <View style={{...styles.tableCol, width:'10%'}}> 
              <Text style={styles.tableCell}>Nama</Text> 
            </View>
            <View style={{...styles.tableCol, width:'2%'}}> 
              <Text style={styles.tableCell}>:</Text> 
            </View> 
            <View style={{ ...styles.tableCol, width: 'auto' }}>
              <Text style={{ ...styles.tableCell, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              {namaPIC}
              </Text>
            </View>
          </View>
      </View>
      <View style={{...styles.table, marginLeft:10}}> 
          <View style={styles.tableRow} fixed> 
            <View style={{...styles.tableCol, width:'2%'}}> 
              <Text style={styles.tableCell}>2.</Text> 
            </View> 
            <View style={{...styles.tableCol, width:'10%'}}> 
              <Text style={styles.tableCell}>NIP</Text> 
            </View>
            <View style={{...styles.tableCol, width:'2%'}}> 
              <Text style={styles.tableCell}>:</Text> 
            </View> 
            <View style={{ ...styles.tableCol, width: 'auto' }}>
              <Text style={{ ...styles.tableCell, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                {nipPIC}
              </Text>
            </View>
          </View>
      </View>
      <Text style={{fontSize:9, marginTop:10}}> Telah melakukan penyelesaian input data dengan sebenar-benarnya dan dapat dipertanggungjawabkan, yang dapat dirinci sebagai berikut: </Text>
      <View style={{...styles.table, marginLeft:10}}> 
          <View style={styles.tableRow} fixed> 
            <View style={{...styles.tableCol, width:'2%'}}> 
              <Text style={styles.tableCell}>1.</Text> 
            </View> 
            <View style={{...styles.tableCol, width:'auto', marginLeft:8}}> 
              <Text style={styles.tableCell}>Input data Aset TIK dan User TIK dengan progress penyelesaian</Text> 
            </View>
            <View style={{...styles.tableCol, width:'2%'}}> 
              <Text style={styles.tableCell}>:</Text> 
            </View> 
            <View style={{ ...styles.tableCol, width: 'auto' }}>
              <Text style={{ ...styles.tableCell, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                100% 
              </Text>
            </View>
          </View>
      </View>
      <View style={{...styles.table, marginLeft:10}}> 
          <View style={styles.tableRow} fixed> 
            <View style={{...styles.tableCol, width:'2%'}}> 
              <Text style={styles.tableCell}>2.</Text> 
            </View> 
            <View style={{...styles.tableCol, width:'auto', marginLeft:8}}> 
              <Text style={styles.tableCell}>Input checklist kertas kerja dengan progress penyelesaian</Text> 
            </View>
            <View style={{...styles.tableCol, width:'2%', marginLeft:25.5}}> 
              <Text style={styles.tableCell}>:</Text> 
            </View> 
            <View style={{ ...styles.tableCol, width: 'auto' }}>
              <Text style={{ ...styles.tableCell, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              100%
              </Text>
            </View>
          </View>
      </View>
      <Text style={{fontSize:9, marginTop:14}}> Demikian Berita Acara ini dibuat dalam rangka keperluan Monev TIK Kanwil DJPb Provinsi Sumatera Barat dan untuk dipergunakan sebagaimana mestinya. </Text>
      <View style={{ ...styles.table, marginLeft: 10, marginTop: 20, flexDirection: 'row' }}>
      {/* First Signature Table */}
      <View style={{ ...styles.tableRow, flexDirection: 'column', width: '50%' }} fixed>
        <View style={{ ...styles.tableCol, width: '100%' }}>
          <Text style={styles.tableCell}>Pemeriksa, PIC TIK {selectKPPN[KPPN]}</Text>
        </View>
        <View style={{ ...styles.tableCol, width: '100%', marginTop: 50 }}>
          <Text style={styles.tableCell}>ttd</Text>
        </View>
        <View style={{ ...styles.tableCol, width: '100%', marginTop: 20}}>
          <Text style={styles.tableCell}>{namaPIC}</Text>
        </View>
      </View>

      {/* Second Signature Table */}
      <View style={{ ...styles.tableRow, flexDirection: 'column', width: '50%', marginLeft: 80}} fixed>
        <View style={{ ...styles.tableCol, width: '100%' }}>
          <Text style={styles.tableCell}>Mengetahui, Kepala {selectKPPN[KPPN]}</Text>
        </View>
        <View style={{ ...styles.tableCol, width: '100%', marginTop: 60 }}>
          <Text style={styles.tableCell} />
        </View>
        <View style={{ ...styles.tableCol, width: '100%', position:'absolute', right:'1%', top:'75%' }}>
          <Text style={{...styles.tableCell, color:'#59606b', marginBottom:0}}>Ditandatangani secara elektronik</Text>
        </View>
        <View style={{ ...styles.tableCol, width: '100%', marginTop: 0, position:'absolute', right:'18%', top:'86%'}}>
          <Text style={{...styles.tableCell, marginTop:0}}>{kepalaKantor[KPPN]}</Text>
        </View>
      </View>
     
    </View>
    </View>
    
    <View style={styles.footer} fixed>
        <Text style={{ textAlign: 'center', marginRight:100}} render={({ pageNumber, totalPages }) => (
          `Hal: ${pageNumber} dari ${totalPages} halaman`
        )} />
        <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
        <Image style={{height:15, width:25}} src={"/assets/monevtipng.png"}/>
      </View>
    </Page>

  </Document>
  )
};
