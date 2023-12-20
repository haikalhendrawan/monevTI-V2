import IAssetReportPDF from "../sections/PDF/IAssetReportPDF/IAssetReportPDF";
import WorksheetBAPDF from "../sections/PDF/WorksheetReportPDF/WorksheetBAPDF";
import WorksheetReportPDF from "../sections/PDF/WorksheetReportPDF/WorksheetReportPDF";

// <WorksheetBAPDF auth={props.auth} />
// <WorksheetReportPDF auth={props.auth} />
// <IAssetReportPDF auth={props.auth} asset={props.asset} user={props.user} />

// Create Document Component
function GeneratePDFPage(props) {

  return(
    <IAssetReportPDF auth={props.auth} asset={props.asset} user={props.user} />
  )
  
};


export default GeneratePDFPage;
