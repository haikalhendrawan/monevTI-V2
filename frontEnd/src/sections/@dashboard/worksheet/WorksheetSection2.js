import React, {useState, useEffect} from 'react';
import {useTheme} from "@mui/material/styles";
import WorksheetCard from './component/WorksheetCard';
import PreviewFileModal from './component/PreviewFileModal';


// -----------------------------------------------

export default function WorksheetSection2(props){
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {batch, checklist, getBatch, getChecklist, editBatch, editChecklist} = props;
  const [modalFile, setModalFile] = useState({
    file1:'default.png',
    file2:'default.png',
    filePanduan:'default.png',
    fileNum:null,
  });

  const allChecklist = checklist?.rows?checklist.rows:[];
  const checklistSec2 = checklist?.rows?allChecklist.filter((item) => {
    return item.ws_section === 2
  }):null;

  const [value, setValue] = useState(checklistSec2);

  // open file button
  const handleClick = (filename, fileNum) => {
    setOpen(true);
    if(fileNum===1){setModalFile({...modalFile, file1:filename, fileNum})};
    if(fileNum===2){setModalFile({...modalFile, file2:filename, fileNum})};
    if(fileNum===3){setModalFile({...modalFile, filePanduan:filename, fileNum})};
  };

  // open close modal file
  const handleModalClose = () => {
    setOpen(false);
  };

  // ganti kondisi kesesuaian
  const handleSelect = async(event, id) => {
    const currentRow = value?.find((item) => item.csjunction_id === id);
    const { csjunction_id: csjunctionId, kppn_response: kppnResponse, kppn_note: kppnNote, kanwil_note: kanwilNote, file1, file2 } = currentRow;
    const currentResponse = event.target.value;
    try{
      await editChecklist(csjunctionId, currentResponse, kppnNote, kanwilNote, file1, file2);
      await getChecklist();
      setValue((prev)=> {
        return prev.map((row) => {
          return row.csjunction_id===id?{...row, kppn_response:event.target.value}:row;
        });
      });

    }catch(err){
      console.log(err)
    }
    // console.log(currentRow);

  };

  // hapus file
  const handleDeleteFile = async(id) => {
    const currentRow = value?.find((item) => item.csjunction_id === id);
    const { csjunction_id: csjunctionId, kppn_response: kppnResponse, kppn_note: kppnNote, kanwil_note: kanwilNote, file1, file2 } = currentRow;
    try{
      await editChecklist(csjunctionId, kppnResponse, kppnNote, kanwilNote, null, null);
      await getChecklist();
      setValue((prev)=> {
        return prev.map((row) => {
          return row.csjunction_id===id?{...row, file1:null, file2:null}:row;
        });
      });

    }catch(err){
      console.log(err)
    }
  };

  // edit catatan kppn
  const handleEditNote = (event, id) => {  
      setValue((prev)=> {
        return prev.map((row) => {
          return row.csjunction_id===id?{...row, kppn_note:event.target.value}:row;
        });
      });
  };

  const handleBlur = async(id) => {
    const currentRow = value?.find((item) => item.csjunction_id === id);
    const { csjunction_id: csjunctionId, kppn_response: kppnResponse, kppn_note: kppnNote, kanwil_note: kanwilNote, file1, file2 } = currentRow;
    try{
      await editChecklist(csjunctionId, kppnResponse, kppnNote, currentRow.kppn_note, file1, file2);
      await getChecklist();
    }catch(err){
      console.log(err);
    }
  }

  return(
    <>
    {checklistSec2?.map((item, index) => {
      return (<WorksheetCard key={index} 
              num={index+1}
              csId={item.csjunction_id}
              chId={item.checklist_id} 
              onClick={handleClick} 
              handleSelect={handleSelect} 
              handleDelete={handleDeleteFile} 
              handleEdit={handleEditNote}
              handleBlur={handleBlur}
              kppnNote={value?.find((row)=> row.csjunction_id===item.csjunction_id).kppn_note}
              kppnResponse={item.kppn_response}
              title={item.title}
              instruksi={item.instruksi}
              dateUpdated={item.date_updated}
              file1={item.file1}
              file2={item.file2}
              peraturan={item.peraturan}
              wsSection={item.ws_section}
              getChecklist={getChecklist}
              contohFile={item.contoh_file}
              />) 
        })
    }

    <PreviewFileModal 
      modalOpen={open} 
      modalClose={handleModalClose} 
      file1={modalFile.file1} 
      file2={modalFile.file2} 
      fileNum={modalFile.fileNum}
      getChecklist={getChecklist}
      filePanduan={modalFile.filePanduan} 
    />
    </>
  )
  
}
