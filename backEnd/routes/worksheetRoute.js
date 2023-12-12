import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {addChecklist, editChecklist, getChecklistByUser, deleteChecklist, addBatch, getBatch, editBatch, assignChecklist} from "../controller/worksheet.js";


const router = express.Router();

router.post("/addChecklist", authenticate, addChecklist);
router.post("/editChecklist", authenticate, editChecklist);
router.get("/getChecklistByUser", authenticate, getChecklistByUser);
router.delete("/getChecklist/:checklistId", authenticate, deleteChecklist);
router.post("/addBatch", authenticate, addBatch);
router.get("/getBatch", authenticate, getBatch);
router.post("/editBatch", authenticate, editBatch);
router.post("/assignChecklist", authenticate, assignChecklist);


export default router;