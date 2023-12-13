import IAssetReportPDF from "../sections/PDF/IAssetReportPDF/IAssetReportPDF";


// Create Document Component
function GeneratePDFPage(props) {

  return(
    <IAssetReportPDF word={props.word} />
  )
  
};


export default GeneratePDFPage;
