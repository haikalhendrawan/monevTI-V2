import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import {getChecklistRef } from "../../controller/admin/worksheetRef.js";


const router = express.Router();

router.get("/getChecklistRef/:batchId", getChecklistRef );


export default router;