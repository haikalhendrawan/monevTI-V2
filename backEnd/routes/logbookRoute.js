import {addLogBook, getLogBook, editLogBook, deleteLogBook} from "../controller/logbook.js";
import authenticate from "../middlewares/authenticate.js";
import express from "express";

const router = express.Router();

router.post("/addLogBook", authenticate, addLogBook);
router.get("/getLogBook", getLogBook);
router.post("/editLogBook", authenticate, editLogBook);
router.delete("/deleteLogBook/:id", authenticate, deleteLogBook);


export default router