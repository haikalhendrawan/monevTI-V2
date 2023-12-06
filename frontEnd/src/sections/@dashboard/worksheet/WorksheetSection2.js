import React, {useState, useEffect} from 'react';
import {useTheme} from "@mui/material/styles";
import WorksheetCard from './component/WorksheetCard';
import PreviewFileModal from './component/PreviewFileModal';


// -----------------------------------------------

const cardd = [...Array(3).map((item, index) => {
  return(index)
})];

// -----------------------------------------------

export default function WorksheetSection2(props){
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false)
  };


  return(
    <>

    {cardd.map((item, index) => {
      return (<WorksheetCard key={index} name={`ABC`} nik={`ABC`} username={`ABC`} user_id={`ABC`} header={index+1} onClick={handleClick}/>) 
        })
    }

    <PreviewFileModal modalOpen={open} modalClose={handleModalClose}/>
    </>
  )
  
}
