import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding:20,
      paddingBottom:30
    },
    table: { 
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      borderTopWidth: 0, 
      borderRightWidth: 0, 
      borderBottomWidth: 0,
      borderLeftWidth:1,
      marginBottom:30
    }, 
    tableRow: { 
      margin: 0, 
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 ,
    }, 
    tableHead: { 
      width: "25%", 
      borderStyle: "solid", 
      borderWidth:1,
      borderLeftWidth:0,
      backgroundColor: '#f0f0f0',
      height:30,
      textAlign:'center',
      justifyContent:'center'
    }, 
    tableHeadCell: { 
      fontWeight: 700,
      fontFamily: 'Helvetica-Bold',
      fontSize:10,
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center'
    },
    tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 10 
    },
    header:{
      marginBottom:10,
      width:'auto',
      height:70,
      borderBottomWidth:1,
      flexDirection:'row',
      gap:10
    },
    footer:{
      height:40,
      width:'100%',
      marginTop:40,
      bottom:0,
      position:'absolute',
      justifyContent:'flex-end',
      alignItems:'center',
      alignContent:'center',
      fontSize:8,
      flexDirection:'row'
    },
    title:{
      height:40,
      marginTop:0,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      fontSize:14,
      fontWeight:'bold',
      flexDirection:'column'
    },
    logo:{
      height:70,
      width:70
    },
    tte:{
      width:'auto',
      flexDirection:'column',
      justifyContent:'flex-end',
      alignItems:'flex-end',
      alignContent:'flex-end',
      marginTop:100,
      marginRight:18
    },
  });

export default styles;

