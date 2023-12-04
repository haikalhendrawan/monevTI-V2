import React from 'react';
import WorksheetCard from './component/WorksheetCard';

// ---------------------------

const cardd = [...Array(2).map((item, index) => {
  return(index)
})];


export default function WorksheetSection1(props){

  return(
    <>
    {cardd.map((item, index) => {
      return (<WorksheetCard key={index} name={`ABC`} nik={`ABC`} username={`ABC`} user_id={`ABC`} header={index+1}/>) 
        })
    }
    </>
  )

}
