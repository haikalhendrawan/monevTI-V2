import {useState, useEffect} from "react";
import axios from "axios";
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import styles from "./IAssetReportStyles";

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

const SELECTKONDISI = [
  {jenis:'Baik', value:0, color:'success'},
  {jenis:'Rusak Ringan', value:1, color:'warning'},
  {jenis:'Rusak Berat', value:2, color:'error'}, 
  ];

const SELECTAPP = [
  {jenis:'SPAN', value:0, icon:"solar:monitor-smartphone-bold-duotone" },
  {jenis:'SAKTI', value:1, icon:"solar:laptop-bold-duotone"},
  {jenis:'Gaji', value:2, icon:"solar:printer-bold-duotone"}, 
  {jenis:'Lainnya', value:3, icon:"solar:electric-refueling-bold-duotone"},
  ];

const colorKondisi = {
  0:'#54D62C',
  1:'#FFC107',
  2:'#FF4842'
}

// -------------------------------------------------------------


export default function IAssetReportPDF(props) {
  // const [ASSET,setASSET] = useState(null);
  const ASSET = props.asset;
  const sortedByType = ASSET?.sort((a,b) => a.jenis_perangkat-b.jenis_perangkat);
  const sortedByTypeAndID = sortedByType?.sort((a,b) => a.id-b.id);
  const KOMPUTERASSET = sortedByTypeAndID?.filter((row) => {return row.jenis_perangkat===0});
  const LAPTOPASSET = sortedByTypeAndID?.filter((row) => {return row.jenis_perangkat===1});
  const LAINNYAASSET = sortedByTypeAndID?.filter((row) => {return row.jenis_perangkat>1});
  const countAsset = ASSET?.length;
  const countAssetBaik = ASSET?.filter((row)=>{return row.kondisi===0}).length;
  const countAssetRR = ASSET?.filter((row)=>{return row.kondisi===1}).length;
  const countAssetRB = ASSET?.filter((row)=>{return row.kondisi===2}).length;


  // const [USER, setUSER] = useState(null);
  const USER = props.user;
  const sortedByAPP = USER?.sort((a,b) => a.app-b.app);
  const sortedByAPPAndID = sortedByAPP?.sort((a,b) => a.id-b.id);
  const SPANUSER = sortedByAPPAndID?.filter((row) => {return row.app===0});
  const SAKTIUSER = sortedByAPPAndID?.filter((row) => {return row.app===1});
  const LAINNYAUSER = sortedByAPPAndID?.filter((row) => {return row.app===2});
  const countUser = USER?.length;
  const withCatatan = USER?.filter((row) => {return row.catatan!==null}).length;

  const KPPN = props?.auth?.kppn;

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth()+1;
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();
  second = (second).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

  return(
  <Document>

    {/*  -------------------------- ASSET ----------------------------------------- */}
      {/* 1. tabel Komputer */}
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
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom:3}}> Data Aset TIK </Text>
      <Text style={{fontSize:8}}> {`${countAsset}`} Perangkat, {`${countAssetBaik}`} Baik, {`${countAssetRR}`} Rusak Ringan, {`${countAssetRB}`} Rusak Berat</Text>
    </View>
    
        {/*  -------- 1. tabel Komputer-------- */}
    <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 1. Komputer </Text> 
    <View style={styles.table} > 
        <View style={styles.tableRow} fixed> 
          <View style={{...styles.tableHead, width:'8%'}}> 
            <Text style={styles.tableHeadCell}>No</Text> 
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
            <Text style={styles.tableHeadCell}>Kondisi</Text> 
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
          <View style={{...styles.tableHead, width:'30%'}}> 
            <Text style={styles.tableHeadCell}>Catatan</Text> 
          </View> 
        </View>
        {KOMPUTERASSET && KOMPUTERASSET.map((row, index)=> {
          return (
            <View style={styles.tableRow} key={index}> 
              <View style={{...styles.tableCol, width:'8%'}}> 
                <Text style={styles.tableCell}>{index+1}</Text> 
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
                <Text style={{...styles.tableCell, color:colorKondisi[row.kondisi]}}>{SELECTKONDISI[row.kondisi].jenis}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{row.serial_number}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'20%'}}> 
                <Text style={styles.tableCell}>{SELECTCPU[row.cpu].jenis}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.ram}</Text> 
              </View> 
              <View style={{...styles.tableCol, width:'15%'}}> 
                <Text style={styles.tableCell}>{row.storage}</Text> 
              </View>
              <View style={{...styles.tableCol, width:'30%'}}> 
                <Text style={styles.tableCell}>{row.catatan}</Text> 
              </View>  
            </View>           

          )
        })}
    </View>

    <View style={styles.footer} fixed>
      <Text style={{ textAlign: 'center', marginRight:200 }} render={({ pageNumber, totalPages }) => (
        `Hal: ${pageNumber} dari ${totalPages} halaman`
      )} />
      <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
    </View>

    </Page>
    
      {/*  2. tabel Laptop */}
    <Page size="A4" style={styles.page} orientation="landscape">
              
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 2. Laptop </Text> 
      <View style={{...styles.table}}> 
          <View style={styles.tableRow} fixed> 
            <View style={{...styles.tableHead, width:'8%'}}> 
              <Text style={styles.tableHeadCell}>No</Text> 
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
              <Text style={styles.tableHeadCell}>Kondisi</Text> 
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
            <View style={{...styles.tableHead, width:'30%'}}> 
              <Text style={styles.tableHeadCell}>Catatan</Text> 
            </View> 
          </View>
          {LAPTOPASSET && LAPTOPASSET.map((row, index)=> {
            return (
              <View style={styles.tableRow} key={index}> 
                <View style={{...styles.tableCol, width:'8%'}}> 
                  <Text style={styles.tableCell}>{index+1}</Text> 
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
                  <Text style={{...styles.tableCell, color:colorKondisi[row.kondisi]}}>{SELECTKONDISI[row.kondisi].jenis}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{row.serial_number}</Text> 
                </View> 
                <View style={{...styles.tableCol, width:'20%'}}> 
                  <Text style={styles.tableCell}>{SELECTCPU[row.cpu].jenis}</Text> 
                </View> 
                <View style={{...styles.tableCol, width:'15%'}}> 
                  <Text style={styles.tableCell}>{row.ram}</Text> 
                </View> 
                <View style={{...styles.tableCol, width:'15%'}}> 
                  <Text style={styles.tableCell}>{row.storage}</Text> 
                </View>
                <View style={{...styles.tableCol, width:'30%'}}> 
                  <Text style={styles.tableCell}>{row.catatan}</Text> 
                </View>  
              </View>           
            )
          })}
      </View>

      <View style={styles.footer} fixed>
        <Text style={{ textAlign: 'center', marginRight:200 }} render={({ pageNumber, totalPages }) => (
          `Hal: ${pageNumber} dari ${totalPages} halaman`
        )} />
        <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
      </View>
    </Page>
    
      {/*   3. tabel lainnya  */}
    <Page size="A4" style={styles.page} orientation="landscape">

      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 3. Lainnya </Text> 
      <View style={{...styles.table}} > 
      <View style={styles.tableRow} fixed> 
        <View style={{...styles.tableHead, width:'6%'}}> 
          <Text style={styles.tableHeadCell}>No</Text> 
        </View> 
        <View style={{...styles.tableHead, width:'20%'}} wrap> 
          <Text style={styles.tableHeadCell} wrap>Jenis Perangkat</Text> 
        </View>
        <View style={{...styles.tableHead, width:'20%'}}> 
          <Text style={styles.tableHeadCell}>Merk/Model</Text> 
        </View> 
        <View style={{...styles.tableHead, width:'10%'}}> 
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
      {LAINNYAASSET && LAINNYAASSET.map((row, index)=> {
        return (
          <View style={styles.tableRow} key={index}> 
            <View style={{...styles.tableCol, width:'6%'}}> 
              <Text style={styles.tableCell}>{index+1}</Text> 
            </View> 
            <View style={{...styles.tableCol, width:'20%'}}> 
              <Text style={styles.tableCell}>{assetRef[row.jenis_perangkat]}</Text> 
            </View> 
            <View style={{...styles.tableCol, width:'20%'}}> 
              <Text style={styles.tableCell}>{row.model}</Text> 
            </View>
            <View style={{...styles.tableCol, width:'10%'}}> 
              <Text style={styles.tableCell}>{row.tahun}</Text> 
            </View>
            <View style={styles.tableCol}> 
              <Text style={{...styles.tableCell, color:colorKondisi[row.kondisi]}}>{SELECTKONDISI[row.kondisi].jenis}</Text> 
            </View>
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>{row.serial_number}</Text> 
            </View> 
            <View style={{...styles.tableCol, width:'25%'}}> 
              <Text style={styles.tableCell}>{row.catatan}</Text> 
            </View>  
          </View> 
            )
          })}
      </View>

      {/*  -------- 4. TTE ------ */}
      <View style={styles.tte}>
          <Text style={{fontSize: 10, color:'#59606b'}}>Ditandatangani secara elektronik</Text>
          <Text style={{fontSize: 10, marginRight:88}}>{kepalaKantor[KPPN]}</Text>
      </View>

      <View style={styles.footer} fixed>
        <Text style={{ textAlign: 'center', marginRight:200 }} render={({ pageNumber, totalPages }) => (
          `Hal: ${pageNumber} dari ${totalPages} halaman`
        )} />
        <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
      </View>
    </Page>

    {/*  -------------------------- IUSER ----------------------------------------- */}
      {/*  1. tabel User SPAN */}
    <Page size="A4" style={styles.page} orientation="landscape">

      {/*  -------- KOP Surat ---------- */}
      <View style={styles.header} fixed>
        <Image style={styles.logo} src={"/assets/images/kemenkeu/kemenkeu_logo.png"}/>
        <View style={{flexDirection:'column', justifyContent:'space-between', paddingTop:15, paddingBottom:15}}>
          <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}> {props.word} Kementerian Keuangan Republik Indonesia </Text>
          <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14}}> {KPPN<1?null:'Kantor Pelayanan Perbendaharaan Negara'} {selectKPPN[KPPN]} </Text>
        </View>
      </View>

      {/*  -------- Title ---------- */}
      <View style={styles.title} wrap={false}>
        <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 14, marginBottom:3}}> Data Pengguna Aplikasi </Text>
        <Text style={{fontSize:8}}> {countUser} Unique user, {withCatatan} catatan</Text> 
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
            <View style={{...styles.tableHead, width:'25%'}}> 
              <Text style={styles.tableHeadCell}>Catatan</Text> 
            </View> 
          </View>
          {SPANUSER && SPANUSER.map((row, index)=> {
            return (
              <>
              <View style={styles.tableRow} key={index}> 
                <View style={{...styles.tableCol, width:'8%'}}> 
                  <Text style={styles.tableCell}>{index+1}</Text> 
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
                <View style={{...styles.tableCol, width:'25%'}}> 
                  <Text style={styles.tableCell}>{row.catatan}</Text> 
                </View>  
              </View> 
            
              </>
            )
          })}
      </View>

      {/*  -------- Footer---------- */}           
      <View style={styles.footer} fixed>
        <Text style={{ textAlign: 'center', marginRight:200 }} render={({ pageNumber, totalPages }) => (
          `Hal: ${pageNumber} dari ${totalPages} halaman`
        )} />
        <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
      </View>

    </Page>

        {/* 2. tabel User SAKTI */}
    <Page size="A4" style={styles.page} orientation="landscape">
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
            <View style={{...styles.tableHead, width:'25%'}}> 
              <Text style={styles.tableHeadCell}>Catatan</Text> 
            </View> 
          </View>
          {SAKTIUSER && SAKTIUSER.map((row, index)=> {
            return (
              <>
              <View style={styles.tableRow} key={index}> 
                <View style={{...styles.tableCol, width:'8%'}}> 
                  <Text style={styles.tableCell}>{index+1}</Text> 
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
                <View style={{...styles.tableCol, width:'25%'}}> 
                  <Text style={styles.tableCell}>{row.catatan}</Text> 
                </View>  
              </View> 
            
              </>
            )
          })}
      </View>

      <View style={styles.footer} fixed>
        <Text style={{ textAlign: 'center', marginRight:200 }} render={({ pageNumber, totalPages }) => (
          `Hal: ${pageNumber} dari ${totalPages} halaman`
        )} />
        <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
      </View>
    </Page>
         {/* 3. tabel User Lainnya */}
    <Page size="A4" style={styles.page} orientation="landscape">
      <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom:3}}> 3. Lainnya </Text>
      <View style={styles.table} > 
        <View style={styles.tableRow} fixed> 
          <View style={{...styles.tableHead, width:'8%'}}> 
            <Text style={styles.tableHeadCell}>No</Text> 
          </View>
          <View style={styles.tableHead} wrap> 
            <Text style={styles.tableHeadCell} wrap>Aplikasi</Text> 
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
          <View style={{...styles.tableHead, width:'25%'}}> 
            <Text style={styles.tableHeadCell}>Catatan</Text> 
          </View> 
        </View>
        {LAINNYAUSER && LAINNYAUSER.map((row, index)=> {
          return (
            <>
            <View style={styles.tableRow} key={index}> 
              <View style={{...styles.tableCol, width:'8%'}}> 
                <Text style={styles.tableCell}>{index+1}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{SELECTAPP[row.app].jenis}</Text> 
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
        <Text style={{fontSize: 10, color:'#59606b'}}>Ditandatangani secara elektronik</Text>
        <Text style={{fontSize: 10, marginRight:88}}>{kepalaKantor[KPPN]}</Text>
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
