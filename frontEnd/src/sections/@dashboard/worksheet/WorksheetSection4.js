import React from 'react';
import WorksheetFinalize from './section4/WorksheetFinalize';
import ConfirmModal from './component/ConfirmModal';
// --------------------------




export default function WorksheetSection4(props){

    return(
        <>
            <WorksheetFinalize batch={props.batch} checklist={props.checklist}/>
        </>
    )
  
}
