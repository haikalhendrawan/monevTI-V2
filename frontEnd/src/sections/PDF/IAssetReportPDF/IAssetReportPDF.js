import {useState, useEffect} from "react";
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import axios from "axios"
import styles from "./IAssetReportStyles";

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

const assetRef = {
  0: "Komputer",
  1: "Laptop",
  2: "Printer",
  3: "Scanner",
  4: "UPS",
  5: "Genset",
  6: "Router",
  7: "Switch",
  8: "Tablet"
};

const SELECTCPU = [
  {jenis:'Intel Core i3', value:0 },
  {jenis:'Intel Core i5', value:1},
  {jenis:'Intel Core i7', value:2}, 
  {jenis:'Lainnya', value:3},
  ];

const SELECTITEM = [
  {jenis:'Baik', value:0, color:'success'},
  {jenis:'Rusak Ringan', value:1, color:'warning'},
  {jenis:'Rusak Berat', value:2, color:'error'}, 
  ];


export default function IAssetReportPDF() {
  const [ASSET,setASSET] = useState(null);

  const [USER, setUSER] = useState(null);

  const [KPPN, setKPPN] = useState();

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();
  second = (second).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})


  const refresh = async() => {
    const response = await axios.get("/refresh", {  
        withCredentials:true
    });
    const {id, username, name, email, image, role, kppn, accessToken, msg} = response.data;
    return {accessToken, kppn};
  };   


  const getIAsset = async () => {
    try{
      const {accessToken, kppn} = await refresh();
      const response = await axios.get("/getIAsset", {headers:{Authorization:`Bearer ${accessToken}`}});
      const response2 = await axios.get("/getIUser", {headers:{Authorization:`Bearer ${accessToken}`}});
      setASSET(response.data);
      setUSER(response2.data);
      setKPPN(kppn);
      console.log(response.data);
      console.log(response2.data);
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
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}> {KPPN<1?null:'Kantor Pelayanan Perbendaharaan Negara'} {selectKPPN[KPPN]} </Text>
      </View>
    </View>

    <View style={styles.title} wrap={false}>
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom:3}}> Data Aset TIK </Text>
      <Text style={{fontSize:8}}> 103 Perangkat, 23 Baik, 12 Rusak Ringan, 15 Rusak Berat</Text>
    </View>
    
    {/*  -------- 1. tabel Komputer-------- */}
    <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 1. Komputer </Text> 
    <View style={styles.table} > 
        <View style={styles.tableRow} fixed> 
          <View style={{...styles.tableHead, width:'8%'}}> 
            <Text style={styles.tableHeadCell}>No</Text> 
          </View> 
          <View style={styles.tableHead} wrap> 
            <Text style={styles.tableHeadCell} wrap>Jenis Perangkat</Text> 
          </View>
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Hostname</Text> 
          </View>
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Merk/Model</Text> 
          </View> 
          <View style={{...styles.tableHead, width:'15%'}}> 
            <Text style={styles.tableHeadCell}>Tahun</Text> 
          </View>
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Serial Number</Text> 
          </View>
          <View style={{...styles.tableHead, width:'20%'}}> 
            <Text style={styles.tableHeadCell}>CPU</Text> 
          </View>
          <View style={{...styles.tableHead, width:'15%'}}> 
            <Text style={styles.tableHeadCell}>RAM</Text> 
          </View>
          <View style={{...styles.tableHead, width:'15%'}}> 
            <Text style={styles.tableHeadCell}>Storage</Text> 
          </View>
          <View style={{...styles.tableHead, width:'25%'}}> 
            <Text style={styles.tableHeadCell}>Catatan</Text> 
          </View> 
        </View>
        {ASSET && ASSET.map((row, index)=> {
          return (
            <>
            <View style={styles.tableRow} key={index}> 
              <View style={{...styles.tableCol, width:'8%'}}> 
                <Text style={styles.tableCell}>{row.id}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.jenis_perangkat}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.hostname}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.model}</Text> 
              </View>
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.tahun}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.serial_number}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'20%'}}> 
                <Text style={styles.tableCell}>{row.cpu}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.ram}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.storage}</Text> 
              </View>
              <View style={{...styles.tableCol, width:'25%'}}> 
                <Text style={styles.tableCell}>{row.catatan}</Text> 
              </View>  
            </View>           
            </>
          )
        })}
    </View>

    {/*  -------- 2. tabel Laptop-------- */}
    <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 2. Laptop </Text> 
    <View style={{...styles.table}}> 
        <View style={styles.tableRow} fixed> 
          <View style={{...styles.tableHead, width:'8%'}}> 
            <Text style={styles.tableHeadCell}>No</Text> 
          </View> 
          <View style={styles.tableHead} wrap> 
            <Text style={styles.tableHeadCell} wrap>Jenis Perangkat</Text> 
          </View>
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Hostname</Text> 
          </View>
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Merk/Model</Text> 
          </View> 
          <View style={{...styles.tableHead, width:'15%'}}> 
            <Text style={styles.tableHeadCell}>Tahun</Text> 
          </View>
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Serial Number</Text> 
          </View>
          <View style={{...styles.tableHead, width:'20%'}}> 
            <Text style={styles.tableHeadCell}>CPU</Text> 
          </View>
          <View style={{...styles.tableHead, width:'15%'}}> 
            <Text style={styles.tableHeadCell}>RAM</Text> 
          </View>
          <View style={{...styles.tableHead, width:'15%'}}> 
            <Text style={styles.tableHeadCell}>Storage</Text> 
          </View>
          <View style={{...styles.tableHead, width:'25%'}}> 
            <Text style={styles.tableHeadCell}>Catatan</Text> 
          </View> 
        </View>
        {ASSET && ASSET.map((row, index)=> {
          return (
            <>
            <View style={styles.tableRow} key={index}> 
              <View style={{...styles.tableCol, width:'8%'}}> 
                <Text style={styles.tableCell}>{row.id}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.jenis_perangkat}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.hostname}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.model}</Text> 
              </View>
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.tahun}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.serial_number}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'20%'}}> 
                <Text style={styles.tableCell}>{row.cpu}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.ram}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.storage}</Text> 
              </View>
              <View style={{...styles.tableCol, width:'25%'}}> 
                <Text style={styles.tableCell}>{row.catatan}</Text> 
              </View>  
            </View>           
            </>
          )
        })}
    </View>

    {/*  -------- 3. tabel lainnya ------ */}
    <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 3. Lainnya </Text> 
    <View style={{...styles.table}} > 
    <View style={styles.tableRow} fixed> 
      <View style={{...styles.tableHead, width:'8%'}}> 
        <Text style={styles.tableHeadCell}>No</Text> 
      </View> 
      <View style={styles.tableHead} wrap> 
        <Text style={styles.tableHeadCell} wrap>Jenis Perangkat</Text> 
      </View>
      <View style={styles.tableHead}> 
        <Text style={styles.tableHeadCell}>Merk/Model</Text> 
      </View> 
      <View style={{...styles.tableHead, width:'15%'}}> 
        <Text style={styles.tableHeadCell}>Tahun</Text> 
      </View>
      <View style={styles.tableHead}> 
        <Text style={styles.tableHeadCell}>Kondisi</Text> 
      </View> 
      <View style={styles.tableHead}> 
        <Text style={styles.tableHeadCell}>Serial Number</Text> 
      </View>
      <View style={{...styles.tableHead, width:'25%'}}> 
        <Text style={styles.tableHeadCell}>Catatan</Text> 
      </View> 
    </View>
    {ASSET && ASSET.map((row, index)=> {
      return (
        <>
        <View style={styles.tableRow} key={index}> 
          <View style={{...styles.tableCol, width:'8%'}}> 
            <Text style={styles.tableCell}>{row.id}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{row.jenis_perangkat}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{row.model}</Text> 
          </View>
          <View style={{...styles.tableCol, width:'15%'}}> 
            <Text style={styles.tableCell}>{row.tahun}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{row.kondisi}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{row.serial_number}</Text> 
          </View> 
          <View style={{...styles.tableCol, width:'25%'}}> 
            <Text style={styles.tableCell}>{row.catatan}</Text> 
          </View>  
        </View> 
           
            </>
          )
        })}
    </View>

    {/*  -------- 4. TTE ------ */}
    <View style={styles.tte}>
        <Text style={{fontSize: 10, color:'#59606b'}}> Ditandatangani secara elektronik</Text>
        <Text style={{fontSize: 10, marginRight:85}}> Syukriah H G</Text>
    </View>

    <View style={styles.footer} fixed>
      <Text style={{ textAlign: 'center', marginRight:200 }} render={({ pageNumber, totalPages }) => (
        `Hal: ${pageNumber} dari ${totalPages} halaman`
      )} />
      <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
    </View>

    </Page>

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
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom:3}}> Data Pengguna Aplikasi </Text>
        <Text style={{fontSize:8}}> 34 Unique user, 0 catatan</Text> 
      </View>

      {/*  -------- 1. tabel User SPAN ---------- */}
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 1. SPAN </Text>
      <View style={styles.table} > 
          <View style={styles.tableRow} fixed> 
            <View style={{...styles.tableHead, width:'8%'}}> 
              <Text style={styles.tableHeadCell}>No</Text> 
            </View> 
            <View style={styles.tableHead} wrap> 
              <Text style={styles.tableHeadCell} wrap>Nama</Text> 
            </View>
            <View style={styles.tableHead}> 
              <Text style={styles.tableHeadCell}>Username</Text> 
            </View>
            <View style={styles.tableHead}> 
              <Text style={styles.tableHeadCell}>Role</Text> 
            </View> 
            <View style={styles.tableHead}> 
              <Text style={styles.tableHeadCell}>Email</Text> 
            </View>
            <View style={{...styles.tableHead, width:'15%'}}> 
              <Text style={styles.tableHeadCell}>Pelatihan</Text> 
            </View>
            <View style={{...styles.tableHead, width:'25%'}}> 
              <Text style={styles.tableHeadCell}>Catatan</Text> 
            </View> 
          </View>
          {USER && USER.map((row, index)=> {
            return (
              <>
              <View style={styles.tableRow} key={index}> 
                <View style={{...styles.tableCol, width:'8%'}}> 
                  <Text style={styles.tableCell}>{row.id}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{row.name}</Text> 
                </View> 
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.username}</Text> 
                </View>
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{row.role}</Text> 
                </View>
                <View style={{...styles.tableCol}}> 
                  <Text style={styles.tableCell}>{row.email}</Text> 
                </View> 
                <View style={{...styles.tableCol, width:'15%'}}> 
                  <Text style={styles.tableCell}>{row.pelatihan}</Text> 
                </View> 
                <View style={{...styles.tableCol, width:'25%'}}> 
                  <Text style={styles.tableCell}>{row.catatan}</Text> 
                </View>  
              </View> 
            
              </>
            )
          })}
      </View>

      {/*  -------- 2. tabel User SAKTI ---------- */}
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 2. SAKTI</Text>
      <View style={styles.table} > 
          <View style={styles.tableRow} fixed> 
            <View style={{...styles.tableHead, width:'8%'}}> 
              <Text style={styles.tableHeadCell}>No</Text> 
            </View> 
            <View style={styles.tableHead} wrap> 
              <Text style={styles.tableHeadCell} wrap>Nama</Text> 
            </View>
            <View style={styles.tableHead}> 
              <Text style={styles.tableHeadCell}>Username</Text> 
            </View>
            <View style={styles.tableHead}> 
              <Text style={styles.tableHeadCell}>Role</Text> 
            </View> 
            <View style={styles.tableHead}> 
              <Text style={styles.tableHeadCell}>Email</Text> 
            </View>
            <View style={{...styles.tableHead, width:'15%'}}> 
              <Text style={styles.tableHeadCell}>Pelatihan</Text> 
            </View>
            <View style={{...styles.tableHead, width:'25%'}}> 
              <Text style={styles.tableHeadCell}>Catatan</Text> 
            </View> 
          </View>
          {USER && USER.map((row, index)=> {
            return (
              <>
              <View style={styles.tableRow} key={index}> 
                <View style={{...styles.tableCol, width:'8%'}}> 
                  <Text style={styles.tableCell}>{row.id}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{row.name}</Text> 
                </View> 
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.username}</Text> 
                </View>
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{row.role}</Text> 
                </View>
                <View style={{...styles.tableCol}}> 
                  <Text style={styles.tableCell}>{row.email}</Text> 
                </View> 
                <View style={{...styles.tableCol, width:'15%'}}> 
                  <Text style={styles.tableCell}>{row.pelatihan}</Text> 
                </View> 
                <View style={{...styles.tableCol, width:'25%'}}> 
                  <Text style={styles.tableCell}>{row.catatan}</Text> 
                </View>  
              </View> 
            
              </>
            )
          })}
      </View>

      {/*  -------- 3. tabel User Lainnya ---------- */}
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 3. Lainnya </Text>
      <View style={styles.table} > 
        <View style={styles.tableRow} fixed> 
          <View style={{...styles.tableHead, width:'8%'}}> 
            <Text style={styles.tableHeadCell}>No</Text> 
          </View> 
          <View style={styles.tableHead} wrap> 
            <Text style={styles.tableHeadCell} wrap>Nama</Text> 
          </View>
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Username</Text> 
          </View>
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Role</Text> 
          </View> 
          <View style={styles.tableHead}> 
            <Text style={styles.tableHeadCell}>Email</Text> 
          </View>
          <View style={{...styles.tableHead, width:'15%'}}> 
            <Text style={styles.tableHeadCell}>Pelatihan</Text> 
          </View>
          <View style={{...styles.tableHead, width:'25%'}}> 
            <Text style={styles.tableHeadCell}>Catatan</Text> 
          </View> 
        </View>
        {USER && USER.map((row, index)=> {
          return (
            <>
            <View style={styles.tableRow} key={index}> 
              <View style={{...styles.tableCol, width:'8%'}}> 
                <Text style={styles.tableCell}>{row.id}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.name}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.username}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.role}</Text> 
              </View>
              <View style={{...styles.tableCol}}> 
                <Text style={styles.tableCell}>{row.email}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.pelatihan}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'25%'}}> 
                <Text style={styles.tableCell}>{row.catatan}</Text> 
              </View>  
            </View> 
              
                </>
              )
            })}
      </View>

          {/*  -------- 4. TTE ------ */}
      <View style={styles.tte}>
        <Text style={{fontSize: 10, color:'#59606b'}}> Ditandatangani secara elektronik</Text>
        <Text style={{fontSize: 10, marginRight:85}}> Syukriah H G</Text>
      </View>

      {/*  -------- Footer---------- */}           
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
