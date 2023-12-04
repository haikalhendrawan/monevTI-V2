import React from 'react';
import WorksheetCard from './component/WorksheetCard';

const cardd = [...Array(3).map((item, index) => {
  return(index)
})];


export default function WorksheetSection2(props){

  return(
    <>
    {cardd.map((item, index) => {
      return (<WorksheetCard key={index} name={`ABC`} nik={`ABC`} username={`ABC`} user_id={`ABC`} header={index+1}/>) 
        })
    }
    </>
  )
  
}
