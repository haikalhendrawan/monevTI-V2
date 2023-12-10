import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {getNotif, addNotif, updateNotif} from "../controller/notif.js";

const router = express.Router();

router.get("/getNotif", authenticate, getNotif);
router.post("/addNotif", authenticate, addNotif);
router.post("/updateNotif", authenticate, updateNotif);



export default router;

