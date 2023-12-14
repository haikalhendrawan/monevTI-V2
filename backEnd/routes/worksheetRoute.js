import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {addChecklist, editChecklist, getChecklistByUser, deleteChecklist, addBatch, 
        getBatchByUser, editBatch, assignChecklist, editChecklistJunction, editBatchJunction} from "../controller/worksheet.js";


const router = express.Router();

router.post("/addChecklist", authenticate, addChecklist);
router.post("/editChecklist", authenticate, editChecklist);
router.get("/getChecklistByUser/:batchId", authenticate, getChecklistByUser);
router.delete("/getChecklist/:checklistId", authenticate, deleteChecklist);
router.post("/addBatch", authenticate, addBatch);
router.get("/getBatchByUser/:userId/:batchId", authenticate, getBatchByUser);
router.post("/editBatch", authenticate, editBatch);
router.post("/assignChecklist", authenticate, assignChecklist);
router.post("/editChecklistJunction", authenticate, editChecklistJunction);
router.post("/editBatchJunction", authenticate, editBatchJunction);


export default router;