import IAssetReportPDF from "../sections/PDF/IAssetReportPDF/IAssetReportPDF";


// Create Document Component
function GeneratePDFPage(props) {

  return(
    <IAssetReportPDF auth={props.auth} asset={props.asset} user={props.user} />
  )
  
};


export default GeneratePDFPage;
