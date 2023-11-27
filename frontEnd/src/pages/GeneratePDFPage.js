import {useState, useEffect} from "react";
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import axios from "axios"
import IAssetReportPDF from "../sections/PDF/IAssetReportPDF/IAssetReportPDF";


// Create Document Component
function GeneratePDFPage() {

  return(
    <IAssetReportPDF />
  )
  
};


export default GeneratePDFPage;
