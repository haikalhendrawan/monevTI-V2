import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {getNotif, addNotif} from "../controller/notif.js";

const router = express.Router();

router.get("/getNotif", authenticate, getNotif);
router.post("/addNotif", authenticate, addNotif);


export default router;

